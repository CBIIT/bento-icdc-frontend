import React from 'react';
import styled from '@emotion/styled';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import ReactMarkdown from 'react-markdown';

import {
  NEWS_COLORS,
  NEWS_COPY,
  NEWS_FONT_FAMILIES,
  NEWS_HTML_ATTRIBUTES,
  NEWS_LABEL_PREFIXES,
  NEWS_MARKUP,
} from './constants';
import { DialogCloseButton } from './DialogCloseButton';
import {
  getReleaseListContent,
  getSoftwareReleaseContent,
} from './releaseNotes';
import type { NewsRelease, ReleaseCardConfig } from './types';

type ReleaseDialogProps = {
  release: NewsRelease | null;
  config: ReleaseCardConfig;
  onClose: () => void;
};

const DialogFrame = styled(Dialog)`
  & .MuiDialog-paper {
    width: 1000px;
    max-height: calc(100% - 64px);
    margin: 32px;
    background: ${NEWS_COLORS.cardSurface};
    border-radius: 8px;
    box-shadow: none;
    overflow: hidden;
  }

  @media (max-width: 700px) {
    & .MuiDialog-paper {
      width: calc(100% - 24px);
      max-width: calc(100% - 24px);
      max-height: calc(100% - 24px);
      margin: 12px;
    }
  }
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  min-width: 0;
  padding: 36px 48px 4px 60px;

  @media (max-width: 700px) {
    gap: 12px;
    padding: 24px 20px 4px 24px;
  }
`;

const Title = styled(DialogTitle)`
  display: flex;
  align-items: baseline;
  flex: 1 1 0;
  flex-wrap: wrap;
  gap: 8px 20px;
  min-width: 0;
  padding: 0;

  @media (max-width: 700px) {
    gap: 6px 10px;
  }
`;

const ReleaseLabel = styled.span`
  color: ${NEWS_COLORS.black};
  font-family: ${NEWS_FONT_FAMILIES.raleway};
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
`;

const ReleaseName = styled.span`
  color: ${NEWS_COLORS.announcementText};
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
  overflow-wrap: anywhere;
`;

const ReleaseDate = styled.span`
  border-left: 1px solid ${NEWS_COLORS.releaseDivider};
  color: ${NEWS_COLORS.announcementText};
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
  padding-left: 20px;

  @media (max-width: 700px) {
    padding-left: 10px;
  }
`;

const Content = styled(DialogContent)`
  color: ${NEWS_COLORS.black};
  min-height: 0;
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 18px;
  line-height: 30px;
  padding: 4px 60px 48px;
  scrollbar-color: ${NEWS_COLORS.scrollbar} transparent;
  scrollbar-width: thin;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${NEWS_COLORS.scrollbar};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  h1,
  h2,
  h3,
  h4 {
    color: ${NEWS_COLORS.releaseHeading};
    font-family: ${NEWS_FONT_FAMILIES.openSans};
    font-size: 17px;
    font-weight: 700;
    line-height: 18px;
    margin: 22px 0 8px;
    text-transform: uppercase;
  }

  p {
    margin: 8px 0;
    overflow-wrap: anywhere;
    white-space: pre-line;
  }

  ul,
  ol {
    margin: 8px 0;
    padding-left: 28px;
  }

  a {
    color: ${NEWS_COLORS.releaseLink};
    cursor: pointer;
    font-family: ${NEWS_FONT_FAMILIES.openSans};
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.2px;
    line-height: 30px;
    overflow-wrap: anywhere;
    text-decoration: underline;
  }

  a:hover {
    color: ${NEWS_COLORS.linkHover};
  }

  a:focus-visible {
    outline: 2px solid ${NEWS_COLORS.focusOutline};
    outline-offset: 2px;
  }

  @media (max-width: 700px) {
    font-size: 15px;
    line-height: 24px;
    padding: 4px 24px 32px;

    h1,
    h2,
    h3,
    h4 {
    font-size: 14px;
    line-height: 22px;
    }
  }
`;

const VersionsSection = styled.section`
  margin: 22px 0 8px;
`;

const SectionTitle = styled.h2`
  && {
    color: ${NEWS_COLORS.releaseSectionHeading};
    font-family: ${NEWS_FONT_FAMILIES.openSans};
    font-size: 17px;
    font-weight: 700;
    line-height: 18px;
    margin: 0 0 6px;
    text-transform: uppercase;
  }

  @media (max-width: 700px) {
    && {
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

const VersionsList = styled.dl`
  margin: 0;
`;

const VersionRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  color: ${NEWS_COLORS.black};
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  dt,
  dd {
    margin: 0;
  }

  @media (max-width: 700px) {
    gap: 10px;
    font-size: 15px;
    line-height: 24px;
  }
`;

const ChangesSection = styled.section`
  margin: 28px 0 8px;
`;

const OfficialReleaseNotes = styled.div`
  margin-top: 38px;
`;

const OfficialReleaseNotesTitle = styled.div`
  color: ${NEWS_COLORS.releaseHeading};
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 17px;
  font-weight: 700;
  line-height: 18px;
  margin-bottom: 6px;
  text-transform: uppercase;
`;

const OfficialReleaseLink = styled.a`
  && {
    color: ${NEWS_COLORS.black};
    font-family: ${NEWS_FONT_FAMILIES.openSans};
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    text-decoration: none;
  }

  &&:hover {
    text-decoration: underline;
  }

  &&:focus-visible {
    outline: 2px solid ${NEWS_COLORS.focusOutline};
    outline-offset: 2px;
  }

  @media (max-width: 700px) {
    && {
      font-size: 15px;
      line-height: 24px;
    }
  }
`;

export const ReleaseDialog = ({
  release,
  config,
  onClose,
}: ReleaseDialogProps) => {
  const dialogTitleId = `${config.repository.replace(/[^a-z0-9]+/gi, '-')}-dialog-title`;
  const softwareReleaseContent =
    release?.body && config.showsBuildVersions
      ? getSoftwareReleaseContent(release.body)
      : null;
  const releaseContent = release?.body
    ? softwareReleaseContent || getReleaseListContent(release.body)
    : null;

  return (
    <DialogFrame
      open={release !== null}
      onClose={onClose}
      aria-labelledby={dialogTitleId}
      maxWidth={false}
    >
      <DialogHeader>
        <Title id={dialogTitleId}>
          <ReleaseLabel>{config.singularTitle}:</ReleaseLabel>
          <ReleaseName>{release?.value}</ReleaseName>
          <ReleaseDate>{release?.date}</ReleaseDate>
        </Title>
        <DialogCloseButton
          aria-label={`${NEWS_LABEL_PREFIXES.close} ${config.singularTitle}`}
          onClick={onClose}
        />
      </DialogHeader>
      <Content>
        {releaseContent ? (
          <>
            {softwareReleaseContent &&
              softwareReleaseContent.versions.length > 0 && (
                <VersionsSection>
                  <SectionTitle>{NEWS_COPY.versionsHeading}</SectionTitle>
                  <VersionsList>
                    {softwareReleaseContent.versions.map(version => (
                      <VersionRow key={version.label}>
                        <dt>{version.label}</dt>
                        <dd>{version.value}</dd>
                      </VersionRow>
                    ))}
                  </VersionsList>
                </VersionsSection>
              )}
            {(releaseContent.changes.length > 0 || releaseContent.fallback) && (
              <ChangesSection>
                <SectionTitle>{NEWS_COPY.newFeaturesHeading}</SectionTitle>
                <ReactMarkdown
                  components={{
                    a: props => (
                      <a
                        {...props}
                        target={NEWS_HTML_ATTRIBUTES.externalLinkTarget}
                        rel={NEWS_HTML_ATTRIBUTES.externalLinkRel}
                      />
                    ),
                  }}
                >
                  {releaseContent.changes.length > 0
                    ? releaseContent.changes
                        .map(change => `- ${change}`)
                        .join(NEWS_MARKUP.markdownLineBreak)
                    : releaseContent.fallback}
                </ReactMarkdown>
              </ChangesSection>
            )}
          </>
        ) : null}
        {release?.url && (
          <OfficialReleaseNotes>
            <OfficialReleaseNotesTitle>
              {NEWS_COPY.officialReleaseNotesHeading}
            </OfficialReleaseNotesTitle>
            <OfficialReleaseLink
              href={release.url}
              target={NEWS_HTML_ATTRIBUTES.externalLinkTarget}
              rel={NEWS_HTML_ATTRIBUTES.externalLinkRel}
            >
              {NEWS_COPY.githubLink}
            </OfficialReleaseLink>
          </OfficialReleaseNotes>
        )}
      </Content>
    </DialogFrame>
  );
};
