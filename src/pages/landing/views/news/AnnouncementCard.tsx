import React from 'react';
import styled from '@emotion/styled';

import {
  NEWS_COLORS,
  NEWS_FONT_FAMILIES,
  NEWS_HTML_ATTRIBUTES,
} from './constants';
import { AnnouncementDialog } from './AnnouncementDialog';
import { NewsCard } from './NewsCard';
import type { StaticAnnouncement } from './types';

type AnnouncementCardProps = {
  title: string;
  icon: string;
  announcements: StaticAnnouncement[];
};

const Row = styled.button<{ hasPrevious: boolean }>`
  appearance: none;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-top: ${props =>
    props.hasPrevious ? `4px solid ${NEWS_COLORS.newsCardContent}` : '0'};
  padding: 0.5em 1em;
  background-color: ${NEWS_COLORS.subduedSurface};
  color: ${NEWS_COLORS.announcementText};
  cursor: pointer;
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  &:hover {
    background-color: ${NEWS_COLORS.interactiveHover};
  }

  &:focus-visible {
    outline: 2px solid ${NEWS_COLORS.focusOutline};
    outline-offset: 2px;
  }
`;

export const AnnouncementCard = ({
  title,
  icon,
  announcements,
}: AnnouncementCardProps) => {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    React.useState<StaticAnnouncement | null>(null);

  return (
    <NewsCard title={title} icon={icon}>
      {announcements.map((announcement, index) => (
        <Row
          key={announcement.id}
          type={NEWS_HTML_ATTRIBUTES.buttonType}
          hasPrevious={index > 0}
          onClick={() => setSelectedAnnouncement(announcement)}
        >
          {announcement.label}
        </Row>
      ))}
      <AnnouncementDialog
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </NewsCard>
  );
};
