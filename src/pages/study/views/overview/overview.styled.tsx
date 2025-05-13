import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import humanRelevanceImage from '../../../../../public/images/human-rel-bg-img.svg';

export const Container = styled.div({
  fontFamily: 'Raleway, sans-serif',
  paddingLeft: '33px',
  paddingRight: '33px',
  paddingBottom: '25px',
});

export const DetailContainer = styled.div({
  margin: 'auto',
  paddingLeft: '36px',
  paddingRight: '36px',
  fontFamily: 'Open Sans',
  letterSpacing: '0.014em',
  color: '#000000',
  size: '12px',
  lineHeight: '23px',
});

export const BorderRightGrid = styled(Grid)({
  borderRight: '#81a6b9 1px solid',
});

export const DetailContainerLeftGrid = styled(Grid)({
  display: 'block',
  padding: '28px 20px 5px 10px',
  minHeight: '500px',
  overflowY: 'auto',
  overflowX: 'hidden',
  width: 'calc(100% + 8px) !important',
  margin: '0px -8px',
});

export const ContainerHeaderGrid = styled(Grid)({
  marginBottom: '24px',
  lineHeight: '9px',
});

export const DetailContainerHeaderText = styled.span({
  textTransform: 'uppercase',
  fontFamily: 'Open Sans',
  fontSize: '17px',
  letterSpacing: '0.017em',
  color: '#0296c9',
});

export const StudyDescriptionGrid = styled(Grid)({
  paddingTop: '0px !important',
});

export const ContentSpan = styled.span({
  fontSize: '12px',
});

export const HrLine = styled.hr({
  width: '50px',
  float: 'left',
  marginTop: '30px',
  border: '#81a6b9 2px solid',
  background: '#81a6b9',
});

export const HrLineRight = styled.hr({
  width: '50px',
  float: 'left',
  marginTop: '30px',
  border: '#81a6b9 2px solid',
  background: '#81a6b9',
  marginLeft: '4px',
});

export const DetailContainerItemsGrid = styled(Grid)({
  paddingTop: '7px',
});

export const DetailContainerItemGrid = styled(Grid)({
  paddingTop: '15px !important',
  paddingLeft: '2px',
});

export const TitleGrid = styled(Grid)({
  color: '#0296c9',
  fontFamily: 'Open Sans',
  fontSize: '12px',
  letterSpacing: '0.017em',
  fontWeight: '600',
  textTransform: 'uppercase',
});

export const TitleCDGrid = styled(Grid)({
  color: '#0296c9',
  fontFamily: 'Open Sans',
  fontSize: '12px',
  letterSpacing: '0.017em',
  fontWeight: '600',
  textTransform: 'uppercase',
  marginRight: '4px',
});

export const ContentGrid = styled(Grid)({
  fontSize: '12px',
});

export const ContentDiv = styled.div({
  fontSize: '12px',
});

export const DetailContainerRightGrid = styled(Grid)({
  padding: '32px 20px 5px 10px',
  maxHeight: '505px',
  width: '100%',
});

export const DetailContainerRightTopGrid = styled(Grid)({
  maxHeight: '250px',
  paddingRight: '0px',
  overflow: 'auto',
});

export const PaddingTopTwelveGrid = styled(Grid)({
  paddingTop: '4px',
});

export const MarginTopTenGrid = styled(Grid)({
  marginTop: '10px',
});

export const AdditionalDataLink = styled.button({
  fontStyle: 'normal',
  fontWeight: 400,
  color: '#000000',
  fontFamily: 'Open Sans',
  fontSize: '13px',
  background: 'none !important',
  border: 'none',
  padding: '0 !important',
  textDecoration: 'none',
  cursor: 'pointer',

  '& .number': {
    color: '#B85300',
    textDecoration: 'underline',
  },
});

export const HumanRelevanceCard = styled.div({
  maxWidth: '674px',
  width: '100%',
  minHeight: '349px',
  border: '3px solid #B85300',
  borderRadius: '15px',
  backgroundImage: `url(${humanRelevanceImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  marginBottom: '30px',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '& .text': {
    fontFamily: 'Open Sans',
    color: '#FFFFFF',
  },
  '& .header': {
    fontWeight: 700,
    fontSize: '19px',
    letterSpacing: '0.29px',
    textTransform: 'uppercase',
    lineHeight: '25px',
  },
  '& .content': {
    fontWeight: 400,
    fontSize: '18px',
    letterSpacing: '0.2px',
    lineHeight: '30px',
    margin: '20px 0',
  },
});
