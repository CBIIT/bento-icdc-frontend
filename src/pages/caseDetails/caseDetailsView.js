import React from 'react';
import {
  CircularProgress,
  Grid2 as Grid,
} from '@mui/material';
import { withStyles } from "@mui/styles";
import { cn } from '@bento-core/util';
import {
  TableContextProvider,
} from '../../bento-core';
import SampleTableView from './SampleView/SampleTableView';
import FileTableView from './FileView/FileTableView';
import StatsView from '../../components/Stats/StatsView';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  headerIcon,
} from '../../bento/caseDetailsData';
import MultiStudyCases from './components/multiStudyCasesController';
import styles from './caseDetailsStyles';

const CaseDetail = ({
  classes, data,
}) => {
  const stat = {
    numberOfStudies: 1,
    numberOfCases: 1,
    numberOfAliquots: data.aliquotCountOfCase,
    numberOfSamples: data.sampleCountOfCase,
    numberOfFiles: data.fileCountOfCase + data.studyFileCountOfCase,
    numberOfStudyFiles: data.studyFileCountOfCase,
    numberOfPrograms: data.programsCountOfCase,
    volumeOfData: data.volumeOfDataOfCase,
  };

  const caseDetail = data.case[0];
  if (!caseDetail) {
    return <CircularProgress />;
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
    to: '/explore',
    isALink: true,
  }, {
    name: caseDetail.case_id,
  }];

  return (
    <>
      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              src={headerIcon}
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
          {
            data.multiStudyCases && data.multiStudyCases.caseIds
            && (data.multiStudyCases.caseIds.length > 1)
              && (
                <div className={classes.multiCaseStudy}>
                  <MultiStudyCases
                    cases={data.multiStudyCases.caseIds}
                    caseID={caseDetail.case_id}
                  />
                </div>
              )
          }
        </div>

        <div className={classes.detailContainer}>

          <Grid container spacing={4} className={classes.marginTopBottom3}>

            <Grid item lg={3} md={3} sm={12} xs={12} className={classes.detailContainerLeft}>
              <Grid container spacing={32} direction="column">
                <Grid item xs={12} pt={100}>
                  <span className={classes.detailContainerHeader}>DEMOGRAPHICS</span>
                </Grid>

                <Grid container className={classes.detailContainerItems}>
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
              <Grid container spacing={32} direction="column" className={classes.gridText}>
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>DIAGNOSIS</span>
                </Grid>

                {caseDetail.diagnoses.map((diagnosis) => (
                  <Grid container className={classes.detailContainerItems}>
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

                <Grid container className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <span className={classes.title}>Assigned to Study</span>
                      </Grid>
                      <Grid item xs={6} className={classes.content}>
                        {caseDetail?.study
                          ? caseDetail?.study.clinical_study_designation : notProvided}
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
                          ? (caseDetail?.cohort.study_arm
                            ? caseDetail?.cohort.study_arm.arm : notProvided) : notProvided}
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

      <div id="case_detail_table_associated_samples" className={classes.tableContainer}>
        <div className={classes.tableDiv}>
          <TableContextProvider>
            <SampleTableView data={data.samplesByCaseId} />
          </TableContextProvider>
        </div>
      </div>

      <div id="case_detail_table_associated_files" className={classes.tableContainer}>
        <div className={classes.tableDiv}>
          <TableContextProvider>
            <FileTableView data={files} />
          </TableContextProvider>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(CaseDetail);
