/* eslint-disable */
import React from 'react';
import { Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { pageData } from '../../../bento/landingPageData';

// Styled Components
const StyledGrid = styled(Grid)`
  margin-top: ${({ activeTemplate }: { activeTemplate: string }) =>
    activeTemplate === 'twitter' ? '3em' : '1em'};
`;

const StyledWidgetGrid = styled(Grid)`
  padding-left: ${({ theme }: { theme: Record<string, any> }) =>
    theme.spacing(2)};
`;

const Item = styled(Paper)`
  ${({ theme }: { theme: Record<string, any> }) => theme.typography.body2}
  text-align: center;
  color: ${({ theme }: { theme: Record<string, any> }) =>
    theme.palette.text.secondary};
  border-radius: 13px;
  margin-top: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  background: #ffffff;
  color: #103556;
  font-size: 18px;
  font-weight: 900;
  border-radius: 13px;
  height: 30px;
  padding-top: 5px;
  line-height: 25px;
`;

const Description = styled.div`
  font-size: 13px;
  padding: 1px 5px 10px 5px;
  color: #000000;
  height: 25px;
`;

const ImageContainer = styled.div`
  & img {
    max-width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Widgets = ({ activeTemplate }: { activeTemplate: string }) => {
  return (
    <StyledGrid
      activeTemplate={activeTemplate}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
    >
      {pageData.widgets.map((widget, index) => (
        <StyledWidgetGrid key={`landingWidget-${index}`} item xs={3}>
          <Item>
            <StyledLink to={widget.callToActionLink}>
              <Container>
                <Title>{widget.titleText}</Title>
                <ImageContainer>
                  <img src={widget.img} alt={widget.alt} />
                </ImageContainer>
                <Description>{widget.descriptionText}</Description>
              </Container>
            </StyledLink>
          </Item>
        </StyledWidgetGrid>
      ))}
    </StyledGrid>
  );
};

export default Widgets;
