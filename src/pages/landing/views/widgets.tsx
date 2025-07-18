/* eslint-disable */
import React from 'react';
import { Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

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
  font-family: Lato;
  font-weight: 700;
  font-style: Bold;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0%;
  color: #000000;
  background: #ffffff;
  border-radius: 13px;
  height: 30px;
  padding-top: 5px;
`;

const Description = styled.div`
  padding: 1px 5px 10px 5px;
  color: #000000;
  font-family: Roboto;
  font-weight: 400;
  font-style: Regular;
  font-size: 13px;
  line-height: 17px;
  letter-spacing: 0%;
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

const Widgets = ({ pageData }: { pageData: any }) => {
  const activeTemplate = pageData.tabs[3].content.template;

  return (
    <StyledGrid
      activeTemplate={activeTemplate}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
    >
      {pageData.widgets.map((widget: any, index: any) => (
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
