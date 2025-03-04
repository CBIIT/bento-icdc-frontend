import styled from '@emotion/styled';

const commonCardInnerContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  margin: '32px 0',
  '& .header-text': {
    color: '#BD5B00',
    fontSize: '17px',
    fontFamily: 'Open Sans',
    fontWeight: 400,
    textTransform: 'uppercase',
    margin: '0 0 16px 0',
  },
  '& .key-value-container': {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    borderBottom: '1px solid #B5D6E1',
    padding: '16px',
    alignItems: 'center',
    '& .key': {
      margin: '0 74px 0 8px',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '13px',
      color: '#01769D',
      textTransform: 'uppercase',
      marginRight: '180px',
    },
    '& .value': {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '18px',
      color: '#000',
    },
  },
};

export const Container = styled.div({
  paddingTop: '125px',
  fontFamily: 'Raleway, sans-serif',
  paddingLeft: '27px',
  paddingRight: '27px',
});

export const Header = styled.div({
  paddingLeft: '35px',
  paddingRight: '35px',
  borderBottom: '#81a6b9 4px solid',
  height: '90px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '& .logo': {
    position: 'absolute',
    float: 'left',
    marginTop: '5px',
    width: '96px',
    height: '82px',
    marginLeft: '1px',
  },

  '& .header-title': {
    margin: 'auto',
    marginLeft: '99px',

    '& .main-title': {
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
      letterSpacing: '0.017em',
      color: '#ff8a00',
      fontSize: '21px',
      lineHeight: '18px',
      paddingLeft: '5px',
      marginTop: '24px',
    },

    '& .sub-title': {
      paddingTop: '8px',
      color: '#606061',
      fontWeight: 'bold',
      fontFamily: 'Raleway',
      textTransform: 'uppercase',
      letterSpacing: '0.023em',
      fontSize: '12px',
      maxHeight: '30px',
      overflow: 'hidden',
      paddingLeft: '3px',

      '& .case-key': {
        color: '#606061',
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        textTransform: 'uppercase',
        letterSpacing: '0.023em',
        fontSize: '12px',
        maxHeight: '30px',
        overflow: 'hidden',
        paddingLeft: '3px',
      },

      '& .case-value': {
        color: '#000000',
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        textTransform: 'uppercase',
        letterSpacing: '0.023em',
        fontSize: '12px',
        paddingLeft: '3px',
      },

      '& .initial-key': {
        color: '#606061',
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        textTransform: 'uppercase',
        letterSpacing: '0.023em',
        fontSize: '12px',
        maxHeight: '30px',
        overflow: 'hidden',
        paddingLeft: '12px',
        paddingBottom: '17px', // corrected typo
      },
      '& .initial-value': {
        color: '#000000',
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        textTransform: 'uppercase',
        letterSpacing: '0.023em',
        fontSize: '12px',
        paddingLeft: '3px',
      },
    },
  },
});

export const CaseDetailCardsContainer = styled.div({
  paddingLeft: '50px',
  paddingRight: '32px',
  fontFamily: 'Open Sans',
  letterSpacing: '0.014em',
  color: '#000000',
  size: '12px',
  lineHeight: '23px',
  display: 'flex',
  width: '100%',

  '& .card-with-right-border': {
    borderRight: '1px solid #81A6B9',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    '& .card-inner-container': {
      ...commonCardInnerContainer,
    },
  },

  '& .card': {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    '& .card-inner-container': {
      ...commonCardInnerContainer,
    },
  },
});

export const TableContainer = styled.div({
  background: '#f3f3f3',

  '& .table-wrapper': {
    padding: '31px 27px',
    margin: '0 auto',
  },
});
