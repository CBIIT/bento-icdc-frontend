import React from 'react';
import styled from '@emotion/styled';

import {
  NEWS_COLORS,
  NEWS_FONT_FAMILIES,
  NEWS_HTML_ATTRIBUTES,
  PUBLICATIONS_ICON,
} from './constants';
import { NewsCard } from './NewsCard';
import { NewsStatus } from './NewsStatus';
import { PublicationDialog } from './PublicationDialog';
import type { NewsPublication } from './types';
import { usePublications } from './usePublications';

const Row = styled.div<{ hasPrevious: boolean }>`
  box-sizing: border-box;
  border-top: ${props =>
    props.hasPrevious ? `4px solid ${NEWS_COLORS.newsCardContent}` : '0'};
  padding: 0.5em 1em;
  background-color: ${NEWS_COLORS.subduedSurface};
  text-align: center;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${NEWS_COLORS.interactiveHover};
  }
`;

const PublicationButton = styled.button`
  appearance: none;
  background: none;
  border: 0;
  color: ${NEWS_COLORS.link};
  cursor: pointer;
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  padding: 0;
  text-align: left;
  text-decoration: underline;
  max-width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  &:focus-visible {
    outline: 2px solid ${NEWS_COLORS.focusOutline};
    outline-offset: 2px;
  }
`;

export const PublicationCard = ({ title }: { title: string }) => {
  const { data: publications = [], isError } = usePublications();
  const [selectedPublication, setSelectedPublication] =
    React.useState<NewsPublication | null>(null);

  return (
    <NewsCard title={title} icon={PUBLICATIONS_ICON}>
      {isError && publications.length === 0 ? (
        <NewsStatus isError />
      ) : publications.length === 0 ? (
        <NewsStatus isError={false} />
      ) : (
        publications.map((publication, index) => (
          <Row key={publication.title} hasPrevious={index > 0}>
            <PublicationButton
              type={NEWS_HTML_ATTRIBUTES.buttonType}
              onClick={() => setSelectedPublication(publication)}
            >
              {publication.title}
            </PublicationButton>
          </Row>
        ))
      )}
      <PublicationDialog
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
      />
    </NewsCard>
  );
};
