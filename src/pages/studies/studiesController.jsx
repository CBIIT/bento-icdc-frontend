import React, { useMemo } from 'react';
import { useQuery as apolloUseQuery } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import Studies from './studiesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DATA_QUERY } from '../../bento/studiesData';
import { convertCRDCLinksToValue } from '../../utils/utils';
import { SkeletonLoader } from '../../components/Skeleton';
import { request, gql } from 'graphql-request';
import env from '../../utils/env';

const studiesByProgram = gql`
  query getStudiesByProgramStudiesView {
    studiesByProgram {
      clinical_study_designation
      CRDCLinks {
        url
        repository
      }
      numberOfCRDCNodes
      numberOfImageCollections
    }
  }
`;

const studiesContainer = ({ invalid }) => {
  const { loading, error, data } = apolloUseQuery(GET_STUDY_DATA_QUERY);
  const {
    data: interOpData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['studiesByProgram'],
    queryFn: async () =>
      request(env.REACT_APP_INTEROP_SERVICE_URL, studiesByProgram),
  });

  const repositories = useMemo(() => {
    const links = interOpData?.studiesByProgram?.[0]?.CRDCLinks;
    return links?.map(link => link.repository) || [];
  }, [interOpData]);

  if (loading || isLoading) return <SkeletonLoader variant="withRounded" />;
  if (error)
    return (
      <Typography variant="h2" color="error" size="sm">
        {error
          ? `An error has occurred in loading stats component: ${error}`
          : 'Recieved wrong data'}
      </Typography>
    );

  if (isError) {
    return (
      <Typography variant="h5" color="error" size="sm">
        An error has occurred in interoperability api
      </Typography>
    );
  }

  return (
    <Studies
      data={convertCRDCLinksToValue(data, undefined, repositories)}
      invalid={invalid}
      interOpData={interOpData}
    />
  );
};

export default studiesContainer;
