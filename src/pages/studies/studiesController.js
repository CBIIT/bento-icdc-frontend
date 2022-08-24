import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import Studies from './studiesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DATA_QUERY } from '../../bento/studiesData';

const convertCRDCLinksToValue = (data) => {
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
};

const studiesContainer = ({ invalid }) => {
  const { loading, error, data } = useQuery(GET_STUDY_DATA_QUERY);
  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="headline" color="error" size="sm">{error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}</Typography>;

  return <Studies data={convertCRDCLinksToValue(data)} invalid={invalid} />;
};

export default studiesContainer;
