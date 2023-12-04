import React from 'react';
import {
  CircularProgress,
  withStyles,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import styles from './ClinicalDataStyle';
import { GET_CILICAL_DATA_OF_STUDY } from '../../../../bento/studyDetailsData';

const ClinicalDataView = ({
  studyCode,
}) => {
  console.log('clinical data view ', studyCode);
  const { data, loading } = useQuery(GET_CILICAL_DATA_OF_STUDY, {
    variables: {
      study_code: studyCode,
    },
  });
  if (loading) {
    return (
      <CircularProgress />
    );
  }
  console.log(loading);
  console.log(data);
  return (
    <>
    </>
  );
};

export default withStyles(styles)(ClinicalDataView);
