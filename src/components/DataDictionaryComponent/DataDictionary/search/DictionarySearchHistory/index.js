import { connect } from 'react-redux';
import { clearSearchHistoryItems } from '../../action';
import DictionarySearchHistory from './DictionarySearchHistory';

const ReduxDictionarySearchHistory = (() => {
  const mapStateToProps = (state) => {
    // eslint-disable-next-line no-console
    console.log('DictionarySearchHistory/index.js', state);
    return ({
      searchHistoryItems: state.ddgraph.searchHistoryItems,
    });
  };

  const mapDispatchToProps = (dispatch) => ({
    onClearSearchHistoryItems: () => dispatch(clearSearchHistoryItems()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(DictionarySearchHistory);
})();

export default ReduxDictionarySearchHistory;
