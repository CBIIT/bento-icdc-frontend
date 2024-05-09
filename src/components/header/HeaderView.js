import React from 'react';
import { useLocation } from 'react-router';
import { withStyles } from '@material-ui/styles';
import {
  SearchBarGenerator,
} from '@bento-core/global-search';
import headerData from '../../bento/globalHeaderData';
import { Header } from '../../bento-core';
import { SEARCH_PUBLIC, searchKeys, searchFields } from '../../bento/search';
import client from '../../utils/graphqlClient';
import styles from './HeaderStyles';

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
            customStyle={customStyle}
          />
        ) : (
          <Header
            logo={headerData.globalHeaderLogo}
            alt={headerData.globalHeaderLogoAltText}
            homeLink={headerData.globalHeaderLogoLink}
            customStyle={customStyle}
            SearchComponent={!location.pathname.match('/search/:') ? SearchBar : undefined}
          />
        )
      }
    </>
  );
};

export default withStyles(styles)(ICDCHeader);
