/* eslint-disable */
import React, { useCallback } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { externalIcon } from '../../../bento/studyDetailsData';
import styled from '@emotion/styled';

const Container = styled.div({
  display: 'flex',
  flex: 1,
  height: '100%',
  padding: '0 82px',
  paddingBottom: '20px',
  '& .pub-list': {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    marginBottom: '100px',
  },
});

const LeftPanel = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #81A6B9',
  padding: '50px 50px 50px 0',
});

const RightPanel = styled.div({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '300px 1fr',
  padding: '50px',
});

const PublicationTitle = styled.div({
  fontFamily: 'Open Snas',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '30px',
  letterSpacing: '0.2px',
  color: '#000000',
});

const MetadataWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '& .item': {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '0 32px',
    alignItems: 'center',
    '& .key': {
      color: '#01769D',
      fontFamily: 'Open Sans',
      fontSize: '14px',
      lineHeight: '23px',
      letterSpacing: '0.2px',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    '& .value': {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '30px',
      letterSpacing: '0.2px',
      fontFamily: 'Open Sans',
      color: '#000000',
    },
    '& .link-wrapper': {
      fontSize: '12px',
      color: '#B85300',
      cursor: 'pointer',
      fontFamily: 'Open Sans',
      fontWeight: '600',
      textDecoration: 'underline',
      '&:hover': {
        color: '#9E4700',
      },
      '& .link-content': {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',

        '& .link-icon': {
          width: '20px',
        },
      },
    },
  },
});

const Publication = ({ publications, display }) => {
  const sortPublicationList = [...publications].sort(
    (a, b) =>
      b.year_of_publication - a.year_of_publication ||
      a.publication_title.localeCompare(b.publication_title)
  );

  const splitPublications = useCallback(() => {
    const first = [];
    const second = [];

    sortPublicationList.forEach((item, index) => {
      if (index % 2 === 0) {
        first.push(item);
      } else {
        second.push(item);
      }
    });

    return [first, second];
  }, [sortPublicationList]);

  const [leftPanelList, rightPanelList] = splitPublications();

  const getURL = (id, url) => url.concat(id);

  const publicationList = publication => (
    <div className="pub-list">
      <PublicationTitle>{publication.publication_title}</PublicationTitle>
      <MetadataWrapper>
        {display.views.map(attr => (
          <div className="item">
            <div className="key">{attr.label}</div>
            {attr.type === 'link' ? (
              <a
                href={getURL(publication[attr.key], attr.url)}
                target="_blank"
                rel="noreferrer"
                className="link-wrapper"
              >
                <div className="link-content">
                  <div>{publication[attr.key]}</div>
                  <img
                    src={externalIcon}
                    alt="imageLink"
                    className="link-icon"
                  />
                </div>
              </a>
            ) : (
              <div className="value">{publication[attr.key]}</div>
            )}
          </div>
        ))}
      </MetadataWrapper>
    </div>
  );

  return (
    <Container>
      <LeftPanel>
        {leftPanelList.map(publication => publicationList(publication))}
      </LeftPanel>
      <RightPanel>
        {rightPanelList.map(publication => publicationList(publication))}
      </RightPanel>
    </Container>
  );
};

export default Publication;
