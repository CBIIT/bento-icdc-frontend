import { connect } from 'react-redux';
import React from 'react';
import { setGraphView } from './action';
import DataDictionaryController from './DataDictionaryController';
// eslint-disable-next-line no-unused-vars
import { versionInfo } from '../reducers';

// const ReduxDataDictionary = (() => {
//   const mapStateToProps = state => ({
//     isGraphView: state.ddgraph.isGraphView,
//   });

//   const mapDispatchToProps = dispatch => ({
//     onSetGraphView: isGraphView => dispatch(setGraphView(isGraphView)),
//   });

//   return connect(mapStateToProps, mapDispatchToProps)(DataDictionary);
// })();

// export default ReduxDataDictionary;

const ReduxDataDictionary = (props) => (<DataDictionaryController {...props} />);

const mapStateToProps = (state) => ({
  isGraphView: state.ddgraph.isGraphView,
  dictionary: state.submission.dictionary,
});

const mapDispatchToProps = (dispatch) => ({
  onSetGraphView: (isGraphView) => dispatch(setGraphView(isGraphView)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDataDictionary);
