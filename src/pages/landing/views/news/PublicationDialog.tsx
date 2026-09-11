import React from 'react';
import styled from '@emotion/styled';
import { OpenInNew } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import {
  DIALOG_IDS,
  NEWS_COLORS,
  NEWS_COPY,
  NEWS_FONT_FAMILIES,
  NEWS_HTML_ATTRIBUTES,
} from './constants';
import { DialogCloseButton } from './DialogCloseButton';
import type { NewsPublication } from './types';

type PublicationDialogProps = {
  publication: NewsPublication | null;
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

const PublicationLabel = styled.span`
  color: ${NEWS_COLORS.black};
  font-family: ${NEWS_FONT_FAMILIES.raleway};
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
`;

const PublicationTitle = styled.span`
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
    color: ${NEWS_COLORS.black};
    min-height: 72px;
    font-family: ${NEWS_FONT_FAMILIES.openSans};
    font-size: 18px;
    line-height: 30px;
    padding: 18px 60px 48px;
  }
`;

const ExternalLink = styled.a`
  display: inline;
  color: ${NEWS_COLORS.releaseLink};
  font-weight: 600;
  letter-spacing: 0.2px;
  text-decoration: underline;

  svg {
    display: inline;
    font-size: 18px;
    margin-left: 4px;
    vertical-align: middle;
  }
`;

const IdentifierLabel = styled.span`
  color: ${NEWS_COLORS.black};
`;

export const PublicationDialog = ({
  publication,
  onClose,
}: PublicationDialogProps) => (
  <DialogFrame
    open={publication !== null}
    onClose={onClose}
    aria-labelledby={DIALOG_IDS.publication}
    maxWidth={false}
  >
    <Header>
      <Title id={DIALOG_IDS.publication}>
        <PublicationLabel>{NEWS_COPY.publication}</PublicationLabel>
        <PublicationTitle>{publication?.title}</PublicationTitle>
      </Title>
      <DialogCloseButton
        aria-label={`Close ${NEWS_COPY.publication}`}
        onClick={onClose}
      />
    </Header>
    <Content>
      {publication?.doi && publication.doiUrl ? (
        <>
          <IdentifierLabel>{NEWS_COPY.doi} </IdentifierLabel>
          <ExternalLink
            href={publication.doiUrl}
            target={NEWS_HTML_ATTRIBUTES.externalLinkTarget}
            rel={NEWS_HTML_ATTRIBUTES.externalLinkRel}
          >
            {publication.doi}
            <OpenInNew />
          </ExternalLink>
        </>
      ) : publication?.pubmedId && publication.pubmedUrl ? (
        <>
          <IdentifierLabel>{NEWS_COPY.pubMed} </IdentifierLabel>
          <ExternalLink
            href={publication.pubmedUrl}
            target={NEWS_HTML_ATTRIBUTES.externalLinkTarget}
            rel={NEWS_HTML_ATTRIBUTES.externalLinkRel}
          >
            {publication.pubmedId}
            <OpenInNew />
          </ExternalLink>
        </>
      ) : (
        NEWS_COPY.externalLinkUnavailable
      )}
    </Content>
  </DialogFrame>
);
