import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

export const PAGE_CONTENT_MAX_WIDTH = '1600px';
export const PAGE_CONTENT_CENTER_BREAKPOINT = '2000px';

type PageContentProps = React.HTMLAttributes<HTMLDivElement> & {
  maxWidth?: CSSProperties['maxWidth'];
  noPadding?: boolean;
};

const PageContentRoot = styled('div', {
  shouldForwardProp: prop => prop !== 'noPadding',
})<{ noPadding?: boolean }>(({ noPadding }) => ({
  width: '100%',
  maxWidth: 'none',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: noPadding ? 0 : '24px',
  paddingRight: noPadding ? 0 : '24px',
  boxSizing: 'border-box',
  minWidth: 0,
  '@media (min-width: 1280px)': {
    paddingLeft: noPadding ? 0 : '32px',
    paddingRight: noPadding ? 0 : '32px',
  },
  [`@media (min-width: ${PAGE_CONTENT_CENTER_BREAKPOINT})`]: {
    maxWidth: 'var(--page-content-max-width)',
  },
}));

const PageContent = React.forwardRef<HTMLDivElement, PageContentProps>(
  (
    { maxWidth = PAGE_CONTENT_MAX_WIDTH, noPadding = false, style, ...rest },
    ref
  ) => {
    const contentStyle = {
      '--page-content-max-width': maxWidth,
      ...style,
    } as CSSProperties;

    return (
      <PageContentRoot
        ref={ref}
        noPadding={noPadding}
        style={contentStyle}
        {...rest}
      />
    );
  }
);

PageContent.displayName = 'PageContent';

export default PageContent;
