/* eslint-disable */
import React, { useCallback } from 'react';
import { externalIcon } from '../../../bento/studyDetailsData';
import styled from '@emotion/styled';

const PublicationsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 80px;
`;

const PublicationList = styled.div<{ hasBorder: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-right: ${({ hasBorder }) =>
    hasBorder ? '1px solid #81A6B9' : 'none'};
`;

const PublicationContent = styled.div`
  border-bottom: 0.75px solid #81a6b9;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const PublicationTitle = styled.div`
  font-family: 'Open Sans';
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.2px;
  color: #005c7a;
`;

const MetadataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  gap: 8px;
`;

const MetadataItem = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0 32px;
  align-items: center;
`;

const MetadataKey = styled.div`
  color: #027da7;
  font-family: 'Open Sans';
  font-size: 14px;
  line-height: 23px;
  letter-spacing: 0.2px;
  font-weight: 600;
  text-transform: uppercase;
`;

const MetadataValue = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.2px;
  font-family: 'Open Sans';
  color: #000;
`;

const LinkContent = styled.a`
  font-size: 18px;
  color: #b85300;
  font-family: 'Open Sans';
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  width: fit-content;

  &:hover {
    color: #9e4700;
  }
`;

const LinkIcon = styled.img`
  width: 20px;
`;

const NoPublicationsMessage = styled.div`
  grid-column: 1 / -1;
  padding-left: 32px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 400;
  font-family: 'Open Sans';
  line-height: 30px;
  letter-spacing: 0.2px;
  min-height: 500px;
  color: #000;
`;

const Placeholder = styled.div<{ hasBorder: boolean }>`
  height: 100px;
  border-right: ${({ hasBorder }) =>
    hasBorder ? '1px solid #81A6B9' : 'none'};
`;

interface Publication {
  publication_title: string;
  authorship: string;
  year_of_publication: number;
  journal_citation: string;
  digital_object_id?: string;
  pubmed_id?: string;
}

interface DisplayAttribute {
  label: string;
  key: keyof Publication;
  type: 'text' | 'link';
  url?: string;
}

type DisplayConfig = DisplayAttribute[];

interface Display {
  numbOfPublishPerView: number;
  views: DisplayConfig;
}

const Publication = ({
  publications,
  display,
}: {
  publications: Publication[];
  display: Display;
}) => {
  const getURL = (id: string | number, url: string) => url.concat(String(id));

  const renderPublication = useCallback(
    (pub: Publication, idx: number) => (
      <PublicationList key={`publication-${idx}`} hasBorder={idx % 2 === 0}>
        <PublicationContent>
          <PublicationTitle>{pub.publication_title}</PublicationTitle>
          <MetadataWrapper>
            {display.views.map((attr, aIdx) => (
              <MetadataItem key={`meta-${idx}-${aIdx}`}>
                <MetadataKey>{attr.label}</MetadataKey>
                {attr.type === 'link' && attr.url ? (
                  <LinkContent
                    href={getURL(pub[attr.key], attr.url)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div>{pub[attr.key]}</div>
                    <LinkIcon src={externalIcon} alt="external link" />
                  </LinkContent>
                ) : (
                  <MetadataValue>{pub[attr.key]}</MetadataValue>
                )}
              </MetadataItem>
            ))}
          </MetadataWrapper>
        </PublicationContent>
      </PublicationList>
    ),
    [display.views]
  );

  if (publications.length === 0) {
    return (
      <PublicationsContainer>
        <NoPublicationsMessage>
          This study currently has no associated publications
        </NoPublicationsMessage>
      </PublicationsContainer>
    );
  }

  const items = publications.map(renderPublication);

  // If odd number of publications, fill the last row
  if (publications.length % 2 === 1) {
    items.push(<Placeholder key="placeholder-fill" hasBorder={false} />);
  }

  // Always add two placeholders
  items.push(
    <Placeholder key="placeholder-left" hasBorder={true} />,
    <Placeholder key="placeholder-right" hasBorder={false} />
  );

  return <PublicationsContainer>{items}</PublicationsContainer>;
};

export default Publication;
