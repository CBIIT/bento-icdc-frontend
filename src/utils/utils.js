import {
  singleCheckBox, setSideBarToLoading, setDashboardTableLoading, fetchDataForDashboardTab,
} from '../pages/dashboardTab/store/dashboardReducer';

/*
 * redirect to cases page and filter by study code
 */
function filterCasePageOnStudyCode(study) {
  setSideBarToLoading();
  setDashboardTableLoading();
  singleCheckBox([{
    datafield: 'study',
    groupName: 'Study',
    isChecked: true,
    name: study,
    section: 'Filter By Cases',
  }]);
}

export default filterCasePageOnStudyCode;

export function navigatedToDashboard(studyCode, tab) {
  fetchDataForDashboardTab(tab, null, null, null);
  filterCasePageOnStudyCode(studyCode);
}
