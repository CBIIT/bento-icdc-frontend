import React from 'react';
import styled from '@emotion/styled';

import { NEWS_COLORS, NEWS_FONT_FAMILIES } from './constants';

type NewsCardProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};

const Container = styled.section`
  height: 179px;
  flex: 0 0 179px;
  border-radius: 13px;
  border: 1.5px solid ${NEWS_COLORS.cardBorder};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${NEWS_COLORS.cardSurface};
`;

const Header = styled.div`
  height: 35px;
  min-height: 35px;
  background-color: ${NEWS_COLORS.cardHeader};
  display: flex;
  align-items: center;
  gap: 0.75em;
  padding: 0 1em;
`;

const HeaderImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${NEWS_COLORS.cardSurface};
  object-fit: cover;
`;

const HeaderText = styled.span`
  font-family: ${NEWS_FONT_FAMILIES.nunito};
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: 0%;
  color: ${NEWS_COLORS.cardSurface};
`;

const Content = styled.div`
  overflow-y: overlay;
  flex: 1;
  min-height: 0;
  background-color: ${NEWS_COLORS.cardSurface};
  scrollbar-width: thin;
  scrollbar-color: ${NEWS_COLORS.scrollbarDark} transparent;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${NEWS_COLORS.scrollbarDark};
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const NewsCard = ({ title, icon, children }: NewsCardProps) => (
  <Container>
    <Header>
      <HeaderImage src={icon} alt={title} />
      <HeaderText>{title}</HeaderText>
    </Header>
    <Content>{children}</Content>
  </Container>
);
