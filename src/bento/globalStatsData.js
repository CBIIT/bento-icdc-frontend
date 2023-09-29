import gql from 'graphql-tag';

export const statsStyling = {
  global: {
    horizontalStyle: false,
    statTitleFirst: false,
    height: '75px',
    background: '#CBE2EE',
    top: '326.578px',
  },
  statsGroup: {
    margin: '10px 0px',
    padding: '0.5% 6% 2% 6%',
    borderRight: '1px solid #0B3556',
  },
  statsIcon: {
    width: '40px',
    height: '45px',
    margin: '2px 0px 0px -45px',
  },
  statCount: {
    color: '#263960',
    fontFamily: 'sans-serif',
    fontSize: '16.8px',
    margin: '0px 0px -4px 8px',
    float: 'left',
    padding: '4px 60px',
  },
  statTitle: {
    color: '#0B3556',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    textTransform: 'none',
    margin: '0px 0px 0px 8px',
    float: 'left',
  },
};

export const globalStatsData = [
  // A maximum of 7 stats are allowed
  {
    statTitle: 'Data Volume',
    type: 'field',
    statAPI: 'volumeOfData',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Data_Vol_.svg',
    statIconAlt: 'Data Volume Stats Bar Icon',
  },
  {
    statTitle: 'Programs',
    type: 'field',
    statAPI: 'numberOfPrograms',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Programs_.svg',
    // statIconSrc: '../assets/glo-icons/Programs.svg',
    statIconAlt: 'Study Files Stats Bar Icon',
  },
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Studies_.svg',
    statIconAlt: 'Studies Stats Bar Icon',
  },
  {
    statTitle: 'Cases',
    type: 'field',
    statAPI: 'numberOfCases',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Cases_.svg',
    statIconAlt: 'Studies Stats Bar Icon',
  },
  {
    statTitle: 'Samples',
    type: 'field',
    statAPI: 'numberOfSamples',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Samples_.svg',
    statIconAlt: 'Samples Stats Bar Icon',
  },
  {
    statTitle: 'Case Files',
    type: 'field',
    statAPI: 'numberOfFiles',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/CaseFiles_.svg',
    statIconAlt: 'Files Stats Bar Icon',
  },
  {
    statTitle: 'Study Files',
    type: 'field',
    statAPI: 'numberOfStudyFiles',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/StudyFiles_.svg',
    // statIconSrc: 'http://localhost:3000/src/assets/glo-icons/StudyFiles.svg',
    statIconAlt: 'Study Files Stats Bar Icon',
  },
  // {
  //   statTitle: 'Aliquots',
  //   type: 'field',
  //   statAPI: 'numberOfAliquots',
  //   statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/add_program_icon/icdc/images/svgs/Icon-aliquots-stats.svg',
  //   statIconAlt: 'Aliquots Stats Bar Icon',
  // },
];

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_GLOBAL_STATS_DATA_QUERY = gql`{
  numberOfStudies
  numberOfCases
  numberOfSamples
  numberOfFiles
  numberOfStudyFiles
  numberOfPrograms
  numberOfAliquots
  volumeOfData
  }
  `;
