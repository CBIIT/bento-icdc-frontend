/* eslint-disable */
import React, { useCallback } from 'react';
import { externalIcon } from '../../../bento/studyDetailsData';
import styled from '@emotion/styled';

const Container = styled.div<{ isEmpty: boolean }>(({ isEmpty }) => ({
  display: 'flex',
  flex: 1,
  height: '100%',
  padding: isEmpty ? '25px 45px' : '0 82px',
  paddingBottom: '20px',

}))
const LeftPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #81a6b9;
  padding: 50px 50px 50px 0;
`;

const RightPanel = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 300px 1fr;
  padding: 50px;
`;

const PublicationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 100px;
`;

const PublicationTitle = styled.div`
  font-family: 'Open Sans';
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 0.2px;
  color: #000000;
`;

const MetadataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MetadataItem = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0 32px;
  align-items: center;
`;

const MetadataKey = styled.div`
  color: #01769d;
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
  color: #000000;
`;

const LinkWrapper = styled.a`
  font-size: 12px;
  color: #b85300;
  cursor: pointer;
  font-family: 'Open Sans';
  font-weight: 600;
  text-decoration: underline;

  &:hover {
    color: #9e4700;
  }
`;

const LinkContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LinkIcon = styled.img`
  width: 20px;
`;

const NoPublicationsMessage = styled.div`
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
  type: "text" | "link";
  url?: string;
}

type DisplayConfig = DisplayAttribute[];

interface Display {
  numbOfPublishPerView: number;
  views: DisplayConfig
}


const Publication = ({ publications, display }: {
  publications: Publication[],
  display: Display
}) => {
  const sortPublicationList = [...publications].sort(
    (a, b) =>
      b.year_of_publication - a.year_of_publication ||
      a.publication_title.localeCompare(b.publication_title)
  );

  const splitPublications = useCallback(() => {
    const first: Publication[] = [];
    const second: Publication[] = [];

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

  const getURL = (id: string | number, url: string) => url.concat(String(id));

  const renderPublicationList = (publication: Publication, index: number) => (
    <PublicationList key={`publication-${index}`}>
      <PublicationTitle>{publication.publication_title}</PublicationTitle>
      <MetadataWrapper>
        {display.views.map((attr, attrIndex) => (
          <MetadataItem key={`metadata-${index}-${attrIndex}`}>
            <MetadataKey>{attr.label}</MetadataKey>
            {attr.type === 'link' ? (
              <LinkWrapper
                href={getURL(publication[attr.key], attr.url)}
                target="_blank"
                rel="noreferrer"
              >
                <LinkContent>
                  <div>{publication[attr.key]}</div>
                  <LinkIcon src={externalIcon} alt="external link" />
                </LinkContent>
              </LinkWrapper>
            ) : (
              <MetadataValue>{publication[attr.key]}</MetadataValue>
            )}
          </MetadataItem>
        ))}
      </MetadataWrapper>
    </PublicationList>
  );

  return (
    <Container isEmpty={!publications.length}>
      {
        !publications.length ? (
          <NoPublicationsMessage>
            This study currently has no associated publications
          </NoPublicationsMessage>

        ) : (
          <>
            <LeftPanel>
              {
                leftPanelList.map(renderPublicationList)
              }
            </LeftPanel>
            <RightPanel>
              {rightPanelList.map(renderPublicationList)}
            </RightPanel>

          </>
        )
      }
    </Container>
  );
};

export default Publication;
