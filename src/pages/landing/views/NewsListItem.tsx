import React from 'react';
import styled from '@emotion/styled';
import { OpenInNew } from '@mui/icons-material';

// Styled Components
const Container = styled.div`
  min-height: 179px;
  flex: 1;
  border-radius: 13px;
  border: 1.5px solid hsla(212, 86%, 17%, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.div`
  height: 35px;
  min-height: 35px;
  background-color: hsla(213, 86%, 17%, 1);
  display: flex;
  align-items: center;
  gap: 0.75em;
  padding: 0 1em;
`;

const HeaderImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
`;

const HeaderText = styled.span`
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: 0%;
  color: white;
`;

const ContentWrapper = styled.div`
  overflow-y: auto;
  flex: 1;
  background-color: white;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const TableRow = styled.div<{ isEven?: boolean }>`
  display: grid;
  grid-template-columns: 80px 1fr 180px;
  gap: 1em;
  padding: 0.5em 1em;
  background-color: ${props => (props.isEven ? '#f5f5f5' : 'white')};
  align-items: center;
  text-align: center;

  & > span:last-child {
    justify-self: center;
  }
`;

const Label = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 0.05em;
  color: hsla(209, 27%, 33%, 1);
  text-transform: uppercase;
  text-align: center;
`;

const Value = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0%;
  color: hsla(258, 65%, 18%, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Date = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0%;
  color: hsla(258, 65%, 18%, 1);
  white-space: nowrap;
  text-align: left;
`;

const LinkRow = styled.div<{ isEven?: boolean }>`
  padding: 0.5em 1em;
  background-color: ${props => (props.isEven ? '#f5f5f5' : 'white')};
  text-align: center;
  display: flex;
  justify-content: center;
`;

const LinkText = styled.a`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0%;
  color: hsla(27, 100%, 36%, 1);
  text-decoration: underline;
  text-decoration-style: solid;
  text-underline-offset: 0%;
  text-decoration-thickness: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.15em;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }

  svg {
    font-size: 14px;
  }
`;

type NewsItemData = {
  label: string;
  value: string;
  date: string;
};

type PublicationData = {
  title: string;
  url: string;
};

type NewsItemProps = {
  title: string;
  icon: string;
  items: NewsItemData[] | PublicationData[];
  type?: 'table' | 'publications';
};

const NewsItem = ({ title, icon, items, type = 'table' }: NewsItemProps) => {
  if (!items || !Array.isArray(items)) {
    items = [];
  }

  return (
    <Container>
      <Header>
        <HeaderImage src={icon} alt={title} />
        <HeaderText>{title}</HeaderText>
      </Header>

      <ContentWrapper>
        {items.length === 0 ? (
          <TableRow isEven={false}>
            <Value
              style={{
                gridColumn: '1 / -1',
                justifyContent: 'center',
                color: '#666',
              }}
            >
              Loading...
            </Value>
          </TableRow>
        ) : type === 'table' ? (
          (items as NewsItemData[]).map((item, index) => (
            <TableRow key={index} isEven={index % 2 === 1}>
              <Label>{item.label}</Label>
              <Value>{item.value}</Value>
              <Date>{item.date}</Date>
            </TableRow>
          ))
        ) : (
          (items as PublicationData[]).map((item, index) => (
            <LinkRow key={index} isEven={index % 2 === 1}>
              <LinkText
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
                <OpenInNew />
              </LinkText>
            </LinkRow>
          ))
        )}
      </ContentWrapper>
    </Container>
  );
};

export default NewsItem;
