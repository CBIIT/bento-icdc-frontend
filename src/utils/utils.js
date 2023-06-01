import { onClearAllAndSelectFacetValue } from '../components/sideBarFilter/BentoFilterUtils';
import {
  singleCheckBox, setSideBarToLoading, setDashboardTableLoading,
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

export function navigatedToDashboard(studyCode) {
  onClearAllAndSelectFacetValue('study', studyCode);
}

export const convertCRDCLinksToValue = (data, key) => {
  if (!key) {
    const objString = Object.entries(data)[0][0];
    const dataArr = Object.entries(data)[0][1];
    const processedArr = dataArr
      .map((element) => ({
        ...element, CRDCLinks: element.CRDCLinks.length, links: element.CRDCLinks,
      }));
    const tempArr = [
      [objString, processedArr],
    ];
    return Object.fromEntries(tempArr);
  }

  const processedArr = data[key]
    .map((element) => ({
      ...element, CRDCLinks: element.CRDCLinks.length, links: element.CRDCLinks,
    }));

  return { ...data, [key]: processedArr };
};
