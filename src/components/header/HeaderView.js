/* Do not import mui v5 */
import React from 'react';
import { useLocation } from 'react-router';
import { withStyles } from '@mui/styles';
import { SearchBarGenerator } from '@bento-core/global-search';
import headerData from '../../bento/globalHeaderData';
import { Header } from '../../bento-core';
import { SEARCH_PUBLIC, searchKeys, searchFields } from '../../bento/search';
import serachIcon from '../../assets/header/global_search_input_find.svg';
import client from '../../utils/graphqlClient';
import HeaderThemeProvider from './HeaderTheme';

const customStyle = {
  nihLogoImg: {
    height: '54px',
    width: '463px',
    marginLeft: '29px',
    minHeight: '54px',
  },
  headerBar: {
    top: '0px',
    zIndex: '999',
    position: 'relative',
  },
};

const ICDCHeader = ({ classes }) => {
  const location = useLocation();
  const queryAutocompleteAPI = async inputValue => {
    const result = await client
      .query({
        query: SEARCH_PUBLIC,
        variables: {
          input: inputValue,
        },
      })
      .then(response => response.data.globalSearch);
    return result;
  };

  const SearchBarConfig = {
    config: {
      query: async search => queryAutocompleteAPI(search),
      placeholder: 'SEARCH THE ICDC',
      searchKeys,
      searchFields,
    },
    classes,
  };

  const { SearchBar } = SearchBarGenerator(SearchBarConfig);

  return (
    <>
      {location.pathname.includes('/jBrowse') ? (
        <Header
          logo={headerData.globalHeaderLogo}
          alt={headerData.globalHeaderLogoAltText}
          noLink
          customStyle={customStyle}
        />
      ) : (
        <HeaderThemeProvider>
          <Header
            logo={headerData.globalHeaderLogo}
            alt={headerData.globalHeaderLogoAltText}
            homeLink={headerData.globalHeaderLogoLink}
            customStyle={customStyle}
            SearchComponent={
              !location.pathname.match('/search') ? SearchBar : undefined
            }
          />
        </HeaderThemeProvider>
      )}
    </>
  );
};

const styles = () => ({
  root: {
    zIndex: 1501,
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
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  inputLabel: {
    width: '0%',
    opacity: '0',
  },
  inputAdornedEnd: {
    padding: '0 8px !important',
  },
  searchIconSpan: {
    color: '#25557E',
    stroke: '#4A8ECB',
    strokeWidth: '1.1px',
    marginRight: '8px',
    cursor: 'pointer',
    backgroundRepeat: 'no-repeat',
    marginTop: '5px',
    backgroundImage: `url(${serachIcon})`,
    '& path': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(ICDCHeader);
