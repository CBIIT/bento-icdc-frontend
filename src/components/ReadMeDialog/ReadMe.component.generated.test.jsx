// src/components/ReadMeDialog/ReadMe.component.generated.test.jsx
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import html2pdf from 'html2pdf.js';
import { marked } from 'marked';
import { createFileName } from '../../pages/Cart/utils';
import * as ReadMeModule from './ReadMe.component.jsx';
import ReadMeDialogComponent from './ReadMe.component.jsx';

const mockReact = React;

jest.mock('./assets/footer_line.png', () => 'mock-footer-line.png');
jest.mock('./assets/icdc_nih_logo.png', () => 'mock-nih-logo.png');
jest.mock('./assets/Download_PDF.svg', () => 'mock-pdf-icon.svg');

jest.mock('./ReadMe.theme.config', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

jest.mock('react-markdown', () => {
  const renderMarkdown = (content, components = {}) => {
    const input = String(content ?? '');
    const parts = [];
    let lastIndex = 0;
    let key = 0;

    const pushText = text => {
      if (text) {
        parts.push(
          mockReact.createElement(
            mockReact.Fragment,
            { key: `text-${(key += 1)}` },
            text
          )
        );
      }
    };

    const pushLink = (label, href) => {
      const LinkComponent = components.a || 'a';
      parts.push(
        mockReact.createElement(
          LinkComponent,
          {
            key: `link-${(key += 1)}`,
            href,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          label
        )
      );
    };

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(input)) !== null) {
      pushText(input.slice(lastIndex, match.index));
      pushLink(match[1], match[2]);
      lastIndex = match.index + match[0].length;
    }

    pushText(input.slice(lastIndex));

    return mockReact.createElement(
      'div',
      { 'data-testid': 'mock-react-markdown' },
      parts
    );
  };

  return {
    __esModule: true,
    default: ({ children, components }) => renderMarkdown(children, components),
  };
});

jest.mock('./ReadMe.styled', () => ({
  __esModule: true,
  TitleContent: ({ children, ...props }) => (
    <div data-testid="title-content" {...props}>
      {children}
    </div>
  ),
  Title: ({ children, ...props }) => (
    <h2 data-testid="dialog-title" {...props}>
      {children}
    </h2>
  ),
  DialogActionContent: ({ children, ...props }) => (
    <div data-testid="dialog-actions" {...props}>
      {children}
    </div>
  ),
  DownloadButton: ({ onClick, children, ...props }) => (
    <button
      data-testid="download-button"
      type="button"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
  DownloadIcon: ({ alt, ...props }) => (
    <img alt={alt || 'pdf download icon'} {...props} />
  ),
  ClosButton: ({ onClick, children, ...props }) => (
    <button
      data-testid="close-button"
      type="button"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
  CloseBtnIcon: props => <span data-testid="close-icon" {...props} />,
  ReadMeContentContainer: ({ children, ...props }) => (
    <div data-testid="readme-content-container" {...props}>
      {children}
    </div>
  ),
  DialogBox: ({ children, ...props }) => (
    <div data-testid="dialog-box" {...props}>
      {children}
    </div>
  ),
}));

jest.mock('../../pages/Cart/utils', () => ({
  createFileName: jest.fn(
    () => 'ICDC-MY-FILES-CART-README 2024-01-01 00-00-00.pdf'
  ),
}));

jest.mock('marked', () => ({
  marked: jest.fn(),
}));

jest.mock('html2pdf.js', () => {
  const mockPdf = {
    setPage: jest.fn(),
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    text: jest.fn(),
    addImage: jest.fn(),
    internal: {
      getNumberOfPages: jest.fn(() => 2),
      pageSize: {
        getHeight: jest.fn(() => 11),
        getWidth: jest.fn(() => 8.5),
      },
    },
  };

  const mockChain = {
    set: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    toPdf: jest.fn().mockReturnThis(),
    get: jest.fn(() => ({
      then: callback => {
        callback(mockPdf);
        return mockChain;
      },
    })),
    save: jest.fn(),
  };

  const mockHtml2pdf = jest.fn(() => mockChain);
  mockHtml2pdf.__mockPdf = mockPdf;
  mockHtml2pdf.__mockChain = mockChain;

  return {
    __esModule: true,
    default: mockHtml2pdf,
  };
});

describe('ReadMeDialogComponent', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    marked.mockImplementation(md => {
      if (!md) return '';
      return `<p>${String(md)}</p><!-- PAGE BREAK --><p>More</p>`;
    });
  });

  test('renders nothing when content is falsy', () => {
    const { container } = render(
      <ReadMeDialogComponent
        display
        displayReadMeDialog={jest.fn()}
        content={null}
        title="My Title"
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders title and markdown content without PAGE BREAK markers and opens links in a new tab', () => {
    render(
      <ReadMeDialogComponent
        display
        displayReadMeDialog={jest.fn()}
        content="Hello [link](http://example.com) <!-- PAGE BREAK --> world"
        title="ReadMe Title"
      />
    );

    expect(screen.getByTestId('dialog-title').textContent).toContain(
      'ReadMe Title'
    );
    expect(screen.getByTestId('readme-content-container')).not.toBeNull();

    const link = screen.getByRole('link', { name: 'link' });
    expect(link.getAttribute('href')).toBe('http://example.com');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');

    expect(screen.queryByText('PAGE BREAK')).toBeNull();
    expect(screen.getByText(/Hello/i)).not.toBeNull();
    expect(screen.getByText(/world/i)).not.toBeNull();
  });

  test('calls close handler when the close button is clicked', () => {
    const closeHandler = jest.fn();

    render(
      <ReadMeDialogComponent
        display
        displayReadMeDialog={closeHandler}
        content="Some content"
        title="Closable ReadMe"
      />
    );

    fireEvent.click(screen.getByTestId('close-button'));
    expect(closeHandler).toHaveBeenCalledTimes(1);
  });

  test('invokes pdf download flow when clicking the download button', () => {
    render(
      <ReadMeDialogComponent
        display
        displayReadMeDialog={jest.fn()}
        content="Some content"
        title="Downloadable ReadMe"
      />
    );

    fireEvent.click(screen.getByTestId('download-button'));

    expect(html2pdf).toHaveBeenCalledTimes(1);
    expect(html2pdf.__mockChain.set).toHaveBeenCalledTimes(1);
    expect(html2pdf.__mockChain.from).toHaveBeenCalledTimes(1);
    expect(html2pdf.__mockChain.toPdf).toHaveBeenCalledTimes(1);
    expect(html2pdf.__mockChain.get).toHaveBeenCalledWith('pdf');
    expect(html2pdf.__mockChain.save).toHaveBeenCalledTimes(1);

    expect(createFileName).toHaveBeenCalledWith(
      'ICDC-MY-FILES-CART-README',
      'pdf'
    );

    const optionsArg = html2pdf.__mockChain.set.mock.calls[0][0];
    expect(optionsArg).toMatchObject({
      filename: 'ICDC-MY-FILES-CART-README 2024-01-01 00-00-00.pdf',
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    });
  });
});

describe('downloadMarkdownPdf', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    marked.mockImplementation(md => {
      if (!md) return '';
      return `<h1>Header</h1><!-- PAGE BREAK --><p>${String(md)}</p>`;
    });
  });

  test('generates pdf with replaced page breaks, header logo, title, and footer content', async () => {
    const { downloadMarkdownPdf } = ReadMeModule;

    await downloadMarkdownPdf('My README', 'body text');

    expect(html2pdf).toHaveBeenCalledTimes(1);
    expect(html2pdf.__mockChain.set).toHaveBeenCalledTimes(1);
    expect(html2pdf.__mockChain.from).toHaveBeenCalledTimes(1);

    const containerElement = html2pdf.__mockChain.from.mock.calls[0][0];
    expect(containerElement).toBeInstanceOf(HTMLElement);

    const htmlString = containerElement.innerHTML;
    expect(htmlString).toContain('My README');
    expect(htmlString).toContain('class="page-break"');
    expect(htmlString).toMatch(/<img[^>]+alt="logo"/);
    expect(marked).toHaveBeenCalledWith('body text');

    expect(html2pdf.__mockPdf.internal.getNumberOfPages).toHaveBeenCalledTimes(
      1
    );
    expect(html2pdf.__mockPdf.setPage).toHaveBeenCalledTimes(2);
    expect(html2pdf.__mockPdf.setFont).toHaveBeenCalledTimes(2);
    expect(html2pdf.__mockPdf.setFontSize).toHaveBeenCalledTimes(2);
    expect(html2pdf.__mockPdf.setTextColor).toHaveBeenCalledTimes(2);
    expect(html2pdf.__mockPdf.text).toHaveBeenCalledTimes(4);
    expect(html2pdf.__mockPdf.addImage).toHaveBeenCalledTimes(2);
    expect(html2pdf.__mockChain.save).toHaveBeenCalledTimes(1);
  });

  test('handles empty or undefined content without throwing and still saves the pdf', async () => {
    const { downloadMarkdownPdf } = ReadMeModule;

    await expect(
      downloadMarkdownPdf('Empty Title', '')
    ).resolves.toBeUndefined();
    expect(html2pdf.__mockChain.save).toHaveBeenCalledTimes(1);

    jest.clearAllMocks();
    marked.mockImplementation(md => (!md ? '' : `<p>${String(md)}</p>`));

    await expect(
      downloadMarkdownPdf('No Content Title', undefined)
    ).resolves.toBeUndefined();
    expect(html2pdf.__mockChain.save).toHaveBeenCalledTimes(1);
  });
});
