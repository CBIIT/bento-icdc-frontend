/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import ReduxGraphCalculator from '../GraphCalculator';
import ReduxLegend from '../Legend';
import ReduxCanvas from '../Canvas';
import ReduxGraphDrawer from '../GraphDrawer';
// import ReduxNodeTooltip from '../NodeTooltip';
import ReduxNodePopup from '../NodePopup';
import ReduxOverlayPropertyTable from '../OverlayPropertyTable';
import ReduxActionLayer from '../ActionLayer';

// const currentDict = useSelector((state) => (
//   state.submission
//         && state.submission.filteredDictionary
//     ? state.submission.filteredDictionary : {}));
const DataDictionaryGraph = (props) => (
  <>
    <>
      <ReduxGraphCalculator />
      <ReduxLegend />
      <ReduxCanvas>
        <ReduxGraphDrawer />
      </ReduxCanvas>
      {/* <ReduxNodeTooltip /> */}
      <ReduxNodePopup />
      <ReduxOverlayPropertyTable />
      <ReduxActionLayer onClearSearchResult={props.onClearSearchResult} />
    </>

  </>
);
DataDictionaryGraph.propTypes = {
  onClearSearchResult: PropTypes.func,
};

DataDictionaryGraph.defaultProps = {
  onClearSearchResult: () => {},
};

export default DataDictionaryGraph;
