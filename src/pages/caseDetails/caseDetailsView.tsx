import React, { useMemo } from 'react';
import { withStyles } from '@material-ui/core';
import { TableContextProvider } from '../../bento-core';
import SampleTableView from './SampleView/SampleTableView';
import FileTableView from './FileView/FileTableView';
import StatsView from '../../components/Stats/StatsView';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import { headerIcon } from '../../bento/caseDetailsData';
import MultiStudyCases from './components/multiStudyCasesController';
import {
  CaseDetailCardsContainer,
  Container,
  Header,
  TableContainer,
} from './caseDetailsStyles';
import { defaultTo } from 'lodash';
import { SkeletonLoader } from '../../components/Skeleton';
import { CaseQuery, FilesOfCase } from '../../generated-types/types';

const noValue = '';

export interface BreadcrumbData {
  name?: string | null;
  to?: string;
  isALink?: boolean;
}

type CaseDetailProps = {
  data: CaseQuery;
};

interface CustomF extends FilesOfCase {
  sample_id?: string;
}
const CaseDetail = ({ data }: CaseDetailProps) => {
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
    return <SkeletonLoader variant="withRounded" />;
  }

  const descriptionCard = useMemo(
    () => ({
      title: 'Description',
      fields: [
        {
          key: 'breed',
          value: defaultTo(caseDetail?.demographic?.breed, noValue),
        },
        {
          key: 'Additional Breed Detail',
          value: defaultTo(
            caseDetail?.demographic?.additional_breed_detail,
            noValue
          ),
        },
        { key: 'Sex', value: defaultTo(caseDetail?.demographic?.sex, noValue) },
        {
          key: 'Neutered status',
          value: defaultTo(
            caseDetail?.demographic?.neutered_indicator,
            noValue
          ),
        },
        {
          key: 'Weight',
          value: defaultTo(caseDetail?.demographic?.weight, noValue),
        },
        {
          key: 'Age at enrollment',
          value: defaultTo(
            caseDetail?.demographic?.patient_age_at_enrollment,
            noValue
          ),
        },
      ],
    }),
    [caseDetail]
  );

  const diagnosesCard = useMemo(() => {
    const primaryDiagnosis = caseDetail?.diagnosis;

    return {
      title: 'Diagnoses',
      fields: [
        {
          key: 'Disease',
          value: defaultTo(primaryDiagnosis?.disease_term, noValue),
        },
        {
          key: 'Stage of disease',
          value: defaultTo(primaryDiagnosis?.stage_of_disease, noValue),
        },
        {
          key: 'Date of diagnoses',
          value: defaultTo(primaryDiagnosis?.date_of_diagnosis, noValue),
        },
        {
          key: 'Primary site',
          value: defaultTo(primaryDiagnosis?.primary_disease_site, noValue),
        },
        {
          key: 'Histology/Cytology',
          value: defaultTo(primaryDiagnosis?.histology_cytopathology, noValue),
        },
        {
          key: 'Histological grade',
          value: defaultTo(primaryDiagnosis?.histological_grade, noValue),
        },
        {
          key: 'Response to treatment',
          value: defaultTo(primaryDiagnosis?.best_response, noValue),
        },
      ],
    };
  }, [caseDetail]);

  const studyCard = useMemo(
    () => ({
      title: 'Study',
      fields: [
        {
          key: 'Assigned to study',
          value: defaultTo(
            caseDetail?.study?.clinical_study_designation,
            noValue
          ),
        },
        {
          key: 'Assigned to arm',
          value: defaultTo(caseDetail?.cohort?.study_arm?.arm, noValue),
        },
        {
          key: 'Assigned to cohort',
          value: defaultTo(caseDetail?.cohort?.cohort_description, noValue),
        },
        {
          key: 'Patient subgroup',
          value: defaultTo(caseDetail?.enrollment?.patient_subgroup, noValue),
        },
        {
          key: 'Date of informed consent',
          value: defaultTo(
            caseDetail?.enrollment?.date_of_informed_consent,
            noValue
          ),
        },
        {
          key: 'Date of registration',
          value: defaultTo(
            caseDetail?.enrollment?.date_of_registration,
            noValue
          ),
        },
        {
          key: 'Study site',
          value: defaultTo(caseDetail?.enrollment?.site_short_name, noValue),
        },
      ],
    }),
    [caseDetail]
  );

  const files = [...data.filesOfCase]
    .filter((f): f is FilesOfCase => f !== null && f !== undefined)
    .map(f => {
      const customF: CustomF = { ...f };
      const parentSample = data.samplesByCaseRecordId.filter(s =>
        s.files.map(sf => sf.uuid).includes(f.uuid)
      );
      if (parentSample && parentSample.length > 0) {
        customF.sample_id = parentSample[0].sample_id;
      }
      return customF;
    });

  const filterStudy = `${caseDetail.study.clinical_study_designation} (${caseDetail.study.accession_id})`;
  const filterQuery = encodeURIComponent(
    JSON.stringify({ study: [filterStudy] })
  );

  const breadCrumbJson: BreadcrumbData[] = [
    {
      name: 'ALL PROGRAMS',
      to: '/programs',
      isALink: true,
    },
    {
      name: `${caseDetail.study.clinical_study_designation} Detail`,
      to: `/study/${caseDetail.study.clinical_study_designation}`,
      isALink: true,
    },
    {
      name: `${caseDetail.study.clinical_study_designation} CASES`,
      to: `/explore/${filterQuery}`,
      isALink: true,
    },
    {
      name: caseDetail.case_record_id,
    },
  ];

  return (
    <>
      <StatsView data={stat} />
      <Container>
        <div className="breadcrumbs-wrapper">
          <CustomBreadcrumb data={breadCrumbJson} />
        </div>
        <Header>
          <div className="logo">
            <img src={headerIcon} alt="ICDC case detail header logo" />
          </div>

          {(caseDetail.patient_first_name === '' ||
            caseDetail.patient_first_name === null) &&
          !(
            caseDetail.enrollment &&
            caseDetail.enrollment.initials !== '' &&
            caseDetail.enrollment.initials !== null
          ) ? (
            <div className="header-title">
              <div className="main-title">
                <span>
                  {' '}
                  <span className="prefix">Case:</span>{' '}
                  {caseDetail.case_record_id}
                </span>
              </div>
            </div>
          ) : (
            <div className="header-title">
              <div className="main-title">
                <span>
                  {' '}
                  <span className="prefix">Case:</span>{' '}
                  {caseDetail.case_record_id}
                </span>
              </div>
              <div className="sub-title">
                {caseDetail.patient_first_name === '' ||
                caseDetail.patient_first_name === null ? (
                  ''
                ) : (
                  <span className="case-wrapper">
                    <span className="case-key">CASE NAME - </span>
                    <span className="case-value">
                      {caseDetail.patient_first_name}
                    </span>
                  </span>
                )}
                {caseDetail.enrollment &&
                caseDetail.enrollment.initials !== '' &&
                caseDetail.enrollment.initials !== null ? (
                  <span className="case-wrapper">
                    <span>INITIALS </span>
                    <span className="initial-value">
                      {caseDetail.enrollment.initials}
                    </span>
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>
          )}
          {data.multiStudyCases &&
            data.multiStudyCases.caseRecordIds &&
            data.multiStudyCases.caseRecordIds.length > 1 && (
              <>
                <MultiStudyCases
                  cases={data.multiStudyCases.caseRecordIds}
                  caseID={caseDetail.case_record_id}
                />
              </>
            )}
        </Header>

        <CaseDetailCardsContainer>
          <div className="card-with-right-border">
            <div className="card-inner-container">
              <p className="header-text">{descriptionCard.title}</p>

              {defaultTo(descriptionCard.fields, []).map(
                ({ key, value }, index) => (
                  <div
                    key={`${value}-${index}`}
                    className="key-value-container"
                  >
                    <div className="key">{key}:</div>
                    <div className="value">{value}</div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="card-with-right-border">
            <div className="card-inner-container">
              <p className="header-text">{diagnosesCard?.title}</p>

              {defaultTo(diagnosesCard.fields, []).map(
                ({ key, value }, index) => (
                  <div
                    key={`${value}-${index}`}
                    className="key-value-container"
                  >
                    <div className="key">{key}:</div>
                    <div className="value">{value}</div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-inner-container">
              <p className="header-text">{studyCard?.title}</p>

              {defaultTo(studyCard.fields, []).map(({ key, value }, index) => (
                <div key={`${value}-${index}`} className="key-value-container">
                  <div className="key">{key}:</div>
                  <div className="value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </CaseDetailCardsContainer>
      </Container>

      <TableContainer id="case_detail_table_associated_samples">
        <div className="table-wrapper hide-icons">
          <TableContextProvider>
            <SampleTableView data={data.samplesByCaseRecordId} />
          </TableContextProvider>
        </div>
      </TableContainer>

      <TableContainer
        id="case_detail_table_associated_files"
        style={{
          paddingBottom: '72px',
        }}
      >
        <div className="table-wrapper show-icons">
          <TableContextProvider>
            <FileTableView data={files} />
          </TableContextProvider>
        </div>
      </TableContainer>
    </>
  );
};

export default withStyles({}, { withTheme: true })(CaseDetail);
