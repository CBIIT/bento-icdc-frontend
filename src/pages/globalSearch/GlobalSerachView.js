import React, { useState } from 'react';
import {
  Box,
  withStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {
  SearchBarGenerator,
  SearchResultsGenerator,
} from '@bento-core/global-search';
import styles from './GlobalSearchStyle';
import {
  cases,
  programs,
  studies,
  samples,
  files,
  allResult,
} from '../../bento/search';
import ProgramCard from './card/program/ProgramCardView';
import StudyCardView from './card/study/StudyCardView';
import CaseCardView from './card/case/CaseCardView';
import SampleCardView from './card/sample/SampleCardView';
import FileCardView from './card/files/FileCardView';

/**
 * Handle the tab selection change event, and redirect the user
 * to the login/request page if they are not authorized.
 *
 * @param {object} event change event
 * @param {*} newTab new tab value
 * @returns void
 */
const onTabChange = (event, newTab) => {
  console.log(event);
  console.log(newTab);
};

const GlobalSearchView = ({
  classes,
  searchparam = '',
}) => {
  const history = useHistory();
  const [searchText, setSearchText] = useState(searchparam);
  const [searchCounts, setSearchCounts] = useState([]);

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
    setSearchText(value);
  };

  /**
   * Perform the search bar auto complete search
   *
   * @param {object} _config search bar configuration
   * @param {string} value search text
   * @param {string} reason reason for the function call
   */
  const getSearchSuggestions = async (_config, value, reason) => {
    console.log(value);
    console.log(reason);
    console.log(_config);

    if (!value || typeof value !== 'string') {
      setSearchText('');
      setSearchCounts([]);
      if (reason === 'clear') {
        history.push('/search');
      }
      return [];
    }
    if (value.trim() === '') { return []; }

    // mock result sets
    // update suggested result set from query
    return [
      'CASE',
      'BENTO-CASE-9990',
      'BENTO-CASE-9982',
      'BENTO-CASE-9979',
      'BENTO-CASE-9971',
      'BENTO-CASE-9910',
      'BENTO-CASE-9908',
      'BENTO-CASE-9906',
      'BENTO-CASE-9904',
      'BENTO-CASE-9900',
      'BENTO-CASE-9857',
      'study_subject"',
      'study_subject"',
      'sample',
      'aliquot',
      'aliquot',
      'aliquot',
      'aliquot',
      'aliquot',
      'aliquot',
      'aliquo',
    ];
  };

  /**
  * Helper function to get the data for a given tab
  *
  * @param {string} field the datafield property to search
  * @param {number} pageSize the pagination page size
  * @param {number} currentPage the current page offset
  */
  const getTabData = async (field, pageSize, currentPage) => {
    console.log(field);
    console.log(pageSize);
    console.log(currentPage);
    if (field === 'all') {
      return allResult;
    }
    if (field === 'clinical_study_designation') {
      return studies;
    }
    if (field === 'case_id') {
      return cases;
    }
    if (field === 'sample_id') {
      return samples;
    }
    if (field === 'file_name') {
      return files;
    }
    return programs;
  };

  const { SearchBar } = SearchBarGenerator({
    classes,
    config: {
      placeholder: '',
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
      onTabChange,
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
        count: searchCounts.all || 2,
        value: '1',
      },
      {
        name: 'Program',
        field: 'program_name',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: 2,
        value: '2',
      },
      {
        name: 'Study',
        field: 'clinical_study_designation',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: 3,
        value: '3',
      },
      {
        name: 'Cases',
        field: 'case_id',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: 4,
        value: '4',
      },
      {
        name: 'Sample',
        field: 'sample_id',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: 5,
        value: '5',
      },
      {
        name: 'File',
        field: 'file_name',
        classes: {
          root: classes.buttonRoot,
          wrapper: classes.tabColor,
        },
        count: 6,
        value: '6',
      },
    ],
    config: {
      resultCardMap: {
        program: ProgramCard,
        study: StudyCardView,
        case: CaseCardView,
        sample: SampleCardView,
        file: FileCardView,
      },
    },
  });

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
