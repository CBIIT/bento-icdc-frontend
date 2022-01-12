/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconAdministrative from '-!react-svg-loader!./icons/Administrative.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconAdministrativeGraph from '-!react-svg-loader!./icons/Administrative_graph.svg';
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconStudy from '-!react-svg-loader!./icons/Study.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconStudyGraph from '-!react-svg-loader!./icons/Study_graph.svg';
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconClinicalTrial from '-!react-svg-loader!./icons/Clinical_Trial.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconClinicalTrialGraph from '-!react-svg-loader!./icons/Clinical_Trial_graph.svg';
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconCase from '-!react-svg-loader!./icons/Case.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconCaseGraph from '-!react-svg-loader!./icons/Case_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconAnalysis from '-!react-svg-loader!./icons/icon_analysis.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconAnalysisGraph from '-!react-svg-loader!./icons/icon_analysis_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconBiospecimen from '-!react-svg-loader!./icons/icon_biospecimen.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconBiospecimenGraph from '-!react-svg-loader!./icons/icon_biospecimen_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconClinical from '-!react-svg-loader!./icons/icon_clinical.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconClinicalGraph from '-!react-svg-loader!./icons/icon_clinical_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconClinicalAssessment from '-!react-svg-loader!./icons/icon_clinical_assessment.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconDataFile from '-!react-svg-loader!./icons/icon_data_file.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconDataFileGraph from '-!react-svg-loader!./icons/icon_data_file_graph.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconMetadata from '-!react-svg-loader!./icons/icon_metadata.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconNotation from '-!react-svg-loader!./icons/icon_notation.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconIndexFile from '-!react-svg-loader!./icons/icon_index_file.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconDataObservations from '-!react-svg-loader!./icons/icon_data_observations.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconDefault from '-!react-svg-loader!./icons/icon_default.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconExperimentalMethods from '-!react-svg-loader!./icons/icon_experimental_methods.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconSubjectCharacteristics from '-!react-svg-loader!./icons/icon_subject_characteristics.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconImaging from '-!react-svg-loader!./icons/icon_imaging.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconStudyAdministration from '-!react-svg-loader!./icons/icon_study_administration.svg';

const nodeCategoryList = {
  clinical: {
    icon: IconClinical,
    color: '#05B8EE',
  },
  biospecimen: {
    icon: IconBiospecimen,
    color: '#28AE60',
  },
  data_file: {
    icon: IconDataFile,
    color: '#7EC500',
  },
  metadata_file: {
    icon: IconMetadata,
    color: '#F4B940',
  },
  analysis: {
    icon: IconAnalysis,
    color: '#FF7ABC',
  },
  administrative: {
    icon: IconAdministrative,
    color: '#9B2C1F',
  },
  case: {
    icon: IconCase,
    color: '#FF7F15',
  },
  study: {
    icon: IconStudy,
    color: '#AD91FF',
  },
  clinical_trial: {
    icon: IconClinicalTrial,
    color: '#1C75BC',
  },
  notation: {
    icon: IconNotation,
    color: '#E74C3C',
  },
  index_file: {
    icon: IconIndexFile,
    color: '#26D9B1',
  },
  clinical_assessment: {
    icon: IconClinicalAssessment,
    color: '#3283C8',
  },
  medical_history: {
    icon: IconClinical,
    color: '#05B8EE',
  },
  data_observations: {
    icon: IconDataObservations,
    color: '#FF8585',
  },
  experimental_methods: {
    icon: IconExperimentalMethods,
    color: '#E74C3C',
  },
  subject_characteristics: {
    icon: IconSubjectCharacteristics,
    color: '#05B8EE',
  },
  imaging: {
    icon: IconImaging,
    color: '#7EC500',
  },
  study_administration: {
    icon: IconStudyAdministration,
    color: '#733EA3',
  },
};

const graphNodeCategoryList = {
  clinical: {
    icon: IconClinicalGraph,
    color: '#05B8EE',
  },
  biospecimen: {
    icon: IconBiospecimenGraph,
    color: '#28AE60',
  },
  data_file: {
    icon: IconDataFileGraph,
    color: '#7EC500',
  },
  metadata_file: {
    icon: IconMetadata,
    color: '#F4B940',
  },
  analysis: {
    icon: IconAnalysisGraph,
    color: '#FF7ABC',
  },
  administrative: {
    icon: IconAdministrativeGraph,
    color: '#9B2C1F',
  },
  case: {
    icon: IconCaseGraph,
    color: '#FF7F15',
  },
  study: {
    icon: IconStudyGraph,
    color: '#AD91FF',
  },
  clinical_trial: {
    icon: IconClinicalTrialGraph,
    color: '#1C75BC',
  },
  notation: {
    icon: IconNotation,
    color: '#E74C3C',
  },
  index_file: {
    icon: IconIndexFile,
    color: '#26D9B1',
  },
  clinical_assessment: {
    icon: IconClinicalAssessment,
    color: '#3283C8',
  },
  medical_history: {
    icon: IconClinicalGraph,
    color: '#05B8EE',
  },
  data_observations: {
    icon: IconDataObservations,
    color: '#FF8585',
  },
  experimental_methods: {
    icon: IconExperimentalMethods,
    color: '#E74C3C',
  },
  subject_characteristics: {
    icon: IconSubjectCharacteristics,
    color: '#05B8EE',
  },
  imaging: {
    icon: IconImaging,
    color: '#7EC500',
  },
  study_administration: {
    icon: IconStudyAdministration,
    color: '#733EA3',
  },
};

const defaultCategory = {
  icon: IconDefault,
  color: '#9B9B9B',
};

export const getCategoryIconSVG = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].icon;
  }

  return defaultCategory.icon;
};

export const getCategoryColor = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].color;
  }

  return defaultCategory.color;
};

export const getGraphCategoryIconSVG = (category) => {
  if (graphNodeCategoryList[category]) {
    return graphNodeCategoryList[category].icon;
  }

  return defaultCategory.icon;
};
