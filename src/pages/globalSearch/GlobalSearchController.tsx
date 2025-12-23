import React from 'react';
import { useQuery } from '@apollo/client';
import GlobalSearchView from './GlobalSerachView';
import {
  StudesProgramDocument,
  StudesProgramQuery,
} from '../../generated-types/graphql';
import { SkeletonLoader } from '../../components/Skeleton';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  id: string;
}

interface GlobalSearchControllerProps {
  match: RouteComponentProps<MatchParams>['match'];
}

const GlobalSearchController: React.FC<GlobalSearchControllerProps> = ({
  match,
}) => {
  /**
   * resolve study program match
   */
  const { loading, data } = useQuery<StudesProgramQuery>(StudesProgramDocument);

  if (loading || !data) {
    return <SkeletonLoader />;
  }
  // get study program
  const study2Program = (data.studiesByProgram || []).reduce<
    Record<string, string>
  >((acc, item) => {
    if (item?.clinical_study_designation && item?.program_id) {
      acc[item.clinical_study_designation] = item.program_id;
    }
    return acc;
  }, {});

  return (
    <>
      <GlobalSearchView
        searchparam={match.params.id}
        study2Program={study2Program || {}}
      />
    </>
  );
};

export default GlobalSearchController;
