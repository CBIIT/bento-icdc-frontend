import React from 'react';
import styled from '@emotion/styled';
import { OpenInNew } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import ReactMarkdown from 'react-markdown';

import {
  DIALOG_IDS,
  NEWS_COLORS,
  NEWS_COPY,
  NEWS_FONT_FAMILIES,
  NEWS_HTML_ATTRIBUTES,
} from './constants';
import { DialogCloseButton } from './DialogCloseButton';
import type { StaticAnnouncement } from './types';

type AnnouncementDialogProps = {
  announcement: StaticAnnouncement | null;
  onClose: () => void;
};

const DialogFrame = styled(Dialog)`
  & .MuiDialog-paper {
    width: 1100px;
    max-height: calc(100% - 64px);
    margin: 32px;
    background: ${NEWS_COLORS.cardSurface};
    border-radius: 8px;
    box-shadow: none;
    overflow: hidden;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  min-width: 0;
  padding: 36px 48px 4px 60px;
`;

const Title = styled(DialogTitle)`
  display: flex;
  align-items: baseline;
  flex: 1 1 0;
  flex-wrap: wrap;
  gap: 0 12px;
  min-width: 0;
  padding: 0;
`;

const AnnouncementLabel = styled.span`
  color: ${NEWS_COLORS.black};
  font-family: ${NEWS_FONT_FAMILIES.raleway};
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
`;

const AnnouncementTitle = styled.span`
  color: ${NEWS_COLORS.announcementText};
  flex: 1 1 0;
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const Content = styled(DialogContent)`
  && {
    color: ${NEWS_COLORS.announcementContent};
    min-height: 72px;
    font-family: ${NEWS_FONT_FAMILIES.openSans};
    font-size: 18px;
    line-height: 30px;
    padding: 18px 60px 48px;
  }
`;

const MarkdownContent = styled.div`
  p {
    margin: 0 0 18px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const InlineExternalLink = styled.a`
  color: ${NEWS_COLORS.releaseLink};
  font-weight: 600;
  text-decoration: underline;
`;

const ExternalLink = styled(InlineExternalLink)`
  display: inline;
  letter-spacing: 0.2px;

  svg {
    display: inline;
    font-size: 18px;
    margin-left: 4px;
    vertical-align: middle;
  }
`;

const getAnnouncementLink = (announcement: StaticAnnouncement | null) =>
  typeof announcement?.link === 'string'
    ? { label: NEWS_COPY.announcementsLink, url: announcement.link }
    : announcement?.link;

export const AnnouncementDialog = ({
  announcement,
  onClose,
}: AnnouncementDialogProps) => {
  const link = getAnnouncementLink(announcement);

  return (
    <DialogFrame
      open={announcement !== null}
      onClose={onClose}
      aria-labelledby={DIALOG_IDS.announcement}
      maxWidth={false}
    >
      <Header>
        <Title id={DIALOG_IDS.announcement}>
          <AnnouncementLabel>{NEWS_COPY.announcement}</AnnouncementLabel>
          <AnnouncementTitle>{announcement?.label}</AnnouncementTitle>
        </Title>
        <DialogCloseButton
          aria-label={NEWS_COPY.closeAnnouncement}
          onClick={onClose}
        />
      </Header>
      <Content>
        {announcement?.blurb && (
          <MarkdownContent>
            <ReactMarkdown
              components={{
                a: props => (
                  <InlineExternalLink
                    {...props}
                    target={NEWS_HTML_ATTRIBUTES.externalLinkTarget}
                    rel={NEWS_HTML_ATTRIBUTES.externalLinkRel}
                  />
                ),
              }}
            >
              {announcement.blurb}
            </ReactMarkdown>
          </MarkdownContent>
        )}
        {announcement?.paragraph && (
          <MarkdownContent>
            <ReactMarkdown
              components={{
                a: props => (
                  <InlineExternalLink
                    {...props}
                    target={NEWS_HTML_ATTRIBUTES.externalLinkTarget}
                    rel={NEWS_HTML_ATTRIBUTES.externalLinkRel}
                  />
                ),
              }}
            >
              {announcement.paragraph}
            </ReactMarkdown>
          </MarkdownContent>
        )}
        {link?.url && (
          <p>
            <ExternalLink
              href={link.url}
              target={NEWS_HTML_ATTRIBUTES.externalLinkTarget}
              rel={NEWS_HTML_ATTRIBUTES.externalLinkRel}
            >
              {link.label || NEWS_COPY.announcementsLink}
              <OpenInNew />
            </ExternalLink>
          </p>
        )}
      </Content>
    </DialogFrame>
  );
};
