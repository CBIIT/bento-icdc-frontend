/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import ReduxDataDictionaryTable from './table/DataDictionaryTable';
import ReduxDataModelStructure from './DataModelStructure';
import DataDictionaryGraph from './graph/DataDictionaryGraph';
import ReduxDictionarySearcher from './search/DictionarySearcher';
import ReduxDictionarySearchHistory from './search/DictionarySearchHistory';
import store from '../../../store/index';
import FacetFilters from './FacetFilters';
import { facetSearchData } from '../../../bento/dataDictionaryData';
import './DataDictionary.css';

const DataDictionary = (props) => {
  const dictionarySearcherRef = React.useRef();
  const setGraphView = (isGraphView) => {
    props.onSetGraphView(isGraphView);
  };

  React.useEffect(() => {
    setGraphView(true);
  }, []);

  const handleClickSearchHistoryItem = (keyword) => {
    dictionarySearcherRef.current.launchSearchFromOutside(keyword);
  };

  const handleClearSearchResult = () => {
    dictionarySearcherRef.current.launchClearSearchFromOutside();
  };

  // eslint-disable-next-line no-unused-vars
  const filterByNode = (node) => {
    store.dispatch({ type: 'FILTER_BY_NODE', payload: { data: node } });
    // eslint-disable-next-line no-console
    console.log('filtering!!!!');
  };

  const handleToggle = () => {};

  return (
    <div className="data-dictionary">
      <div className="data-dictionary__sidebar">
        <div className="data-dictionary__switch">
          <span
            className={`data-dictionary__switch-button ${!props.isGraphView ? '' : 'data-dictionary__switch-button--active'}`}
            onClick={() => { setGraphView(true); }}
            onKeyPress={() => { setGraphView(true); }}
            role="button"
            tabIndex={0}
          >
            Graph View
          </span>
          <span
            className={`data-dictionary__switch-button ${props.isGraphView ? '' : 'data-dictionary__switch-button--active'}`}
            onClick={() => { setGraphView(false); }}
            onKeyPress={() => { setGraphView(true); }}
            role="button"
            tabIndex={0}
          >
            Table View
          </span>
        </div>
        <ReduxDictionarySearcher ref={dictionarySearcherRef} />
        <ReduxDataModelStructure />
        <FacetFilters />
        <ReduxDictionarySearchHistory
          onClickSearchHistoryItem={handleClickSearchHistoryItem}
        />
        <div className="data-dictionary__search-history" />
      </div>
      <div
        className="data-dictionary__main"
      >
        { props.isGraphView
          ? (
            <div className={`data-dictionary__graph ${props.isGraphView ? '' : 'data-dictionary__graph--hidden'}`}>
              <DataDictionaryGraph
                onClearSearchResult={handleClearSearchResult}
              />
            </div>
          )
          : (
            <div className={`data-dictionary__table ${!props.isGraphView ? '' : 'data-dictionary__table--hidden'}`}>
              <ReduxDataDictionaryTable />
            </div>
          )}
      </div>
    </div>
  );
};

DataDictionary.propTypes = {
  onSetGraphView: PropTypes.func,
  isGraphView: PropTypes.bool,
};

DataDictionary.defaultProps = {
  onSetGraphView: () => {},
  isGraphView: false,
};

export default DataDictionary;
