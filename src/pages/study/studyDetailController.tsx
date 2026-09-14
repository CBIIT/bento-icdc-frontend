import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import StudyDetailView from './studyDetailView';
import {
  STUDY_DETAILS_ACTION_LABELS,
  STUDY_DETAILS_MESSAGES,
} from './constants/studyDetails';
import { logStudyDiagnostic } from './studyDiagnostics';
import { Typography } from '../../components/Wrappers/Wrappers';
import Studies from '../studies/studiesController';
import {
  StudyDocument,
  StudyQuery,
  StudyQueryVariables,
} from '../../generated-types/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { SkeletonLoader } from '../../components/Skeleton';

interface MatchProps extends RouteComponentProps {
  params: {
    id: string;
    fileType: string;
  };
}

const StudyDetailContainer = ({
  match,
  history,
}: {
  match: MatchProps;
  history: RouteComponentProps['history'];
}) => {
  const { loading, error, data, refetch } = useQuery<
    StudyQuery,
    StudyQueryVariables
  >(StudyDocument, {
    variables: { csd: match.params.id, accessionId: match.params.id },
    errorPolicy: 'all',
  });

  const study = data?.study?.[0];
  const studyDesignation = study?.clinical_study_designation;
  const hasUsableStudy = Boolean(study && studyDesignation?.trim());
  const hasPartialError = Boolean(error && hasUsableStudy);
  const [warningOpen, setWarningOpen] = useState(hasPartialError);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (hasPartialError) {
      setWarningOpen(true);
    } else if (!isRefreshing) {
      setWarningOpen(false);
    }
  }, [hasPartialError, isRefreshing]);

  useEffect(() => {
    if (!error) return;

    logStudyDiagnostic({
      operation: 'Study',
      routeIdentifier: match.params.id,
      ...(error.graphQLErrors.length > 0
        ? {
            graphQLErrors: error.graphQLErrors.map(graphQLError => ({
              message: graphQLError.message,
              ...(graphQLError.path ? { path: [...graphQLError.path] } : {}),
            })),
          }
        : {}),
      ...(error.networkError
        ? { networkError: error.networkError.message }
        : {}),
    });
  }, [error, match.params.id]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch().catch(() => undefined);
    setIsRefreshing(false);
  };

  if (hasUsableStudy && data && studyDesignation) {
    // Redirect URLs from Identifiers.org by replacing the accession ID with
    // the Study designation (ICDC-2072).
    if (studyDesignation !== match.params.id) {
      history.push(`/study/${studyDesignation}`);
    }

    return (
      <>
        <Snackbar
          open={warningOpen}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity="warning"
            action={
              <>
                <Button
                  color="inherit"
                  size="small"
                  style={{ textTransform: 'none' }}
                  disabled={isRefreshing}
                  onClick={() => void handleRefresh()}
                >
                  {isRefreshing ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : (
                    STUDY_DETAILS_ACTION_LABELS.refresh
                  )}
                </Button>
                <IconButton
                  aria-label={STUDY_DETAILS_ACTION_LABELS.close}
                  color="inherit"
                  size="small"
                  onClick={() => setWarningOpen(false)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          >
            {STUDY_DETAILS_MESSAGES.partialLoad}
          </Alert>
        </Snackbar>
        <StudyDetailView data={data} initTab={match?.params?.fileType} />
      </>
    );
  }

  if (loading) return <SkeletonLoader variant="withRounded" />;

  if (!error && data?.study?.length === 0) {
    return <Studies invalid />;
  }

  return (
    <Typography
      variant="h5"
      color="error"
      size="sm"
      weight={undefined}
      colorBrightness={undefined}
      family={undefined}
    >
      {STUDY_DETAILS_MESSAGES.unavailable}
    </Typography>
  );
};

export default StudyDetailContainer;
