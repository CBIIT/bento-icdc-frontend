/* eslint-disable no-multiple-empty-lines */
import gql from 'graphql-tag';
import {
  cellTypes,
  dataFormatTypes,
  btnTypes,
  types,
} from '../bento-core';
import {
  customCasesTabDownloadCSV,
  customFilesTabDownloadCSV,
  customSamplesTabDownloadCSV,
  customStudyFilesTabDownloadCSV,
} from './tableDownloadCSV';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
  alt: 'tooltipIcon',
  0: 'Add filtered files associated with selected case(s) to My Files',
  1: 'Add filtered files associated with selected sample(s) to My Files',
  2: 'Add selected files to My Files',
  3: 'Add selected study files to My Files',
  Cases: 'Add filtered files associated with selected case(s) to My Files',
  Samples: 'Add filtered files associated with selected sample(s) to My Files',
  'Case Files': 'Add selected files to My Files',
  'Study Files': 'Add selected study files to My Files',
  arrow: true,
  clsName: 'addSelectedTooltip',
};

// --------------- Tooltip configuration --------------
export const selectAllToolTip = {
  icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
  alt: 'tooltipIcon',
  0: 'Add filtered files associated with all cases to My Files',
  1: 'Add filtered files associated with all samples to My Files',
  2: 'Add all filtered files to My Files',
  3: 'Add all filtered study files to My Files',
  Cases: 'Add filtered files associated with all cases to My Files',
  Samples: 'Add filtered files associated with all samples to My Files',
  'Case Files': 'Add all filtered files to My Files',
  'Study Files': 'Add all filtered study files to My Files',
  arrow: true,
  clsName: 'addAllTooltip',
};
// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

export const multiStudyData = {
  icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/icon-multiStudy.svg',
  alt: 'Multi-study icon',
  toolTipText: 'Multi-study participant also enrolled as:',
};

export const fileViewer = {
  icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
  alt: 'file viewer icon',
  toolTipText: 'View in JBrowse',
};

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Cases',
    dataField: 'dataCase',
    api: 'GET_CASES_OVERVIEW_QUERY',
    paginationAPIField: 'caseOverview',
    count: 'numberOfCases',
    dataKey: 'case_id',
    defaultSortField: 'case_id',
    defaultSortDirection: 'asc',
    buttonText: 'Add Associated Files',
    displayViewJBowseBtn: true,
    disableViewJBowseBtn: true,
    addAllButtonText: 'Add Associated Files for All',
    saveButtonDefaultStyle: {
      borderRadius: '10px',
      width: '180px',
      lineHeight: '37px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#ff7f15',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.7',
      cursor: 'auto',
    },
    columns: [
      {
        dataField: 'case_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{case_id}',
        primary: true,
        display: true,
        viewColumns: false,
      },
      {
        dataField: 'other_cases',
        header: 'Matching Cases',
        display: false,
      },
      {
        dataField: 'study_code',
        header: 'Study Code',
        link: '/study/{study_code}',
        display: true,
      },
      {
        dataField: 'study_type',
        header: 'Study Type',
        display: true,
      },
      {
        dataField: 'breed',
        header: 'Breed',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: true,
      },
      {
        dataField: 'stage_of_disease',
        header: 'Stage Of Disease',
        display: true,
      },
      {
        dataField: 'age',
        header: 'Age',
        display: true,
      },
      {
        dataField: 'sex',
        header: 'Sex',
        display: true,
      },
      {
        dataField: 'neutered_status',
        header: 'Neutered Status',
        display: true,
      },
      {
        dataField: 'weight',
        header: 'Weight (kg)',
        display: true,
      },
      {
        dataField: 'response_to_treatment',
        header: 'Response to Treatment',
        display: true,
      },
      {
        dataField: 'cohort',
        header: 'Cohort',
        display: true,
      },
    ],
    id: 'case_tab',
    onRowsSelect: 'type3',
    disableRowSelection: 'type3',
    tableID: 'case_tab_table',
    selectableRows: true,
    tabIndex: '0',
    tableDownloadCSV: customCasesTabDownloadCSV,
    viewColumns: true,
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Samples',
    dataField: 'dataSample',
    api: 'GET_SAMPLES_OVERVIEW_QUERY',
    count: 'numberOfSamples',
    displayViewJBowseBtn: true,
    disableViewJBowseBtn: true,
    paginationAPIField: 'sampleOverview',
    dataKey: 'sample_id',
    defaultSortField: 'sample_id',
    saveButtonDefaultStyle: {
      borderRadius: '10px',
      width: '180px',
      lineHeight: '37px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#ff7f15',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.7',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'case_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{case_id}',
        display: true,
        viewColumns: false,
      },
      {
        dataField: 'breed',
        header: 'Breed',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_site',
        header: 'Sample Site',
        display: true,
      },
      {
        dataField: 'sample_type',
        header: 'Sample Type',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_pathology',
        header: 'Pathology/Morphology',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'tumor_grade',
        header: 'Tumor Grade',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_chronology',
        header: 'Sample Chronology',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'percentage_tumor',
        header: 'Percentage Tumor',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'necropsy_sample',
        header: 'Necropsy Sample',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_preservation',
        header: 'Sample Preservation',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'sample_tab',
    onRowsSelect: 'type3',
    disableRowSelection: 'type2',
    buttonText: 'Add Associated Files',
    addAllButtonText: 'Add Associated Files for All',
    tableID: 'sample_tab_table',
    tableDownloadCSV: customSamplesTabDownloadCSV,
    viewColumns: true,
    selectableRows: true,
    tabIndex: '1',
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Files',
    dataField: 'dataFile',
    api: 'GET_FILES_OVERVIEW_QUERY',
    paginationAPIField: 'fileOverview',
    defaultSortField: 'file_name',
    defaultSortDirection: 'asc',
    count: 'numberOfFiles',
    buttonText: 'Add Selected Files',
    displayViewJBowseBtn: true,
    disableViewJBowseBtn: false,
    addAllButtonText: 'Add All Filtered Files',
    dataKey: 'file_name',
    associations: 'other',
    saveButtonDefaultStyle: {
      borderRadius: '10px',
      width: '180px',
      lineHeight: '37px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#ff7f15',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.7',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        dataField: 'file_name',
        header: 'File Name',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'access_file',
        header: 'Access',
        sort: 'asc',
        display: true,
        downloadDocument: true,
        documentDownloadProps: {
          maxFileSize: 12000000,
          toolTipTextFileDownload: 'Download a copy of this file',
          toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
          fileSizeColumn: 'file_size',
          fileFormatColumn: 'file_format',
          fileLocationColumn: 'file_uuid',
          caseIdColumn: 'file_name',
          iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
          iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
          iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
        },
      },
      {
        dataField: 'file_format',
        header: 'Format',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_type',
        header: 'File Type',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_size',
        header: 'Size',
        sort: 'asc',
        display: true,
        formatBytes: true,
      },
      {
        dataField: 'association',
        header: 'Association',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_description',
        header: 'Description',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'case_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{case_id}',
        display: true,
        viewColumns: false,
      },
      {
        dataField: 'breed',
        header: 'Breed',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_uuid',
        header: 'File uuid',
        sort: 'asc',
        primary: true,
        display: false,
      },
      {
        dataField: 'study_code',
        header: 'Study Code',
        sort: 'asc',
        link: '/study/{study_code}',
        display: true,
      },
    ],
    id: 'file_tab',
    onRowsSelect: 'type2',
    disableRowSelection: 'type3',
    tableID: 'file_tab_table',
    selectableRows: true,
    tableDownloadCSV: customFilesTabDownloadCSV,
    viewColumns: true,
    tabIndex: '2',
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'StudyFiles',
    dataField: 'dataStudyFile',
    api: 'GET_FILES_OVERVIEW_QUERY',
    paginationAPIField: 'fileOverview',
    defaultSortField: 'file_name',
    defaultSortDirection: 'asc',
    count: 'numberOfStudyFiles',
    buttonText: 'Add Selected Files',
    addAllButtonText: 'Add All Filtered Files',
    dataKey: 'file_name',
    associations: 'study',
    displayViewJBowseBtn: true,
    disableViewJBowseBtn: true,
    saveButtonDefaultStyle: {
      borderRadius: '10px',
      width: '180px',
      lineHeight: '37px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#ff7f15',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.7',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        dataField: 'file_name',
        header: 'File Name',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'file_uuid',
        header: 'File uuid',
        sort: 'asc',
        primary: true,
        display: false,
      },
      {
        dataField: 'file_type',
        header: 'File Type',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'association',
        header: 'Association',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_description',
        header: 'Description',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_format',
        header: 'Format',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_size',
        header: 'Size',
        sort: 'asc',
        display: true,
        formatBytes: true,
      },
      {
        dataField: 'access_file',
        header: 'Access',
        sort: 'asc',
        display: true,
        downloadDocument: true,
        documentDownloadProps: {
          maxFileSize: 12000000,
          toolTipTextFileDownload: 'Download a copy of this file',
          toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
          fileSizeColumn: 'file_size',
          fileFormatColumn: 'file_format',
          fileLocationColumn: 'file_uuid',
          caseIdColumn: 'file_name',
          iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
          iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
          iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
        },
      },
      {
        dataField: 'study_code',
        header: 'Study Code',
        sort: 'asc',
        link: '/study/{study_code}',
        display: true,
      },
    ],
    id: 'file_tab',
    onRowsSelect: 'type2',
    disableRowSelection: 'type3',
    tableID: 'file_tab_table',
    selectableRows: true,
    tableDownloadCSV: customStudyFilesTabDownloadCSV,
    viewColumns: true,
    tabIndex: '3',
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
];

// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'case_tab',
    title: 'Cases',
    dataField: 'dataCase',
    count: 'numberOfCases',
  },
  {
    id: 'sample_tab',
    title: 'Samples',
    dataField: 'dataSample',
    count: 'numberOfSamples',
  },
  {
    id: 'file_tab',
    title: 'Case Files',
    dataField: 'dataFile',
    count: 'numberOfFiles',
  },
  {
    id: 'study_file_tab',
    title: 'Study Files',
    dataField: 'dataFile',
    count: 'numberOfStudyFiles',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Cases',
    primaryColor: '#FF9742',
    secondaryColor: '#FFDFB8',
    selectedColor: '#FF9742',
  },
  {
    title: 'Samples',
    primaryColor: '#9DC1D9',
    secondaryColor: '#C9F1F1',
    selectedColor: '#9DC1D9',
  },
  {
    title: 'Files',
    primaryColor: '#667A87',
    secondaryColor: '#E1E5FF',
    selectedColor: '#667A87',
  },
  {
    title: 'Study Files',
    primaryColor: '#39C0F0',
    secondaryColor: '#39C0F0',
    selectedColor: '#39C0F0',
  },
];

export const DASHBOARD_QUERY = gql`
  query searchCases(
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $case_ids: [String] = [],
  ) 
  {
    searchCases
    (
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation, 
      case_ids: $case_ids,
    ) 
    {
        numberOfStudies
        numberOfCases
        numberOfSamples
        numberOfFiles
        numberOfStudyFiles
        numberOfPrograms
        numberOfAliquots
        volumeOfData

        caseCountByDiagnosis{
  group,
  count
}
caseCountByGender{
  group,
  count
}
caseCountByBreed{
  group,
  count
}
caseCountByStageOfDisease{
  group,
  count
}
caseCountByDiseaseSite{
  group,
  count
}
filterCaseCountByProgram{
  group,
  count
}
filterCaseCountByStudyCode{
  group,
  count,
}
filterCaseCountByStudyType{
  group,
  count
}
filterCaseCountByBreed{
  group,
  count
}
filterCaseCountByDiagnosis{
  group,
  count
}
filterCaseCountByDiseaseSite{
  group,
  count
}
filterCaseCountByStageOfDisease{
  group,
  count
}
filterCaseCountByResponseToTreatment{
  group,
  count
}
filterCaseCountBySex{
  group,
  count
}
filterCaseCountByNeuteredStatus{
  group,
  count
}
filterCaseCountBySampleType{
  group,
  count
}
filterCaseCountBySamplePathology{
  group,
  count
}
filterCaseCountBySampleSite{
  group,
  count
}
filterCaseCountByFileAssociation{
  group,
  count
}
filterCaseCountByFileType{
  group,
  count
}
filterCaseCountByBiobank{
  group,
  count
}
filterCaseCountByStudyParticipation{
  group,
  count
}
filterCaseCountByFileFormat{
  group,
  count
}
        programsAndStudies {
          program
          caseSize
          studies {
            study
            caseSize
          }
        }
    }
    biospecimen_source {
      biospecimen_repository_acronym
      biospecimen_repository_full_name
    }

    program {
    program_acronym
    program_name
  }
  }
`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_NAME_QUERY = gql`
query fileOverview(
    $file_level: [String] = [],
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "file_name",
    $sort_direction: String = "ASC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    fileOverview
    (
      file_level: $file_level,
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      file_name
    }
  }
  `;

export const FILTER_QUERY = gql`
query searchCases(
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
  ) 
  {
    searchCases
    (
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation, 
    ) 
    {
        numberOfStudies
        numberOfCases
        numberOfSamples
        numberOfFiles
        numberOfStudyFiles
        numberOfPrograms
        numberOfAliquots
        volumeOfData
        caseCountByDiagnosis{
  group,
  count
}
caseCountByGender{
  group,
  count
}
caseCountByBreed{
  group,
  count
}
caseCountByStageOfDisease{
  group,
  count
}
caseCountByDiseaseSite{
  group,
  count
}

        filterCaseCountByProgram {
          group
          count
        }
        filterCaseCountByStudyCode {
          group
          count
        }
        filterCaseCountByStudyType {
          group
          count
        }
        filterCaseCountByBreed {
          group
          count
        }
        filterCaseCountByDiagnosis {
          group
          count
        }
        filterCaseCountByDiseaseSite {
          group
          count
        }
        filterCaseCountByStageOfDisease {
          group
          count
        }
        filterCaseCountByResponseToTreatment {
          group
          count
        }
        filterCaseCountBySex {
          group
          count
        }
        filterCaseCountByNeuteredStatus {
          group
          count
        }
        filterCaseCountBySampleType {
          group
          count
        }
        filterCaseCountBySamplePathology {
          group
          count
        }
        filterCaseCountBySampleSite {
          group
          count
        }
        filterCaseCountByFileAssociation {
          group
          count
        }
        filterCaseCountByFileType {
          group
          count
        }
        filterCaseCountByFileFormat {
          group
          count
        }
        filterCaseCountByBiobank {
          group
          count
        }
        filterCaseCountByStudyParticipation {
          group
          count
        }
        programsAndStudies {
          program
          caseSize
          studies {
            study
            caseSize
          }
        }
    }
  }
`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_OVERVIEW_QUERY = gql`
  query fileOverview(
    $file_level: [String] = [],
    $case_ids: [String] = [],
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "file_name",
    $sort_direction: String = "ASC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    fileOverview
    (
      file_level: $file_level,
      case_ids: $case_ids,
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      file_name
      file_type
      association
      file_description
      file_format
      file_size
      case_id
      breed
      diagnosis
      study_code
      file_uuid
      sample_id
      sample_site
      physical_sample_type
      general_sample_pathology
      tumor_sample_origin
      summarized_sample_type
      specific_sample_pathology
      date_of_sample_collection
      tumor_grade
      sample_chronology
      percentage_tumor
      necropsy_sample
      sample_preservation
      comment
      individual_id
      patient_age_at_enrollment
      sex
      neutered_indicator
      weight
      primary_disease_site
      stage_of_disease
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      best_response
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      cohort_description
      arm
      other_cases
    }
  }
`;

export const GET_FILES_OVERVIEW_DESC_QUERY = gql`
  query fileOverview(
    $file_level: [String] = [],
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "file_name",
    $sort_direction: String = "DESC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    fileOverview
    (
      file_level: $file_level,
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      file_name
      file_type
      association
      file_description
      file_format
      file_size
      case_id
      breed
      diagnosis
      study_code
      file_uuid
      sample_id
      sample_site
      physical_sample_type
      general_sample_pathology
      tumor_sample_origin
      summarized_sample_type
      specific_sample_pathology
      date_of_sample_collection
      tumor_grade
      sample_chronology
      percentage_tumor
      necropsy_sample
      sample_preservation
      comment
      individual_id
      patient_age_at_enrollment
      sex
      neutered_indicator
      weight
      primary_disease_site
      stage_of_disease
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      best_response
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      cohort_description
      arm
      other_cases
    }
  }
`;

// --------------- GraphQL query - Retrieve sample tab details --------------
export const GET_SAMPLES_OVERVIEW_QUERY = gql`
  query sampleOverview(
    $case_ids: [String] = [],
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "sample_ids",
    $sort_direction: String = "ASC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    sampleOverview
    (
      case_ids: $case_ids,
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      sample_id
      case_id
      breed
      diagnosis
      sample_site
      sample_type
      sample_pathology
      tumor_grade
      sample_chronology
      percentage_tumor
      necropsy_sample
      sample_preservation
      files
      physical_sample_type
      general_sample_pathology
      tumor_sample_origin
      comment
      individual_id
      other_cases
      patient_age_at_enrollment
      sex
      neutered_indicator
      weight
      primary_disease_site
      stage_of_disease
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      best_response
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      cohort_description
      arm
    }  
}
`;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_SAMPLES_OVERVIEW_DESC_QUERY = gql`
  query sampleOverview(
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "sample_ids",
    $sort_direction: String = "DESC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    sampleOverview
    (
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      sample_id
      case_id
      breed
      diagnosis
      sample_site
      sample_type
      sample_pathology
      tumor_grade
      sample_chronology
      percentage_tumor
      necropsy_sample
      sample_preservation
      files
      physical_sample_type
      general_sample_pathology
      tumor_sample_origin
      comment
      individual_id
      other_cases
      patient_age_at_enrollment
      sex
      neutered_indicator
      weight
      primary_disease_site
      stage_of_disease
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      best_response
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      cohort_description
      arm
    }  
}
  `;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_CASES_OVERVIEW_QUERY = gql`
  query caseOverview(
    $case_ids: [String] = [],
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "case_ids",
    $sort_direction: String = "ASC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    caseOverview
    (
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
      case_ids: $case_ids
    )
    {
      case_id
      study_code
      study_type
      cohort
      breed
      diagnosis
      stage_of_disease
      age
      sex
      neutered_status
      weight
      response_to_treatment
      disease_site
      files
      other_cases
      individual_id
      primary_disease_site
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      arm
    }  
}
  `;
// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_CASES_OVERVIEW_DESC_QUERY = gql`
  query caseOverview(
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "case_ids",
    $sort_direction: String = "DESC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    caseOverview
    (
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      case_id
      study_code
      study_type
      cohort
      breed
      diagnosis
      stage_of_disease
      age
      sex
      neutered_status
      weight
      response_to_treatment
      disease_site
      files
      other_cases
      individual_id
      primary_disease_site
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      arm
    }  
}
  `;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
  query caseOverview(
    $case_ids: [String] = [],
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "case_ids",
    $sort_direction: String = "ASC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    caseOverview
    (
      case_ids: $case_ids,
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      files
    }  
}
  `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query sampleOverview(
    $case_ids: [String] = [],
    $sample_ids: [String] = [],
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "sample_ids",
    $sort_direction: String = "ASC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    sampleOverview
    (
      case_ids: $case_ids,
      sample_ids: $sample_ids,
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      files
    }  
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
 query fileOverview(
    $file_level: [String] = [],
    $case_ids: [String] = [],
    $program: [String] = [],
    $study: [String], 
    $study_type: [String], 
    $breed: [String], 
    $diagnosis: [String], 
    $disease_site: [String], 
    $stage_of_disease: [String], 
    $response_to_treatment: [String], 
    $sex: [String], 
    $neutered_status: [String], 
    $sample_type: [String], 
    $sample_pathology: [String], 
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "file_name",
    $sort_direction: String = "ASC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    fileOverview
    (
      file_level: $file_level,
      case_ids: $case_ids,
      program: $program,
      study: $study, 
      study_type: $study_type, 
      breed: $breed, 
      diagnosis: $diagnosis, 
      disease_site: $disease_site, 
      stage_of_disease: $stage_of_disease, 
      response_to_treatment: $response_to_treatment, 
      sex: $sex,
      neutered_status: $neutered_status,
      sample_type: $sample_type, 
      sample_pathology: $sample_pathology, 
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      file_uuid
    }
  }
  `;

export const GET_FILE_IDS_FROM_FILE_NAME = gql`
query (
    $file_name: [String],
    $offset: Int,
    $first: Int,
    $order_by: String
)
{
    fileIdsFromFileNameDesc(
        file_name:$file_name, 
        offset:$offset,
        first:$first,
        order_by:$order_by
    )
    {
        file_uuid
    }
}`;

export const GET_ALL_FILEIDS_ON_FILESTAB_FOR_SELECT_ALL = gql`
 query fileOverview (
  $file_name: [String]
 ) {
  fileIdsFromFileName(
    file_name: $file_name
  ) {
    file_uuid
  }
 }
  `;

export const GET_STUDY_CODE = gql`
  query study($clinical_study_designation: String) {
    study(clinical_study_designation: $clinical_study_designation) {
      clinical_study_designation
      accession_id
    }
  }
`;

// --------------- Tabs Table configuration --------------
export const tableContainers = [
  {
    name: 'Cases',
    dataField: 'dataCase',
    api: GET_CASES_OVERVIEW_QUERY,
    paginationAPIField: 'caseOverview',
    count: 'numberOfCases',
    dataKey: 'case_id',
    defaultSortField: 'case_id',
    defaultSortDirection: 'asc',
    extendedViewConfig: {
      pagination: true,
      download: {
        downloadCsv: 'Download Table Contents As CSV',
        ...customCasesTabDownloadCSV,
      },
      manageViewColumns: {
        title: 'View Columns',
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'case_id',
        header: 'Case ID',
        sort: 'asc',
        display: true,
        cellType: cellTypes.CUSTOM_ELEM,
        linkAttr: {
          rootPath: '/case',
          pathParams: ['case_id'],
        },
        tooltipText: 'sort',
      },
      {
        dataField: 'other_cases',
        header: 'Matching Cases',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'study_code',
        header: 'Study Code',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/study',
          pathParams: ['study_code'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'study_type',
        header: 'Study Type',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'breed',
        header: 'Breed',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'stage_of_disease',
        header: 'Stage Of Disease',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'age',
        header: 'Age',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'sex',
        header: 'Sex',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'neutered_status',
        header: 'Neutered Status',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'weight',
        header: 'Weight (kg)',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'response_to_treatment',
        header: 'Response to Treatment',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'cohort',
        header: 'Cohort',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
    ],
    id: 'case_tab',
    tableID: 'case_tab_table',
    tabIndex: '0',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'case_ids',
    addFilesResponseKeys: ['caseOverview', 'files'],
    addAllFilesResponseKeys: ['caseOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
    addSelectedFilesQuery: GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Samples',
    dataField: 'dataSample',
    api: GET_SAMPLES_OVERVIEW_QUERY,
    count: 'numberOfSamples',
    paginationAPIField: 'sampleOverview',
    dataKey: 'sample_id',
    defaultSortField: 'sample_id',
    defaultSortDirection: 'asc',
    extendedViewConfig: {
      pagination: true,
      download: {
        downloadCsv: 'Download Table Contents As CSV',
        ...customSamplesTabDownloadCSV,
      },
      manageViewColumns: {
        title: 'View Columns',
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'case_id',
        header: 'Case ID',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/case',
          pathParams: ['case_id'],
        },
        display: true,
        viewColumns: false,
        tooltipText: 'sort',
      },
      {
        dataField: 'breed',
        header: 'Breed',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'sample_site',
        header: 'Sample Site',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'sample_type',
        header: 'Sample Type',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'sample_pathology',
        header: 'Pathology/Morphology',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'tumor_grade',
        header: 'Tumor Grade',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'sample_chronology',
        header: 'Sample Chronology',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'percentage_tumor',
        header: 'Percentage Tumor',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'necropsy_sample',
        header: 'Necropsy Sample',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'sample_preservation',
        header: 'Sample Preservation',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
    ],
    id: 'sample_tab',
    tableID: 'sample_tab_table',
    tabIndex: '1',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    // addFilesRequestVariableKey: 'sample_ids',
    // addFilesResponseKeys: ['fileIDsFromList'],
    // addAllFilesResponseKeys: ['sampleOverview', 'files'],
    // addAllFileQuery: GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART,
    // addSelectedFilesQuery: GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Case Files',
    dataField: 'dataFile',
    api: GET_FILES_OVERVIEW_QUERY,
    paginationAPIField: 'fileOverview',
    defaultSortField: 'file_name',
    defaultSortDirection: 'asc',
    count: 'numberOfFiles',
    dataKey: 'file_name',
    jbrowse: true,
    queryParam: {
      file_level: ['case'],
    },
    extendedViewConfig: {
      pagination: true,
      download: {
        downloadCsv: 'Download Table Contents As CSV',
        ...customFilesTabDownloadCSV,
      },
      manageViewColumns: {
        title: 'View Columns',
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'file_name',
        header: 'File Name',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'access_file',
        header: 'Access',
        display: true,
        cellType: cellTypes.CUSTOM_ELEM,
        documentDownloadProps: {
          maxFileSize: 12000000,
          toolTipTextFileDownload: 'Download a copy of this file',
          toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
          fileSizeColumn: 'file_size',
          fileFormatColumn: 'file_format',
          fileLocationColumn: 'file_uuid',
          caseIdColumn: 'file_name',
          iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
          iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
          iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
        },
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_format',
        header: 'Format',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_type',
        header: 'File Type',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_size',
        header: 'Size',
        display: true,
        dataFormatType: dataFormatTypes.FORMAT_BYTES,
        cellType: cellTypes.FORMAT_DATA,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'association',
        header: 'Association',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_description',
        header: 'Description',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'case_id',
        header: 'Case ID',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/case',
          pathParams: ['case_id'],
        },
        display: true,
      },
      {
        dataField: 'breed',
        header: 'Breed',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_uuid',
        header: 'File uuid',
        primary: true,
        display: false,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'study_code',
        header: 'Study Code',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/study',
          pathParams: ['study_code'],
        },
        display: false,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
    ],
    id: 'file_tab',
    tableID: 'file_tab_table',
    selectableRows: true,
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'file_name',
    addFilesResponseKeys: ['fileIdsFromFileName'],
    addAllFilesResponseKeys: ['fileOverview', 'file_uuid'],
    addAllFileQuery: GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
    addSelectedFilesQuery: GET_ALL_FILEIDS_ON_FILESTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Study Files',
    dataField: 'dataStudyFile',
    api: GET_FILES_OVERVIEW_QUERY,
    paginationAPIField: 'fileOverview',
    defaultSortField: 'file_name',
    defaultSortDirection: 'asc',
    count: 'numberOfStudyFiles',
    dataKey: 'file_name',
    queryParam: {
      file_level: ['study'],
    },
    extendedViewConfig: {
      pagination: true,
      download: {
        downloadCsv: 'Download Table Contents As CSV',
        ...customStudyFilesTabDownloadCSV,
      },
      manageViewColumns: {
        title: 'View Columns',
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'file_name',
        header: 'File Name',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_uuid',
        header: 'File uuid',
        display: false,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_type',
        header: 'File Type',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'association',
        header: 'Association',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_description',
        header: 'Description',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_format',
        header: 'Format',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_size',
        header: 'Size',
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
        dataFormatType: dataFormatTypes.FORMAT_BYTES,
        cellType: cellTypes.FORMAT_DATA,
      },
      {
        dataField: 'access_file',
        header: 'Access',
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
        display: true,
        downloadDocument: true,
        documentDownloadProps: {
          maxFileSize: 12000000,
          toolTipTextFileDownload: 'Download a copy of this file',
          toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
          fileSizeColumn: 'file_size',
          fileFormatColumn: 'file_format',
          fileLocationColumn: 'file_uuid',
          caseIdColumn: 'file_name',
          iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
          iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
          iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
        },
      },
      {
        dataField: 'study_code',
        header: 'Study Code',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/study',
          pathParams: ['study_code'],
        },
        display: true,
        role: cellTypes.DISPLAY,
        tooltipText: 'sort',
      },
    ],
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'file_name',
    addFilesResponseKeys: ['fileIdsFromFileName'],
    addAllFilesResponseKeys: ['fileOverview', 'file_uuid'],
    addAllFileQuery: GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
    addSelectedFilesQuery: GET_ALL_FILEIDS_ON_FILESTAB_FOR_SELECT_ALL,
  },
];

export const alertMessage = 'The cart is limited to 1000 files. Please narrow the search criteria or remove some files from the cart to add more.';

const addSelectedFiles = {
  title: 'Add Selected Files',
  clsName: 'add_selected_button',
  type: types.BUTTON,
  role: btnTypes.ADD_SELECTED_FILES,
  btnType: btnTypes.ADD_SELECTED_FILES,
  tooltipCofig: tooltipContent,
  conditional: true,
};

const jBrowseBtn = {
  type: types.CUSTOM_ELEM,
  Jbrowse: true,
};

export const tableLayOut = [
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_header',
    items: [
      {
        title: 'Add Associated Files For All',
        clsName: 'add_all_button',
        type: types.BUTTON,
        role: btnTypes.ADD_ALL_FILES,
        btnType: btnTypes.ADD_ALL_FILES,
        conditional: false,
        tooltipCofig: selectAllToolTip,
        alertMessage,
      },
      addSelectedFiles,
      jBrowseBtn,
    ],
  },
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_footer',
    items: [
      addSelectedFiles,
      jBrowseBtn,
    ],
  },
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_footer_link',
    items: [
      {
        title: 'Go to My Cart >',
        clsName: 'go_to_cart',
        url: '#/fileCentricCart',
        type: types.LINK,
      }],
  },
];
