import React from 'react';
import styled from '@emotion/styled';
import { externalIcon } from '../../../bento/studyDetailsData';
import { Publication } from '../../../generated-types/types';

const PublicationsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 80px;
`;

const PublicationList = styled.div<{ hasBorder: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  border-right: ${({ hasBorder }) =>
    hasBorder ? '1px solid #81A6B9' : 'none'};
  border-bottom: 0.75px solid #81a6b9;
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

const Placeholder = styled.div<{
  hasBorder: boolean;
  hasBottom: boolean;
}>`
  height: ${({ hasBottom }) => (hasBottom ? 'auto' : '100px')};
  border-right: ${({ hasBorder }) =>
    hasBorder ? '1px solid #81A6B9' : 'none'};
  ${({ hasBottom }) =>
    hasBottom ? 'border-bottom: 0.75px solid #81A6B9;' : ''}
`;

interface DisplayAttribute {
  label: string;
  key: keyof Publication;
  type: 'text' | 'link';
  url?: string;
}

interface Display {
  numbOfPublishPerView: number;
  views: DisplayAttribute[];
}

interface Props {
  publications: Publication[];
  display: Display;
}

const PublicationGrid: React.FC<Props> = ({ publications, display }) => {
  if (publications.length === 0) {
    return (
      <PublicationsContainer>
        <NoPublicationsMessage>
          This study currently has no associated publications
        </NoPublicationsMessage>
      </PublicationsContainer>
    );
  }

  type Item =
    | { type: 'pub'; data: Publication }
    | { type: 'placeholder'; variant: 'balance' | 'footer' };

  const items: Item[] = [];

  publications.forEach(pub => items.push({ type: 'pub', data: pub }));

  if (publications.length % 2 === 1) {
    items.push({ type: 'placeholder', variant: 'balance' });
  }

  items.push(
    { type: 'placeholder', variant: 'footer' },
    { type: 'placeholder', variant: 'footer' }
  );

  const getURL = (id: string | number, base: string) => base + String(id);

  return (
    <PublicationsContainer>
      {items.map((item, idx) => {
        const hasBorder = idx % 2 === 0;

        if (item.type === 'placeholder') {
          const hasBottom = item.variant === 'balance';
          return (
            <Placeholder
              key={`ph-${idx}`}
              hasBorder={hasBorder}
              hasBottom={hasBottom}
            />
          );
        }

        const pub = item.data;
        return (
          <PublicationList key={`pub-${idx}`} hasBorder={hasBorder}>
            <PublicationTitle>{pub.publication_title}</PublicationTitle>
            <MetadataWrapper>
              {display.views.map((attr, aIdx) => {
                const value = pub[attr.key] as string | number;
                return (
                  <MetadataItem key={aIdx}>
                    <MetadataKey>{attr.label}</MetadataKey>
                    {attr.type === 'link' && attr.url ? (
                      <LinkContent
                        href={getURL(value, attr.url)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div>{value}</div>
                        <LinkIcon src={externalIcon} alt="external link" />
                      </LinkContent>
                    ) : (
                      <MetadataValue>{value}</MetadataValue>
                    )}
                  </MetadataItem>
                );
              })}
            </MetadataWrapper>
          </PublicationList>
        );
      })}
    </PublicationsContainer>
  );
};

export default PublicationGrid;
