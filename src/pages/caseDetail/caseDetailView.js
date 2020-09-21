import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import StatsView from '../../components/Stats/StatsView';
import icon from '../../assets/icons/Icon-CaseDetail.svg';
import cn from '../../utils/classNameConcat';
import { singleCheckBox, fetchDataForDashboardDataTable } from '../dashboard/store/dashboardAction';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import SuccessOutlinedIcon from '../../utils/SuccessOutlined';
import GridView from '../../components/FileGridWithCart';
import FileColumns from './fileConfig';
import { FileOnRowsSelect, FileDisableRowSelection } from '../../utils/fileTable';
import SampleColumns from './sampleConfig';
import { SampleOnRowsSelect, SampleDisableRowSelection } from '../../utils/sampleFileTable';

const CaseDetail = ({ classes, data }) => {
  const initDashboardStatus = () => (dispatch) => Promise.resolve(
    dispatch(fetchDataForDashboardDataTable()),
  );

  const dispatch = useDispatch();

  const redirectTo = (study) => {
    dispatch(initDashboardStatus()).then(() => {
      dispatch(singleCheckBox([{
        groupName: 'Study',
        name: study,
        datafield: 'study_code',
        isChecked: true,
      }]));
    });
  };

  const stat = {
    numberOfStudies: 1,
    numberOfCases: 1,
    numberOfSamples: data.sampleCountOfCase,
    numberOfFiles: data.fileCountOfCase,
    numberOfBiospecimenAliquots: data.aliquotCountOfCase,
  };
  const caseDetail = data.case[0];

  const notProvided = '';

  const breadCrumbJson = [{
    name: 'ALL PROGRAMS',
    to: '/programs',
    isALink: true,
  }, {
    name: `${caseDetail.study.clinical_study_designation} Detail`,
    to: `/study/${caseDetail.study.clinical_study_designation}`,
    isALink: true,
  }, {
    name: `${caseDetail.study.clinical_study_designation} CASES`,
    to: '/cases',
    onClick: () => redirectTo(caseDetail.study.clinical_study_designation),
    isALink: true,
  }, {
    name: caseDetail.case_id,
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

  const files = [...data.filesOfCase].map((f) => {
    const customF = { ...f };
    const parentSample = data.samplesByCaseId
      .filter((s) => s.files.map((sf) => sf.uuid).includes(f.uuid));
    if (parentSample && parentSample.length > 0) {
      customF.sample_id = parentSample[0].sample_id;
    }
    return customF;
  });
  return (
    <>
      <Snackbar
        className={classes.snackBar}
        open={snackbarState.open}
        onClose={closeSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={(
          <div className={classes.snackBarMessage}>
            <span className={classes.snackBarMessageIcon}>
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className={classes.snackBarText}>

              {snackbarState.value}
              {'    '}
              File(s) successfully
              {' '}
              {snackbarState.action}
              {' '}
              to your files

            </span>
          </div>
)}
      />

      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              src={icon}
              alt="ICDC case detail header logo"
            />

          </div>

          {(caseDetail.patient_first_name === '' || caseDetail.patient_first_name === null)
             && !(caseDetail.enrollment && caseDetail.enrollment.initials !== '' && caseDetail.enrollment.initials !== null)
            ? (
              <div className={classes.headerTitle}>
                <div className={cn(classes.headerMainTitle, classes.marginTop23)}>
                  <span>
                    <span>
                      {' '}
                      Case :
                      {' '}
                      {' '}
                      {caseDetail.case_id}
                    </span>
                  </span>
                </div>

                <CustomBreadcrumb data={breadCrumbJson} />
              </div>
            )

            : (
              <div className={classes.headerTitle}>
                <div className={classes.headerMainTitle}>
                  <span>
                    <span>
                      {' '}
                      Case :
                      {' '}
                      {' '}
                      {caseDetail.case_id}
                    </span>
                  </span>
                </div>
                <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
                  {caseDetail.patient_first_name === '' || caseDetail.patient_first_name === null
                    ? '' : (
                      <span>
                        <span className={classes.headerSubTitleCate}>
                          CASE NAME
                          {' '}
                          {' '}
                          {' '}
                          -
                          {' '}
                        </span>
                        <span className={classes.headerSubTitleContent}>
                          {caseDetail.patient_first_name}
                        </span>
                      </span>
                    )}
                  {caseDetail.enrollment && caseDetail.enrollment.initials !== '' && caseDetail.enrollment.initials !== null
                    ? (
                      <span>
                        <span className={cn(
                          classes.headerSubTitleCate, classes.paddingLeft8, classes.paddingBottm17,
                        )}
                        >
                          INITIALS
                          {' '}
                        </span>
                        <span className={classes.headerSubTitleContent}>
                          {caseDetail.enrollment.initials}
                        </span>
                      </span>
                    ) : ''}

                </div>

                <CustomBreadcrumb data={breadCrumbJson} />
              </div>

            )}

        </div>

        <div id="case_detail_container" className={classes.detailContainer}>

          <Grid container spacing={4}>

            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.detailContainerLeft}>
              <Grid container spacing={32} direction="column">
                <Grid item xs={12} pt={100}>
                  <span className={classes.detailContainerHeader}>DEMOGRAPHICS</span>
                </Grid>

                <Grid container spacing={4} className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <span className={classes.title}>BREED</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                        {caseDetail.demographic ? caseDetail.demographic.breed : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <span className={classes.title}>Sex</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                        {caseDetail.demographic ? caseDetail.demographic.sex : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <span className={classes.title}>Neutered Status</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                        {caseDetail.demographic
                          ? caseDetail.demographic.neutered_indicator : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <span className={classes.title}>Weight</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                        {caseDetail.demographic
                          ? caseDetail.demographic.weight : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <span className={classes.title}>Age at Enrollment</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                        {caseDetail.demographic
                          ? caseDetail.demographic.patient_age_at_enrollment : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12} className={classes.detailContainerRight}>
              <Grid container spacing={32} direction="column">
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>DIAGNOSIS</span>
                </Grid>

                { caseDetail.diagnoses.map((diagnosis) => (
                  <Grid container spacing={4} className={classes.detailContainerItems}>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <span className={classes.title}>Disease</span>
                        </Grid>
                        <Grid item xs={6} className={classes.content}>
                          {diagnosis.disease_term
                            ? diagnosis.disease_term : notProvided}
                          {' '}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <span className={classes.title}>Stage of Disease</span>
                        </Grid>
                        <Grid item xs={6} className={classes.content}>
                          {diagnosis.stage_of_disease
                            ? diagnosis.stage_of_disease : notProvided}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <span className={classes.title}>Date of Diagnosis</span>
                        </Grid>
                        <Grid item xs={6} className={classes.content}>
                          {diagnosis.date_of_diagnosis
                            ? diagnosis.date_of_diagnosis : notProvided}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <span className={classes.title}>Primary Site</span>
                        </Grid>
                        <Grid item xs={6} className={classes.content}>
                          {diagnosis.primary_disease_site
                            ? diagnosis.primary_disease_site : notProvided}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <span className={classes.title}>Histology/Cytology</span>
                        </Grid>
                        <Grid item xs={6} className={classes.content}>
                          {diagnosis.histology_cytopathology
                            ? diagnosis.histology_cytopathology : notProvided}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <span className={classes.title}>Histological Grade</span>
                        </Grid>
                        <Grid item xs={6} className={classes.content}>
                          {diagnosis.histological_grade === '' || diagnosis.histological_grade === null
                            ? '' : diagnosis.histological_grade}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <span className={classes.title}>RESPONSE TO TREATMENT</span>
                        </Grid>
                        <Grid item xs={6} className={classes.content}>
                          {diagnosis.best_response === '' || diagnosis.best_response === null
                            ? '' : diagnosis.best_response}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}

              </Grid>
            </Grid>

            <Grid item lg={5} md={5} sm={12} xs={12} className={classes.detailContainerRight}>
              <Grid container spacing={32} direction="column">
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>STUDY</span>
                </Grid>

                <Grid container spacing={4} className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <span className={classes.title}>Assigned to Study</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {caseDetail.study
                          ? caseDetail.study.clinical_study_designation : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <span className={classes.title}>Assigned to Arm</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {caseDetail.cohort
                          ? (caseDetail.cohort.study_arm
                            ? caseDetail.cohort.study_arm.arm : notProvided) : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <span className={classes.title}>Assigned to Cohort</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {' '}
                        {caseDetail.cohort
                          ? caseDetail.cohort.cohort_description : notProvided}
                        {' '}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <span className={classes.title}>Patient Subgroup</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {caseDetail.enrollment
                          ? caseDetail.enrollment.patient_subgroup : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <span className={classes.title}>Date of Informed Consent</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {caseDetail.enrollment
                          ? caseDetail.enrollment.date_of_informed_consent : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <span className={classes.title}>Date of registration</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {caseDetail.enrollment
                          ? caseDetail.enrollment.date_of_registration : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>

                      <Grid item xs={6}>
                        <span className={classes.title}>Study Site</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {caseDetail.enrollment
                            && caseDetail.enrollment.site_short_name
                              && caseDetail.enrollment.site_short_name !== null
                          ? caseDetail.enrollment.site_short_name : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div id="table_case_detail" className={classes.tableContainer}>
        <div className={classes.tableDiv}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>ASSOCIATED SAMPLES</span>
          </div>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <GridView
                  data={data.samplesByCaseId}
                  Columns={SampleColumns}
                  customOnRowsSelect={SampleOnRowsSelect}
                  openSnack={openSnack}
                  closeSnack={closeSnack}
                  disableRowSelection={SampleDisableRowSelection}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.tableDiv}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>ASSOCIATED FILES</span>
          </div>
          <Grid item xs={12}>
            <GridView
              data={files}
              Columns={FileColumns}
              customOnRowsSelect={FileOnRowsSelect}
              openSnack={openSnack}
              closeSnack={closeSnack}
              disableRowSelection={FileDisableRowSelection}
              bottonText="Add Selected Files to My Files"
            />
          </Grid>
        </div>
      </div>

    </>
  );
};

const styles = (theme) => ({
  paddingLeft8: {
    paddingLeft: '12px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '120px',
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  content: {
    fontSize: '12px',
  },
  marginTop23: {
    marginTop: '24px',
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
    paddingLeft: '32px',
    paddingRight: '32px',
    borderBottom: '#81a6b9 4px solid',
    height: '80px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },

  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#ff8a00',
    fontSize: '19px',
    lineHeight: '18px',
    paddingLeft: '5px',
  },
  headerMSubTitle: {
    paddingTop: '8px',
  },
  headerSubTitleCate: {
    color: '#606061',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    maxHeight: '30px',
    overflow: 'hidden',
    paddingLeft: '3px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    paddingLeft: '3px',
  },

  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-14px',
    width: '100px',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    paddingTop: '12px',
    paddingLeft: '60px',
    paddingRight: '32px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff8a00',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '8px',
    padding: ' 35px 2px 63px 2px !important',
  },
  detailContainerLeft: {
    padding: '35px 0px 0 2px !important',
    minHeight: '290px',
  },
  detailContainerRight: {
    padding: '35px 20px 0px 20px !important',
    minHeight: '290px',
    borderLeft: '#81a6b9 1px solid',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '32px',
    color: '#ff8a00',
  },
  tableDiv: {
    padding: '31px 0px',
    maxWidth: theme.custom.maxContentWidth,
    margin: '10px auto',
  },

  button: {
    borderRadius: '10px',
    width: '178px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems: {
    paddingTop: '5px',
    paddingLeft: '17px',
  },
  title: {
    color: '#9d9d9c',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    lineHeight: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff17f15',
    paddingBottom: '20px',
  },
  headerButton: {
    fontFamily: theme.custom.fontFamilySans,
    float: 'right',
    marginTop: '15px',
    width: '125px',
    height: '33px',
    marginRight: '20px',
  },
  headerButtonLink: {
    fontFamily: theme.custom.fontFamilySans,
    color: 'rgb(255, 255, 255)',
    backgroundColor: '#DC762F',
    opacity: 'unset',
    border: 'unset',
    fontWeight: '600',
    cursor: 'pointer',
    height: '27px',
    fontSize: '10pt',
    lineHeight: '18px',
    borderRadius: '10px',
    width: '178px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
