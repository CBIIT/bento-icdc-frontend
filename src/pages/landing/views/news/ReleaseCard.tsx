import React from 'react';
import styled from '@emotion/styled';

import {
  NEWS_COLORS,
  NEWS_FONT_FAMILIES,
  NEWS_HTML_ATTRIBUTES,
} from './constants';
import { NewsCard } from './NewsCard';
import { NewsStatus } from './NewsStatus';
import { ReleaseDialog } from './ReleaseDialog';
import type { ReleaseCardConfig } from './types';
import { useGitHubReleases } from './useGitHubReleases';

type ReleaseCardProps = {
  title: string;
  config: ReleaseCardConfig;
};

const Row = styled.button<{ hasPrevious: boolean }>`
  appearance: none;
  border: 0;
  border-top: ${props =>
    props.hasPrevious ? `4px solid ${NEWS_COLORS.newsCardContent}` : '0'};
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1em;
  padding: 0.25em 1em;
  background-color: ${NEWS_COLORS.subduedSurface};
  align-items: center;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: ${NEWS_COLORS.interactiveHover};
  }

  &:focus-visible {
    outline: 2px solid ${NEWS_COLORS.focusOutline};
    outline-offset: -2px;
  }
`;

const Label = styled.span`
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-weight: 700;
  font-style: normal;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 0.05em;
  color: ${NEWS_COLORS.releaseRowLabel};
  text-transform: uppercase;
  text-align: left;
  justify-self: start;
`;

const Value = styled.span`
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  line-height: 16px;
  color: ${NEWS_COLORS.releaseRowValue};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const Date = styled.span`
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${NEWS_COLORS.releaseRowValue};
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  justify-self: start;
`;

export const ReleaseCard = ({ title, config }: ReleaseCardProps) => {
  const { data: releases = [], isError } = useGitHubReleases(config.repository);
  const [selectedRelease, setSelectedRelease] = React.useState<
    (typeof releases)[number] | null
  >(null);

  return (
    <NewsCard title={title} icon={config.icon}>
      {isError && releases.length === 0 ? (
        <NewsStatus isError />
      ) : releases.length === 0 ? (
        <NewsStatus isError={false} />
      ) : (
        releases.map((release, index) => (
          <Row
            key={`${release.value}-${release.date}`}
            type={NEWS_HTML_ATTRIBUTES.buttonType}
            hasPrevious={index > 0}
            onClick={() => setSelectedRelease(release)}
          >
            <Label>{release.label}</Label>
            <Value>{release.value}</Value>
            <Date>{release.date}</Date>
          </Row>
        ))
      )}
      <ReleaseDialog
        release={selectedRelease}
        config={config}
        onClose={() => setSelectedRelease(null)}
      />
    </NewsCard>
  );
};
