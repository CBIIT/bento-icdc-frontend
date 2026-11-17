// src/components/LinkBar/LinkbarView.styled.test.tsx
import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot, Root } from 'react-dom/client';
import { Wrapper, Link, NoLink } from './LinkbarView.styled';

function renderIntoDocument(ui: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  let root: Root | null = null;

  act(() => {
    root = createRoot(container);
    root.render(ui);
  });

  return {
    container,
    unmount: () => {
      if (root) {
        act(() => {
          root!.unmount();
        });
      }
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    },
  };
}

function getEmotionCSS(): string {
  const styles = Array.from(
    document.querySelectorAll<HTMLStyleElement>('style[data-emotion]')
  );

  return styles
    .map(style => {
      const sheet = style.sheet;

      if (sheet && sheet.cssRules && sheet.cssRules.length > 0) {
        return Array.from(sheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
      }

      return style.textContent || '';
    })
    .join('\n');
}

function getRuleForClass(className: string, cssText: string): string | null {
  const escapedClassName = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\.${escapedClassName}\\s*\\{([^}]*)\\}`);
  const match = cssText.match(regex);

  return match ? match[1] : null;
}

describe('LinkbarView.styled', () => {
  beforeEach(() => {
    document.head
      .querySelectorAll('style[data-emotion]')
      .forEach(node => node.remove());
    document.body.innerHTML = '';
  });

  describe('Wrapper', () => {
    it('should render without children and inject expected base styles', () => {
      const { container, unmount } = renderIntoDocument(<Wrapper />);

      try {
        const node = container.querySelector('div') as HTMLDivElement;
        expect(node).toBeTruthy();
        expect(node.tagName.toLowerCase()).toBe('div');

        const className = node.className.trim();
        expect(className).toBeTruthy();
        expect(className).toContain('css-');

        const cssText = getEmotionCSS();

        const rule = getRuleForClass(className, cssText);
        expect(rule).not.toBeNull();

        expect(rule!).toContain('width: 100%');
        expect(rule!).toContain('height: 20px');
        expect(rule!).toContain('margin: 0 auto');
        expect(rule!).toContain('display: flex');
        expect(rule!).toContain('justify-content: center');
        expect(rule!).toContain('align-items: center');
        expect(rule!).toContain('top: 0px');
        expect(rule!).toContain('z-index: 1201');
        expect(rule!).toContain('background: #F1F1F1');
        expect(rule!).toContain('border-bottom: 1px #999999 solid');
      } finally {
        unmount();
      }
    });
  });

  describe('Link', () => {
    it('should render as an anchor element and preserve href/children', () => {
      const href = 'https://example.com';
      const label = 'Click me';

      const { container, unmount } = renderIntoDocument(
        <Link href={href}>{label}</Link>
      );

      try {
        const node = container.querySelector('a') as HTMLAnchorElement;
        expect(node).toBeTruthy();
        expect(node.tagName.toLowerCase()).toBe('a');
        expect(node.getAttribute('href')).toBe(href);
        expect(node.textContent).toBe(label);
      } finally {
        unmount();
      }
    });

    it('should render without children without throwing', () => {
      const { container, unmount } = renderIntoDocument(<Link />);

      try {
        const node = container.querySelector('a') as HTMLAnchorElement;
        expect(node).toBeTruthy();
        expect(node.textContent).toBe('');
      } finally {
        unmount();
      }
    });
  });

  describe('NoLink', () => {
    it('should render as a span element', () => {
      const { container, unmount } = renderIntoDocument(<NoLink>Text</NoLink>);

      try {
        const node = container.querySelector('span') as HTMLSpanElement;
        expect(node).toBeTruthy();
        expect(node.tagName.toLowerCase()).toBe('span');
        expect(node.textContent).toBe('Text');
      } finally {
        unmount();
      }
    });

    it('should inject the same shared styles as Link', () => {
      const { container, unmount } = renderIntoDocument(<NoLink />);

      try {
        const node = container.querySelector('span') as HTMLSpanElement;
        expect(node).toBeTruthy();

        const className = node.className.trim();
        expect(className).toBeTruthy();
        expect(className).toContain('css-');
      } finally {
        unmount();
      }
    });

    it('should render without children without throwing', () => {
      const { container, unmount } = renderIntoDocument(<NoLink />);

      try {
        const node = container.querySelector('span') as HTMLSpanElement;
        expect(node).toBeTruthy();
        expect(node.textContent).toBe('');
      } finally {
        unmount();
      }
    });
  });
});
