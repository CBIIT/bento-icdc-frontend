import {
  singleCheckBox, setSideBarToLoading, setDashboardTableLoading,
} from '../pages/dashboardTab/store/dashboardReducer';

/*
 * redirect to cases page and filter by study code
 */
function redirectToStudy(study) {
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

export default redirectToStudy;
