import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  cn,
} from 'bento-components';
import Snackbar from '../../components/Snackbar';
import StatsView from '../../components/Stats/StatsView';
import { fetchDataForDashboardTabDataTable } from '../dashboardTab/store/dashboardReducer';
import {
  studyDisposition,
} from './utils';
import filterCasePageOnStudyCode from '../../utils/utils';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  headerIcon,
  embargoHeaderIcon,
  embargoFileIcon,
  tab,
} from '../../bento/studyDetailsData';
import Tab from './components/Tab';
import Overview from './views/Overview';
import Publication from './views/Publication';
import TabPanel from './components/TabPanel';
import pendingHeaderIcon from '../../assets/icons/PendingRelease-icons.StudiesDetail-Main.svg';
import pendingFileIcon from '../../assets/icons/PendingRelease-icons.StudiesDetail-Box.svg';

const StudyDetailView = ({ classes, data }) => {
  const studyData = data.study[0];
  const diagnoses = [...new Set(studyData.cases.reduce((output, caseData) => output.concat(caseData.diagnoses ? caseData.diagnoses.map((diagnosis) => (diagnosis.disease_term ? diagnosis.disease_term : '')) : []), []))];
  const studyFileTypes = [...new Set(data.studyFiles.map((f) => (f.file_type)))];
  const caseFileTypes = [...new Set(data.filesOfStudy.map((f) => (f.file_type))
    .filter((f) => !studyFileTypes.includes(f)))];
  const stat = {
    numberOfStudies: 1,
    numberOfCases: data.caseCountOfStudy,
    numberOfSamples: data.sampleCountOfStudy,
    numberOfFiles: data.fileCountOfStudy,
    numberOfAliquots: data.aliquotCountOfStudy ? data.aliquotCountOfStudy : 0,
  };

  React.useEffect(() => {
    fetchDataForDashboardTabDataTable();
  }, []);

  const breadCrumbJson = [{
    name: 'ALL PROGRAMS',
    to: '/programs',
    isALink: true,
  }, {
    name: studyData.program.program_acronym,
    to: '',
    isALink: false,
  }];

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });

  function openSnack(value) {
    setsnackbarState({ open: true, value, action: 'added' });
  }

  function closeSnack() {
    setsnackbarState({ open: false });
  }

  const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const renderEmbargoHeaderIcon = () => (
    <img
      src={embargoHeaderIcon}
      alt="ICDC case detail header logo"
    />
  );

  const renderPendingHeaderIcon = () => (
    <img
      src={pendingHeaderIcon}
      alt="ICDC case detail header logo"
    />
  );

  const renderDefaultHeaderIcon = () => (
    <img
      src={headerIcon}
      alt="ICDC case detail header logo"
    />
  );

  const renderEmbargoLabel = () => (
    <div className={classes.embargo}>
      <h4 className={classes.embarLabel}> UNDER EMBARGO </h4>
      <img src={embargoFileIcon} className={classes.embargoFileIcon} alt="icdc embargo file icon" />
    </div>
  );

  const renderPendingLabel = () => (
    <div className={classes.pending}>
      <h4 className={classes.pendLabel}>RELEASE PENDING</h4>
      <img src={pendingFileIcon} className={classes.embargoFileIcon} alt="icdc embargo file icon" />
    </div>
  );

  const renderSwitch = (param, embargoFunction, pendingFunction) => {
    switch (param) {
      case 'embargo':
        return embargoFunction;
      case 'pending':
        return pendingFunction;
      default:
        return undefined;
    }
  };

  const getHeaderIcon = renderSwitch(
    studyDisposition(studyData.study_disposition), renderEmbargoHeaderIcon, renderPendingHeaderIcon,
  ) ? (
      renderSwitch(
        studyDisposition(
          studyData.study_disposition,
        ), renderEmbargoHeaderIcon, renderPendingHeaderIcon,
      )
    ) : (
      renderDefaultHeaderIcon
    );

  const getLabel = renderSwitch(
    studyDisposition(
      studyData.study_disposition,
    ), renderEmbargoLabel, renderPendingLabel,
  );

  return (
    <>
      <Snackbar
        snackbarState={snackbarState}
        closeSnack={closeSnack}
        autoHideDuration={3000}
        classes={classes}
      />

      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            {
              getHeaderIcon()
            }
          </div>
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle}>
              <span>
                {' '}
                <span>
                  Study :
                  {' '}
                  {' '}
                  {studyData.clinical_study_designation}
                </span>
              </span>
              {
              (studyData.accession_id !== null && studyData.accession_id !== undefined && studyData.accession_id !== '')
              && (
                <>
                  <span className={classes.headerBar}> | </span>
                  <span className={classes.headerAccessionItem}>
                    <span className={classes.accessionLabel}>{'Accession ID : '}</span>
                    <span className={classes.accessionValue}>{studyData.accession_id}</span>
                  </span>
                </>
              )
              }
            </div>
            <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
              <span>
                {' '}
                {studyData.clinical_study_name}
              </span>

            </div>
            <CustomBreadcrumb data={breadCrumbJson} />
          </div>
          {
            renderSwitch(
              studyDisposition(
                studyData.study_disposition,
              ), renderEmbargoLabel, renderPendingLabel,
            )
              ? (
                getLabel()
              )
              : (
                <div className={classes.headerButton}>
                  <span className={classes.headerButtonLinkSpan}>
                    <Link
                      className={classes.headerButtonLink}
                      to={(location) => ({ ...location, pathname: '/cases' })}
                      onClick={() => filterCasePageOnStudyCode(studyData
                        .clinical_study_designation)}
                    >
                      {' '}
                      <span className={classes.headerButtonLinkText}> View </span>
                      <span className={classes.headerButtonLinkNumber}>
                        {' '}
                        {' '}
                        {data.caseCountOfStudy}
                        {' '}
                        {' '}
                      </span>
                      <span className={classes.headerButtonLinkText}>CASES</span>
                    </Link>
                  </span>
                </div>
              )
            }
        </div>

        <div className={classes.detailContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Tab
                styleClasses={classes}
                tabItems={tab.items}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <TabPanel value={currentTab} index={0}>
        <Overview
          studyData={studyData}
          diagnoses={diagnoses}
          caseFileTypes={caseFileTypes}
          closeSnack={closeSnack}
          openSnack={openSnack}
          data={data}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Publication
          publications={studyData.publications}
          display={tab.publication}
        />
      </TabPanel>
    </>
  );
};

const styles = (theme) => ({
  hrLine: {
    width: '50px',
    float: 'left',
    marginTop: '30px',
    border: '#81a6b9 2px solid',
    background: '#81a6b9',
  },
  headerItems: {
    width: '250px',
    float: 'right',
  },
  headerItemAccessionId: {
    paddingTop: '10px',
    '& span': {
      margin: '40px 20px',
      color: '#5e8ca5',
    },
  },
  embargoIcon: {
    position: 'absolute',
    color: 'white',
    top: '-12px',
    backgroundColor: '#de7328',
  },
  embargo: {
    color: '#BB2040',
    float: 'right',
    background: '#fff6f6',
    width: '180px',
    height: '33px',
    marginTop: '25px',
    fontWight: 'bolder',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    textAlign: 'center',
    border: '3px solid #BB2040',
    '& h4': {
      display: 'inline ! important',
      fontWeight: '900',
    },
  },
  pending: {
    color: '#6D6E71',
    float: 'right',
    background: '#fff6f6',
    width: '180px',
    height: '33px',
    marginTop: '25px',
    fontWight: 'bolder',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    textAlign: 'center',
    fontFamily: 'Open Sans',
    border: '3px solid #F3A933',
    '& h4': {
      display: 'inline ! important',
      fontWeight: '900',
    },
  },
  embargoFileIcon: {
    width: '20px',
    float: 'right',
    marginLeft: '5px',
  },
  headerBar: {
    fontWeight: '10',
    color: '#5e8ca5',
    margin: '0px 15px 0 15px',
  },
  headerAccessionItem: {
    borderRadius: '100px',
    border: '2px solid',
    textAlign: 'center',
    padding: '0 16px',
    background: 'rgb(203 226 238 / 11%)',
    fontSize: '15px',
  },
  accessionLabel: {
    fontSize: '14px',
    fontWeight: '900',
    color: '#5e8ca5',
  },
  accessionValue: {
    fontSize: '13px',
    fontWeight: '800',
  },
  paddingLeft8: {
    paddingLeft: '8px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  tabPrimaryColor: {
    color: '#81a6b9',
    fontWeight: '700',
  },
  tabHighlightColor: {
    color: '#0B3556',
    fontWeight: '700',
  },
  tabHighlight: {
    color: '#0B3556',
    borderBottom: '5px solid rgb(53, 185, 235)',
  },
  container: {
    paddingTop: '80px',
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '33px',
    paddingRight: '33px',
  },
  content: {
    fontSize: '12px',
  },
  warning: {
    color: theme.palette.warning.main,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '21px',
    borderBottom: '#81a6b9 4px solid',
    height: '80px',
    margin: 'auto',
  },
  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    width: 'calc(100% - 465px)',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#0296c9',
    fontSize: '19px',
    height: '12px',
    lineHeight: '17px',
    paddingLeft: '3px',
  },
  headerSubTitleCate: {
    color: '#606061',
    fontWeight: '400',
    fontFamily: 'Sans-Serif',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    fontSize: '14px',
    maxHeight: '35px',
    overflow: 'hidden',
    paddingLeft: '3px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '200px',
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '14pt',

  },
  headerMSubTitle: {
    paddingTop: '15px',
  },
  headerButton: {
    fontFamily: theme.custom.fontFamilySans,
    marginTop: '15px',
    float: 'right',
    width: '125px',
    height: '33px',
    background: '#F6F4F4',
    paddingLeft: '10px',
    paddingRight: '10px',

  },
  headerButtonLinkSpan: {
    fontFamily: theme.custom.fontFamilySans,
    height: '50px',
    background: '#F5F3EE',
    width: '200px',
    fontSize: '14px',
  },
  headerButtonLinkText: {
    fontFamily: theme.custom.fontFamilySans,
    color: '#0B3556',
  },
  headerButtonLinkNumber: {
    fontFamily: theme.custom.fontFamilySans,
    borderBottom: 'solid',
    lineHeight: '30px',
    paddingBottom: '3px',
    margin: '0 4px',
    fontSize: '14px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-13px',
    width: '100px',
  },
  detailContainer: {
    margin: 'auto',
    paddingTop: '30px',
    paddingLeft: '36px',
    paddingRight: '36px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',

  },
  headerButtonLink: {
    textDecoration: 'none',
    lineHeight: '14px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#DC762F',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    borderRadius: '22px',
    padding: '0 22px',
    width: '150px',
    height: '35px',
    lineHeight: '14px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  title: {
    color: '#0296c9',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },

});

export default withStyles(styles, { withTheme: true })(StudyDetailView);
