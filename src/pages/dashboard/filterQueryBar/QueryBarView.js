import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Container, ThemeProvider, createTheme } from '@material-ui/core';
import {
  clearAllFilters,
  clearFacetSection,
  clearSliderSection,
  toggleCheckBox,
  resetAllData,
  resetUploadData,
  updateAutocompleteData,
  QueryBarGenerator,
} from '../../../bento-core';
import { facetsConfig } from '../../../bento/dashboardData';
import theme from './QueryBarTheme';

/**
 * Generate the Explore Tab Query Bar
 *
 * @param {object} props
 * @param {object} props.data API search resultset
 * @param {object} props.statusReducer Facet Filter State
 * @param {object} props.localFind Local Find State
 * @returns {JSX.Element}
 */
const QueryBarView = ({ data, statusReducer, localFind }) => {
  const dispatch = useDispatch();

  const sectionOrder = facetsConfig.map((v) => v.datafield);
  const mappedFilterState = Object.keys(statusReducer || {}).map((facet) => {
    const config = facetsConfig.find((configuration) => configuration.datafield === facet);

    return {
      ...config,
      items: statusReducer[facet],
      data: data[config.apiForFiltering],
    };
  });
  mappedFilterState.sort((a, b) => (
    sectionOrder.indexOf(a.datafield) - sectionOrder.indexOf(b.datafield)));

  const { QueryBar } = QueryBarGenerator({
    functions: {
      clearAll: () => {
        dispatch(resetAllData());
        dispatch(clearAllFilters());
      },
      clearUpload: () => {
        dispatch(resetUploadData());
      },
      clearAutocomplete: () => {
        dispatch(updateAutocompleteData([]));
      },
      deleteAutocompleteItem: (title) => {
        const { autocomplete } = localFind;
        const newdata = [...autocomplete];
        const index = newdata.findIndex((v) => v.title === title);

        if (index > -1) {
          newdata.splice(index, 1);
          dispatch(updateAutocompleteData(newdata));
        }
      },
      resetFacetSection: (section) => {
        dispatch(clearFacetSection(section));
      },
      resetFacetSlider: (section) => {
        dispatch(clearSliderSection(section));
      },
      resetFacetCheckbox: (section, checkbox) => {
        dispatch(toggleCheckBox({
          datafield: section.datafield,
          isChecked: false,
          name: checkbox,
        }));
      },
    },
  });

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Container
        maxWidth="xl"
        className="icdc_query_bar"
      >
        <QueryBar
          statusReducer={mappedFilterState}
          localFind={localFind}
        />
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  statusReducer: state.statusReducer.filterState,
  localFind: state.localFind,
});

export default connect(mapStateToProps, null)(QueryBarView);
