// import React, { useMemo } from 'react';
// import { useQuery as apolloUseQuery } from '@apollo/client';
// import ProgramDetailView from './program-detail-view';
// import { convertCRDCLinksToValue } from '../../utils/utils';
// import { RouteComponentProps } from 'react-router';
// import { Typography } from '@mui/material';
// import {
//   ProgramDocument,
//   ProgramQuery,
//   ProgramQueryVariables,
// } from '../../generated-types/graphql';
// import { SkeletonLoader } from '../../components/Skeleton';

// interface ProgramDetailControllerProps {
//   match: RouteComponentProps<{ id: string }>['match'];
// }
// const ProgramDetailController: React.FC<ProgramDetailControllerProps> = ({
//   match,
// }) => {
//   const { loading, error, data } = apolloUseQuery<
//     ProgramQuery,
//     ProgramQueryVariables
//   >(ProgramDocument, {
//     variables: { programTitle: match.params.id },
//   });

//   const repositories = useMemo(() => {
//     const links = data?.externalDataOverview?.[0]?.CRDCLinks;
//     return links?.map(link => link.repository) || [];
//   }, [data]);

//   if (loading) return <SkeletonLoader variant="withRounded" />;
//   if (!data || data.program.length === 0) {
//     return (
//       <Typography color="error">
//         {error
//           ? `An error has occurred in loading stats component: ${error?.message}`
//           : 'Recieved wrong data'}
//       </Typography>
//     );
//   }

//   return (
//     <ProgramDetailView
//       data={
//         convertCRDCLinksToValue(
//           data,
//           'studiesByProgramId',
//           repositories
//         ) as ProgramQuery
//       }
//       interOpData={data}
//     />
//   );
// };

// export default ProgramDetailController;

import React, { useMemo } from 'react';
import { useQuery as apolloUseQuery } from '@apollo/client';
import ProgramDetailView from './program-detail-view';
import { convertCRDCLinksToValue } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { Typography } from '@mui/material';
import {
  ProgramDocument,
  ProgramQuery,
  ProgramQueryVariables,
} from '../../generated-types/graphql';
import { SkeletonLoader } from '../../components/Skeleton';

interface ProgramDetailControllerProps {
  match: RouteComponentProps<{ id: string }>['match'];
}

const ProgramDetailController: React.FC<ProgramDetailControllerProps> = ({
  match,
}) => {
  const { loading, error, data } = apolloUseQuery<
    ProgramQuery,
    ProgramQueryVariables
  >(ProgramDocument, {
    variables: { programTitle: match.params.id },
    errorPolicy: 'all',
  });

  const repositories = useMemo(() => {
    return (
      data?.externalDataOverview
        ?.flatMap(item => item?.CRDCLinks ?? [])
        .map(link => link?.repository)
        .filter((repo): repo is string => Boolean(repo)) ?? []
    );
  }, [data]);

  const safeData = useMemo(() => {
    return {
      ...data,
      program: data?.program ?? [],
      externalDataOverview: data?.externalDataOverview ?? [],
    };
  }, [data]);

  if (loading && !data) return <SkeletonLoader variant="withRounded" />;

  if (!safeData.program || safeData.program.length === 0) {
    return (
      <Typography color="error">
        {error
          ? `An error has occurred in loading stats component: ${error.message}`
          : 'Recieved wrong data'}
      </Typography>
    );
  }

  return (
    <>
      {error && (
        <Typography color="error">
          Some program data could not be loaded.
        </Typography>
      )}
      <ProgramDetailView
        data={
          convertCRDCLinksToValue(
            safeData as ProgramQuery,
            'studiesByProgramId',
            repositories
          ) as ProgramQuery
        }
        interOpData={safeData as ProgramQuery}
      />
    </>
  );
};

export default ProgramDetailController;
