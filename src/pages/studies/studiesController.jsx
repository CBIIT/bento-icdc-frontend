import React, { useEffect, useMemo } from 'react';
import { useQuery as apolloUseQuery } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import Studies from './studiesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DATA_QUERY } from '../../bento/studiesData';
import { convertCRDCLinksToValue } from '../../utils/utils';
import { SkeletonLoader } from '../../components/Skeleton';
import { request, gql } from 'graphql-request';
import env from '../../utils/env';
import { Toaster, toast } from 'sonner';

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
  const { data: interOpData, isError } = useQuery({
    queryKey: ['studiesByProgram'],
    queryFn: async () =>
      request(env.REACT_APP_INTEROP_SERVICE_URL, studiesByProgram),
  });

  useEffect(() => {
    if (isError)
      toast.error('An error has occurred in interoperability api', {
        action: {
          label: 'X',
          onClick: () => undefined,
        },
      });
  }, [isError]);

  const repositories = useMemo(() => {
    const links = interOpData?.studiesByProgram?.[0]?.CRDCLinks;
    return links?.map(link => link.repository) || [];
  }, [interOpData]);

  if (loading) return <SkeletonLoader variant="withRounded" />;
  if (error)
    return (
      <Typography variant="h2" color="error" size="sm">
        {error
          ? `An error has occurred in loading stats component: ${error}`
          : 'Recieved wrong data'}
      </Typography>
    );

  return (
    <>
      <Toaster richColors />
      <Studies
        data={convertCRDCLinksToValue(data, undefined, repositories)}
        invalid={invalid}
        interOpData={!isError ? interOpData : []}
      />
    </>
  );
};

export default studiesContainer;
