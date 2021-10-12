import { connect } from 'react-redux';
import React from 'react';
import { setGraphView } from './action';
import DataDictionary from './DataDictionary';

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

const ReduxDataDictionary = (props) => (
  <DataDictionary {...props} />
);

const mapStateToProps = (state) => ({
  isGraphView: state.ddgraph.isGraphView,
});

const mapDispatchToProps = (dispatch) => ({
  onSetGraphView: (isGraphView) => dispatch(setGraphView(isGraphView)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDataDictionary);
