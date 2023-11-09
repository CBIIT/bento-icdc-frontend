import React, { useEffect, useState } from 'react';
import {
  Box,
  withStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {
  SearchBarGenerator,
  SearchResultsGenerator,
  countValues,
} from '@bento-core/global-search';
import styles from './GlobalSearchStyle';
import {
  queryCountAPI,
  queryResultAPI,
  queryAutocompleteAPI,
  SEARCH_PAGE_KEYS,
  SEARCH_PAGE_DATAFIELDS,
} from '../../bento/search';
import ProgramCard from './card/program/ProgramCardView';
import StudyCardView from './card/study/StudyCardView';
import CaseCardView from './card/case/CaseCardView';
import SampleCardView from './card/sample/SampleCardView';
import FileCardView from './card/files/FileCardView';
import AboutCardView from './card/about/AboutCardView';
import ModelCardView from './card/model/ModelCardView';

/**
 * Determine the correct datafield and offset for the All tab based
 * off of the current offset and the number of results for each datafield
 *
 * @param {string} searchText
 * @param {number} calcOffset
 * @param {number} pageSize
 * @param {boolean} isPublic
 */
async function getAllQueryField(searchText, calcOffset, pageSize) {
  const searchResp = await queryCountAPI(searchText);
  const custodianConfigForTabData = [{ countField: 'case_count', nameField: 'cases' },
    { countField: 'sample_count', nameField: 'samples' },
    { countField: 'file_count', nameField: 'files' },
    { countField: 'program_count', nameField: 'programs' },
    { countField: 'study_count', nameField: 'studies' },
    { countField: 'model_count', nameField: 'model' },
    { countField: 'about_count', nameField: 'about_page' }];

  let acc = 0;
  const mapCountAndName = custodianConfigForTabData.map((obj) => {
    acc += searchResp[obj.countField] || 0;
    return { ...obj, value: acc };
  });
  // Create filter for next Query
  const filter = mapCountAndName.filter((obj) => obj.value > calcOffset)[0];
  const filterForOffset = mapCountAndName.filter((obj) => obj.value <= calcOffset);
  const val = filterForOffset.length === 0
    ? 0
    : filterForOffset[filterForOffset.length - 1].value;

  if (filter !== undefined) {
    return {
      datafieldValue: filter.nameField,
      offsetValue: (Math.abs(calcOffset - val) / pageSize) * pageSize,
    };
  }

  return { datafieldValue: 'cases', offsetValue: 0 };
}

/**
 * Wrapper for the queryResultAPI function to get the All tab's data
 *
 * @param {string} search the search input value
 * @param {number} offset the offset value
 * @param {number} pageSize the pagination page size
 * @param {boolean} isPublic whether to use a public or private query
 */
async function queryAllAPI(search, offset, pageSize) {
  const {
    datafieldValue, offsetValue,
  } = await getAllQueryField(search, offset, pageSize);

  const input = {
    input: search,
    first: pageSize,
    offset: offsetValue,
  };

  return queryResultAPI(datafieldValue, input);
}

const GlobalSearchView = ({
  classes,
  searchparam = '',
}) => {
  const history = useHistory();
  const [searchText, setSearchText] = useState(searchparam);
  const [searchCounts, setSearchCounts] = useState([]);

  /**
   * Handle the tab selection change event, and redirect the user
   * to the login/request page if they are not authorized.
   *
   * @param {object} event change event
   * @param {*} newTab new tab value
   * @returns void
   */
  // const onTabChange = (event, newTab) => {
  // };

  // getAllQueryField
  /**
   * Handle the search box input change event
   *
   * @param {string} value
   * @returns void
   */
  const onSearchChange = (value) => {
    if (!value || typeof value !== 'string') { return; }
    if (value === searchText) { return; }
    if (value.trim() === '') { return; }

    queryCountAPI(value).then((d) => {
      setSearchText(value);
      setSearchCounts(d);
      history.push(`/search/${value}`);
    });
  };

  /**
   * Perform the search bar auto complete search
   *
   * @param {object} _config search bar configuration
   * @param {string} value search text
   * @param {string} reason reason for the function call
   */
  const getSearchSuggestions = async (_config, value, reason) => {
    if (!value || typeof value !== 'string') {
      setSearchText('');
      setSearchCounts([]);
      if (reason === 'clear') {
        history.push('/search');
      }
      return [];
    }
    if (value.trim() === '') { return []; }
    const res = await queryAutocompleteAPI(value);
    const mapOption = (SEARCH_PAGE_KEYS.private).map(
      (key, index) => res[key].map(
        (id) => (id[SEARCH_PAGE_DATAFIELDS.private[index]]),
      ),
    );
    const option = mapOption.length > 0
      ? mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]) : [];

    return [...[value.toUpperCase()], ...option];
  };

  /**
  * Helper function to get the data for a given tab
  *
  * @param {string} field the datafield property to search
  * @param {number} pageSize the pagination page size
  * @param {number} currentPage the current page offset
  */
  const getTabData = async (field, pageSize, currentPage) => {
    if (field === 'all') {
      const count = countValues(searchCounts);
      let data = await queryAllAPI(searchText, (currentPage - 1) * pageSize, pageSize);
      // If the current set of data is less than the page size,
      // we need to query the next datafield for it's data
      if (data && (data.length !== pageSize)) {
        let apiQueries = 0;
        let calcOffset2 = (currentPage - 1) * pageSize + data.length;

        // eslint-disable-next-line max-len
        while (apiQueries < 5 && data.length !== count && calcOffset2 < count && data.length !== pageSize) {
          // eslint-disable-next-line no-await-in-loop
          const data2 = await queryAllAPI(searchText, calcOffset2, pageSize);
          data = [...data, ...data2];
          calcOffset2 = (currentPage - 1) * pageSize + data.length;
          apiQueries += 1;
        }
      }
      return (data || []).slice(0, pageSize);
    }
    // Handle all of the other tabs
    const input = {
      input: searchText,
      first: pageSize,
      offset: (currentPage - 1) * pageSize,
    };
    const data = await queryResultAPI(field, input);
    return (data || []).slice(0, pageSize);
  };
  const { SearchBar } = SearchBarGenerator({
    classes,
    config: {
      placeholder: 'SEARCH THE ICDC',
      iconType: 'image',
      maxSuggestions: 0,
      minimumInputLength: 0,
    },
    functions: {
      onChange: onSearchChange,
      getSuggestions: getSearchSuggestions,
    },
  });

  const { SearchResults } = SearchResultsGenerator({
    classes,
    functions: {
      getTabData,
    },
    tabs: [
      {
        name: 'All',
        field: 'all',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: countValues(searchCounts) || 0,
        value: '1',
      },
      {
        name: 'Program',
        field: 'programs',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: searchCounts.program_count || 0,
        value: '2',
      },
      {
        name: 'Study',
        field: 'studies',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: searchCounts.study_count || 0,
        value: '3',
      },
      {
        name: 'Cases',
        field: 'cases',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: searchCounts.case_count || 0,
        value: '4',
      },
      {
        name: 'Sample',
        field: 'samples',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: searchCounts.sample_count || 0,
        value: '5',
      },
      {
        name: 'File',
        field: 'files',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: searchCounts.file_count || 0,
        value: '6',
      },
      {
        name: 'Data Model',
        field: 'model',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: searchCounts.model_count || 0,
        value: '7',
      },
      {
        name: 'About',
        field: 'about_page',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: searchCounts.about_count || 0,
        value: '8',
      },
    ],
    config: {
      resultCardMap: {
        program: ProgramCard,
        study: StudyCardView,
        case: CaseCardView,
        sample: SampleCardView,
        file: FileCardView,
        about: AboutCardView,
        model: ModelCardView,
      },
    },
  });

  useEffect(() => {
    if (searchparam.trim() === '') {
      return;
    }

    queryCountAPI(searchparam).then((d) => {
      setSearchCounts(d);
    });
  }, []);

  return (
    <>
      <div className={classes.heroArea}>
        <div>
          <SearchBar value={searchText} clearable={!false} style={{ width: 750 }} />
        </div>
      </div>
      <div className={classes.bodyContainer}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <SearchResults searchText={searchText} />
        </Box>
      </div>
    </>
  );
};

export default withStyles(styles)(GlobalSearchView);
