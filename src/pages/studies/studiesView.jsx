import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { request, gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { pageData, tableLayOut } from '../../bento/studiesData';
import Stats from '../../components/Stats/AllStatsController';
import InvalidAccesionModal from './InvalidAccesionModal';
import StudiesThemeProvider from './studiesMuiThemConfig';
import env from '../../utils/env';
import { TableContextProvider } from '../../bento-core';
import StudiesTable from '../../components/DataAvailabilityTable/StudiesTable';
import { SkeletonLoader } from '../../components/Skeleton';
import { TableContainer } from './studiesView.styled';

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

const Studies = ({ data, invalid }) => {
  const {
    data: interOpData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['studiesByProgram'],
    queryFn: async () =>
      request(env.REACT_APP_INTEROP_SERVICE_URL, studiesByProgram),
  });

  const overlay = useSelector(state =>
    state.dashboardTab ? state.dashboardTab.isOverlayOpen : false
  );

  if (isLoading) {
    return <SkeletonLoader variant="withRounded" />;
  }

  if (isError) {
    return (
      <Typography variant="h5" color="error" size="sm">
        An error has occurred in interoperability api
      </Typography>
    );
  }

  return (
    <StudiesThemeProvider>
      <Stats />
      {invalid && !overlay ? <InvalidAccesionModal /> : null}
      <TableContainer>
        <div className="container">
          <div className="header">
            <div className="logo-and-title-wrapper">
              <div className="logo">
                <img
                  src={pageData.studyListingIcon.src}
                  alt={pageData.studyListingIcon.alt}
                />
              </div>
              <div className="header-title">{pageData.table.title}</div>
            </div>
          </div>

          <div className="table-div">
            <Grid container>
              <Grid item xs={12} id="table_studies">
                <TableContextProvider>
                  <StudiesTable
                    data={data.studiesByProgram}
                    interOpData={interOpData}
                    table={pageData.table}
                    tableLayOut={tableLayOut}
                    rowsPerPage={pageData.table.numbOfRowPerPage || 10}
                  />
                </TableContextProvider>
              </Grid>
            </Grid>
          </div>
        </div>
      </TableContainer>
    </StudiesThemeProvider>
  );
};

export default withStyles({}, { withTheme: true })(Studies);
