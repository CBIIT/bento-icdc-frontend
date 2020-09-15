import _ from 'lodash';
import * as Actions from './dashboardAction';

import {
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
  filterData,
  getFilters,
  updateCheckBoxData,
  customCheckBox,
  formatFileSize,
} from '../../../utils/dashboardUtilFunctions';

export const initialState = {
  dashboard: {
    isFetched: false,
    isLoading: true,
    error: '',
    hasError: false,
    stats: {},
    checkboxForAll: {
      data: [],
    },
    caseOverview: {
      data: [],
    },
    checkbox: {
      data: [],
    },
    datatable: {
      filters: [],
      data: [],
    },
    widgets: {},
  },
};

function rawDataTransform(payload) {
  // transform data
  // get all samples and their files
  const dicSample = payload.data.sample.reduce((acc, obj) => {
    const map = _.cloneDeep(acc);
    if (obj.files.length > 0) {
      map[obj.sample_id] = obj.files;
    }
    return map;
  }, {});

  // eslint-disable-next-line no-param-reassign
  payload.data.caseOverview = payload.data.caseOverview.map((rowData) => {
    // deep copy obj
    const d = _.cloneDeep(rowData);
    // transform file size's format
    if (d.files) {
      d.files.map((f) => {
        const customFile = f;
        customFile.file_size = formatFileSize(customFile.file_size);
        return customFile;
      });
    }
    // add cases id into diagnosis_obj
    if (d.diagnosis_obj) {
      if (d.diagnosis_obj.best_response) {
        d.best_response = d.diagnosis_obj.best_response;
      } else {
        d.best_response = '';
      }
    }

    if (d.sample_list) {
      d.sample_list = d.sample_list.map((sample) => {
        const s = _.cloneDeep(sample);
        if (s.sample_id in dicSample) {
          s.files = dicSample[s.sample_id];
        }
        return s;
      });
    }
    return d;
  });

  payload.data.study.forEach((d) => {
    if (d.files.length > 0) {
      payload.data.caseOverview.push({
        program: d.program.program_acronym,
        study_type: d.clinical_study_type,
        study_code: d.clinical_study_designation,
        files: d.files.map((f) => {
          const tmpF = f;
          tmpF.parent = 'study';
          tmpF.file_size = formatFileSize(tmpF.file_size);
          return tmpF;
        }),
      });
    }
  });
  return payload;
}

// End of actions
export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.SINGLE_CHECKBOX: {
      const dataTableFilters = action.payload;
      const tableData = state.caseOverview.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? updateCheckBoxData(
          state.caseOverview.data,
          state.checkboxForAll.data,
          state.checkbox.data.filter((d) => action.payload[0].groupName === d.groupName)[0],
          dataTableFilters,
        )
        : state.checkboxForAll.data;
      return {
        ...state,
        stats: {
          numberOfStudies: getStatDataFromDashboardData(tableData, 'study', dataTableFilters),
          numberOfCases: getStatDataFromDashboardData(tableData, 'case', dataTableFilters),
          numberOfSamples: getStatDataFromDashboardData(tableData, 'sample', dataTableFilters),
          numberOfFiles: getStatDataFromDashboardData(tableData, 'file', dataTableFilters),
          numberOfAliquots: getStatDataFromDashboardData(tableData, 'aliquot', dataTableFilters),
        },
        checkbox: {
          data: updatedCheckboxData,
        },
        datatable: {
          ...state.datatable,
          data: tableData,
          filters: dataTableFilters,
        },
        widgets: {
          studiesByProgram: getSunburstDataFromDashboardData(tableData),
          caseCountByBreed: getDonutDataFromDashboardData(tableData, 'breed'),
          caseCountByDiagnosis: getDonutDataFromDashboardData(tableData, 'diagnosis'),
          caseCountByDiseaseSite: getDonutDataFromDashboardData(tableData, 'disease_site'),
          caseCountByGender: getDonutDataFromDashboardData(tableData, 'sex'),
          caseCountByStageOfDisease: getDonutDataFromDashboardData(tableData, 'stage_of_disease'),
        },
      };
    }
    // if checkbox status has been changed, dashboard data table need to be update as well.
    case Actions.TOGGLE_CHECKBOX: {
      const dataTableFilters = getFilters(state.datatable.filters, action.payload);
      const tableData = state.caseOverview.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? updateCheckBoxData(
          state.caseOverview.data,
          state.checkboxForAll.data,
          state.checkbox.data.filter((d) => action.payload[0].groupName === d.groupName)[0],
          dataTableFilters,
        )
        : state.checkboxForAll.data;
      return {
        ...state,
        stats: {
          numberOfStudies: getStatDataFromDashboardData(tableData, 'study', dataTableFilters),
          numberOfCases: getStatDataFromDashboardData(tableData, 'case', dataTableFilters),
          numberOfSamples: getStatDataFromDashboardData(tableData, 'sample', dataTableFilters),
          numberOfFiles: getStatDataFromDashboardData(tableData, 'file', dataTableFilters),
          numberOfAliquots: getStatDataFromDashboardData(tableData, 'aliquot', dataTableFilters),
        },
        checkbox: {
          data: updatedCheckboxData,
        },
        datatable: {
          ...state.datatable,
          data: tableData,
          filters: dataTableFilters,
        },
        widgets: {
          studiesByProgram: getSunburstDataFromDashboardData(tableData),
          caseCountByBreed: getDonutDataFromDashboardData(tableData, 'breed'),
          caseCountByDiagnosis: getDonutDataFromDashboardData(tableData, 'diagnosis'),
          caseCountByDiseaseSite: getDonutDataFromDashboardData(tableData, 'disease_site'),
          caseCountByGender: getDonutDataFromDashboardData(tableData, 'sex'),
          caseCountByStageOfDisease: getDonutDataFromDashboardData(tableData, 'stage_of_disease'),
        },
      };
    }
    case Actions.RECEIVE_DASHBOARD: {
      // get action data
      const updatedPayload = rawDataTransform(_.cloneDeep(action.payload));
      const checkboxData = customCheckBox(updatedPayload.data);

      return updatedPayload.data
        ? {
          ...state.dashboard,
          isFetched: true,
          isLoading: false,
          hasError: false,
          error: '',
          stats: {
            numberOfStudies: getStatDataFromDashboardData(updatedPayload.data.caseOverview, 'study', []),
            numberOfCases: getStatDataFromDashboardData(updatedPayload.data.caseOverview, 'case', []),
            numberOfSamples: getStatDataFromDashboardData(updatedPayload.data.caseOverview, 'sample', []),
            numberOfFiles: getStatDataFromDashboardData(updatedPayload.data.caseOverview, 'file', []),
            numberOfAliquots: getStatDataFromDashboardData(updatedPayload.data.caseOverview, 'aliquot', []),
          },
          caseOverview: {
            data: updatedPayload.data.caseOverview,
          },
          checkboxForAll: {
            data: checkboxData,
          },
          checkbox: {
            data: checkboxData,
          },
          datatable: {
            data: updatedPayload.data.caseOverview,
            filters: [],
          },
          widgets: {
            studiesByProgram: getSunburstDataFromDashboardData(updatedPayload.data.caseOverview),
            caseCountByBreed: getDonutDataFromDashboardData(updatedPayload.data.caseOverview, 'breed'),
            caseCountByDiagnosis: getDonutDataFromDashboardData(updatedPayload.data.caseOverview, 'diagnosis'),
            caseCountByDiseaseSite: getDonutDataFromDashboardData(updatedPayload.data.caseOverview, 'disease_site'),
            caseCountByGender: getDonutDataFromDashboardData(updatedPayload.data.caseOverview, 'sex'),
            caseCountByStageOfDisease: getDonutDataFromDashboardData(updatedPayload.data.caseOverview, 'stage_of_disease'),
          },

        } : { ...state };
    }
    case Actions.DASHBOARD_QUERY_ERR:
      // get action data
      return {
        ...state,
        hasError: true,
        error: action.error,
        isLoading: false,
        isFetched: false,
      };
    case Actions.READY_DASHBOARD:
      return {
        ...state,
        isLoading: false,
        isFetched: true,
      };
    case Actions.REQUEST_DASHBOARD:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
