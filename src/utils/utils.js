import { onClearAllAndSelectFacetValue } from '../components/sideBarFilter/BentoFilterUtils';

/*
 * redirect to cases page and filter by study code
 */
export function navigatedToDashboard(studyCode) {
  onClearAllAndSelectFacetValue('study', studyCode);
}
const textToRepoMap = {
  TCIA: 'The Cancer Imaging Archive',
  IDC: 'The Imaging Data Commons',
};

function getRepoDescription(text, repos, map) {
  for (const repo of repos) {
    if (text.includes(repo)) {
      return map[repo];
    }
  }
  return null;
}

export const convertCRDCLinksToValue = (data, key, repositories) => {
  if (!key) {
    const objString = Object.entries(data)[0][0];
    const dataArr = Object.entries(data)[0][1];
    const processedArr = dataArr.map(element => ({
      ...element,
      CRDCLinks: element.CRDCLinks.length,
      links: element.CRDCLinks,
      CRDCLinksText:
        element.CRDCLinks.map(link => {
          const text = link.text;
          const description = getRepoDescription(
            text,
            repositories,
            textToRepoMap
          );

          return description;
        }).join(', ') || 'Not Applicable',
    }));
    const tempArr = [[objString, processedArr]];
    return Object.fromEntries(tempArr);
  }

  const processedArr = data[key].map(element => ({
    ...element,
    CRDCLinks: element.CRDCLinks.length,
    links: element.CRDCLinks,
    CRDCLinksText:
      element.CRDCLinks.map(link => {
        const text = link.text;
        const description = getRepoDescription(
          text,
          repositories,
          textToRepoMap
        );

        return description;
      }).join(', ') || 'Not Applicable',
  }));

  return { ...data, [key]: processedArr };
};
