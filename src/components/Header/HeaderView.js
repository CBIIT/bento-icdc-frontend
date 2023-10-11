import React from 'react';
import { useLocation } from 'react-router';
import {
  SearchBarGenerator,
} from '@bento-core/global-search';
import headerData from '../../bento/globalHeaderData';
import { Header } from '../../bento-core';
import { mockHeaderSuggestion } from '../../bento/search';

const customStyle = {
  nihLogoImg: {
    height: '54px',
    width: '463px',
    marginLeft: '8px',
    minHeight: '54px',
  },
  headerBar: {
    top: '20px',
    zIndex: '999',
  },
};

const ICDCHeader = () => {
  const location = useLocation();
  const queryAutocompleteAPI = (search) => {
    console.log(search);
    setTimeout(() => {
      console.log('print');
    }, 1000);
    return mockHeaderSuggestion;
  };

  const SearchBarConfig = {
    config: {
      query: async (search) => queryAutocompleteAPI(search),
      placeholder: 'SEARCH ICDC',
      searchKeys: ['programs', 'studies', 'cases', 'samples', 'files'],
      searchFields: ['program_id', 'study_id', 'case_id', 'sample_id', 'file_id'],
    },
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
            SearchComponent={!location.pathname.match('/search') ? SearchBar : undefined}
          />
        )
      }
    </>
  );
};
export default ICDCHeader;
