import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { withStyles } from '@material-ui/styles';
import {
  SearchBarGenerator,
} from '@bento-core/global-search';
import headerData from '../../bento/globalHeaderData';
import { Header } from '../../bento-core';
import { SEARCH_PUBLIC, searchKeys, searchFields } from '../../bento/search';
import serachIcon from '../../assets/header/global_search_input_find.svg';
import vectorIcon from '../../assets/header/Vector.svg';
import client from '../../utils/graphqlClient';

const customStyle = {
  nihLogoImg: {
    height: '54px',
    width: '463px',
    marginLeft: '8px',
    minHeight: '54px',
  },
  headerBar: {
    top: '120px',
    zIndex: '999',
  },
};

const ICDCHeader = ({
  classes,
}) => {
  const location = useLocation();
  const queryAutocompleteAPI = async (inputValue) => {
    const result = await client.query({
      query: SEARCH_PUBLIC,
      variables: {
        input: inputValue,
      },
    })
      .then((response) => response.data.globalSearch);
    return result;
  };

  const govAlertEl = document.getElementById('govAlertMsg');
  console.log(govAlertEl);
  const initialTopValue = govAlertEl?.scrollHeight; // Set your initial top value here
  const [topValue, setTopValue] = useState(initialTopValue);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the new top value based on scroll position
      const scrolledDownAmt = window.scrollY;
      const newTopValue = Math.max(0, initialTopValue - scrolledDownAmt);

      setTopValue(newTopValue);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialTopValue]);

  const scrollingStyle = {
    ...customStyle.headerBar,
    top: `${topValue}px`,
  };

  const SearchBarConfig = {
    config: {
      query: async (search) => queryAutocompleteAPI(search),
      placeholder: 'SEARCH THE ICDC',
      searchKeys,
      searchFields,
    },
    classes,
  };

  const { SearchBar } = SearchBarGenerator(SearchBarConfig);

  return (
    <>
      {
        location.pathname.includes('/jBrowse') ? (
          <Header
            logo={headerData.globalHeaderLogo}
            alt={headerData.globalHeaderLogoAltText}
            noLink
            customStyle={{ ...customStyle, top: `${topValue}px`, headerBar: scrollingStyle }}
          />
        ) : (
          <Header
            logo={headerData.globalHeaderLogo}
            alt={headerData.globalHeaderLogoAltText}
            homeLink={headerData.globalHeaderLogoLink}
            customStyle={{ ...customStyle, headerBar: scrollingStyle }}
            SearchComponent={!location.pathname.match('/search') ? SearchBar : undefined}
          />
        )
      }
    </>
  );
};

const styles = () => ({
  root: {
    zIndex: 1501,
    '& .MuiPaper-root': {
      borderRadius: '8px',
    },
    '& .MuiAutocomplete-listbox': {
      borderRadius: '8px',
      fontFamily: 'Open Sans',
      fontSize: '13.5px',
      color: '#0B3556',
      fontWeight: 400,
      border: '1px solid #4A8ECB',
      padding: '0px',
      fontStyle: 'normal',
      lineHeight: '26px',
      texttransform: 'uppercase',
      '& li': {
        // list item specific styling
        padding: '3px, 14px, 4px, 14px',
        borderBottom: '1px solid #4A8ECB',
        '&:nth-last-child(1)': {
          borderBottom: 'none',
          fontSize: '16px',
          color: 'black',
          backgroundColor: '#E9E9E9',
          '& :hover': {
            color: 'black',
            backgroundColor: '#E9E9E9',
            pointerEvents: 'none',
          },
          '& span': {
            backgroundImage: `url(${vectorIcon})`,
            width: '165px',
            marginTop: '5px',
            float: 'right',
            height: '15px',
            display: 'block',
            backgroundRepeat: 'no-repeat',
            '& img': {
              display: 'none',
            },
          },
        },
      },
      '& :hover': {
        color: '#FFF',
        backgroundColor: '#1C75BC',
      },
    },
  },
  backdrop: {
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  autocomplete: {
    margin: '0 auto',
    paddingTop: '32px',
    width: '260px',
    height: '37px',
  },
  enterIcon: {
    height: '12px',
    margin: '0px 18px 0px 6px',
  },
  inputRoot: {
    borderRadius: '8px',
    color: '#25557E',
    fontFamily: 'Lato',
    fontSize: '16px',
    padding: '9.5px 4px 9.5px 6px !important',
  },
  inputAdornedEnd: {
    padding: '0 8px !important',
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #4A8ECB',
      },
      '&:hover fieldset': {
        border: '1px solid #4A8ECB',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #4A8ECB',
      },
    },
  },
  searchIconSpan: {
    color: '#4A8ECB',
    stroke: '#4A8ECB',
    strokeWidth: '1.1px',
    marginRight: '8px',
    cursor: 'pointer',
    backgroundImage: `url(${serachIcon})`,
    '& path': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(ICDCHeader);
