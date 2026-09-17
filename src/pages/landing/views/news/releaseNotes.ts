import {
  NEWS_COPY,
  RELEASE_VERSION_DEFINITIONS,
  RELEASE_VERSION_ORDER,
} from './constants';
import type {
  ReleaseListContent,
  ReleaseVersion,
  SoftwareReleaseContent,
} from './types';

type ReleaseSectionRange = {
  start: number;
  contentStart: number;
  end: number;
};

const versionDefinition = (rawLabel: string) => {
  const normalizedLabel = rawLabel
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/\bversion\b/g, '')
    .replace(/[^a-z]/g, '');

  return RELEASE_VERSION_DEFINITIONS[
    normalizedLabel as keyof typeof RELEASE_VERSION_DEFINITIONS
  ];
};

const formatVersionValue = (rawValue: string, includePrefix: boolean) => {
  const semanticVersion = rawValue.match(/\d+(?:\.\d+){2}/)?.[0];
  const value = semanticVersion || rawValue.trim().replace(/^v\.?/i, '');

  return includePrefix ? `v.${value}` : value;
};

const parseReleaseVersions = (content: string): ReleaseVersion[] => {
  const versions: ReleaseVersion[] = [];

  content
    .replace(/<[^>]+>/g, '\n')
    .split(/\r?\n/)
    .forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine || /^[-|\s]+$/.test(trimmedLine)) return;

      const tableCells = trimmedLine.split('|').map(cell => cell.trim());
      const lineMatch =
        tableCells.length >= 2
          ? [trimmedLine, tableCells[0], tableCells[1]]
          : trimmedLine.match(/^(.+?\bVersion)\s*:\s*(.+)$/i);

      if (!lineMatch) return;

      const definition = versionDefinition(lineMatch[1]);
      if (
        !definition ||
        versions.some(item => item.label === definition.label)
      ) {
        return;
      }

      versions.push({
        label: definition.label,
        value: formatVersionValue(lineMatch[2], definition.includePrefix),
      });
    });

  return versions.sort(
    (left, right) =>
      RELEASE_VERSION_ORDER.indexOf(
        left.label as (typeof RELEASE_VERSION_ORDER)[number]
      ) -
      RELEASE_VERSION_ORDER.indexOf(
        right.label as (typeof RELEASE_VERSION_ORDER)[number]
      )
  );
};

const getBuildDetailsRange = (body: string): ReleaseSectionRange | null => {
  const markdownHeading = new RegExp(
    `(^|\\r?\\n)(#{1,6}\\s+${NEWS_COPY.buildDetailsHeading}\\s*\\r?\\n)`,
    'i'
  ).exec(body);
  const htmlHeading = new RegExp(
    `<h[1-6][^>]*>\\s*${NEWS_COPY.buildDetailsHeading}\\s*<\\/h[1-6]>\\s*`,
    'i'
  ).exec(body);

  let start = -1;
  let contentStart = -1;
  let end = -1;

  if (markdownHeading?.index !== undefined) {
    start = markdownHeading.index + markdownHeading[1].length;
    contentStart = markdownHeading.index + markdownHeading[0].length;
    const nextHeading = /\r?\n#{1,6}\s+/.exec(body.slice(contentStart));
    end = nextHeading ? contentStart + nextHeading.index : body.length;
  } else if (htmlHeading?.index !== undefined) {
    start = htmlHeading.index;
    contentStart = htmlHeading.index + htmlHeading[0].length;
    const nextSection = /<hr\b|<h[1-6]\b|<\/body>/i.exec(
      body.slice(contentStart)
    );
    end = nextSection ? contentStart + nextSection.index : body.length;
  }

  return start >= 0 && contentStart >= 0 && end >= 0
    ? { start, contentStart, end }
    : null;
};

const stripBoldEmphasis = (content: string) =>
  content.replace(/\*\*(.+?)\*\*/g, '$1').replace(/__(.+?)__/g, '$1');

const linkifyBareUrls = (content: string) =>
  content.replace(/https?:\/\/[^\s<]+/g, (match, offset: number) => {
    const precedingContent = content.slice(0, offset);
    if (precedingContent.endsWith('](') || precedingContent.endsWith('<')) {
      return match;
    }

    const trailingPunctuation = match.match(/[.,;:!?]+$/)?.[0] || '';
    const url = trailingPunctuation
      ? match.slice(0, -trailingPunctuation.length)
      : match;

    return `[${url}](${url})${trailingPunctuation}`;
  });

const cleanReleaseText = (content: string) =>
  linkifyBareUrls(stripBoldEmphasis(content)).replace(/\s+/g, ' ').trim();

const cleanChanges = (changes: string[]) =>
  changes.reduce<string[]>((cleanedChanges, change) => {
    const cleaned = cleanReleaseText(change);
    if (!cleaned) return cleanedChanges;

    cleanedChanges.push(cleaned);
    return cleanedChanges;
  }, []);

const extractMarkdownListItems = (body: string) => {
  const changes: string[] = [];
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  let pendingItem = '';

  const flushPendingItem = () => {
    if (pendingItem.trim()) {
      changes.push(pendingItem.replace(/\s+/g, ' ').trim());
    }
    pendingItem = '';
  };

  lines.forEach(line => {
    if (/^\s*#{1,6}\s+/.test(line)) {
      flushPendingItem();
      return;
    }

    const bullet = line.match(/^\s*(?:[-*+]|\d+[.)])\s+(.+?)\s*$/);
    if (bullet) {
      flushPendingItem();
      pendingItem = bullet[1];
      return;
    }

    if (!line.trim()) {
      flushPendingItem();
      return;
    }

    if (pendingItem) {
      pendingItem += ` ${line.trim()}`;
    }
  });

  flushPendingItem();
  return cleanChanges(changes);
};

const htmlNodeToMarkdown = (node: ChildNode): string => {
  if (node.nodeType === 3) return node.textContent || '';
  if (node.nodeType !== 1) return '';

  const element = node as HTMLElement;
  const content = Array.from(element.childNodes)
    .map(htmlNodeToMarkdown)
    .join('');

  switch (element.tagName.toLowerCase()) {
    case 'a': {
      const href = element.getAttribute('href');
      return href ? `[${content}](${href})` : content;
    }
    case 'strong':
    case 'b':
      return `**${content}**`;
    case 'em':
    case 'i':
      return `*${content}*`;
    case 'code':
      return `\`${content}\``;
    case 'br':
      return ' ';
    default:
      return content;
  }
};

const extractHtmlListItems = (body: string) => {
  if (typeof DOMParser === 'undefined') return [];

  const document = new DOMParser().parseFromString(body, 'text/html');
  const changes: string[] = [];

  document.body.querySelectorAll('li').forEach(element => {
    changes.push(
      Array.from(element.childNodes)
        .filter(node => {
          if (node.nodeType !== 1) return true;
          const tagName = (node as HTMLElement).tagName.toLowerCase();
          return tagName !== 'ul' && tagName !== 'ol';
        })
        .map(htmlNodeToMarkdown)
        .join('')
        .replace(/\s+/g, ' ')
        .trim()
    );
  });

  return cleanChanges(changes);
};

const stripBuildDetails = (body: string, range: ReleaseSectionRange | null) =>
  range ? `${body.slice(0, range.start)}${body.slice(range.end)}` : body;

const getFallbackReleaseBody = (body: string, containsHtml: boolean) => {
  if (containsHtml && typeof DOMParser !== 'undefined') {
    const document = new DOMParser().parseFromString(body, 'text/html');
    const content = Array.from(document.body.childNodes)
      .filter(node => {
        if (node.nodeType !== 1) return true;
        return !/^h[1-6]$/i.test((node as HTMLElement).tagName);
      })
      .map(htmlNodeToMarkdown)
      .join(' ');

    return cleanReleaseText(content);
  }

  return cleanReleaseText(body.replace(/^\s*#{1,6}\s+.*$/gm, '').trim());
};

export const getReleaseListContent = (body: string): ReleaseListContent => {
  const containsHtml = /<(?:html|body|h[1-6]|ul|ol|li|p|div)\b/i.test(body);
  const changes = containsHtml
    ? extractHtmlListItems(body)
    : extractMarkdownListItems(body);

  return {
    changes,
    fallback:
      changes.length === 0 ? getFallbackReleaseBody(body, containsHtml) : '',
  };
};

export const getSoftwareReleaseContent = (
  body: string
): SoftwareReleaseContent => {
  const buildDetails = getBuildDetailsRange(body);
  const versions = buildDetails
    ? parseReleaseVersions(
        body.slice(buildDetails.contentStart, buildDetails.end)
      )
    : [];
  const contentBody = stripBuildDetails(body, buildDetails);

  return {
    versions,
    ...getReleaseListContent(contentBody),
  };
};
