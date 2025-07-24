import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { pageData, tableLayOut } from '../../bento/studiesData';
import Stats from '../../components/Stats/AllStatsController';
import InvalidAccesionModal from './InvalidAccesionModal';
import StudiesThemeProvider from './studiesMuiThemConfig';
import { TableContextProvider } from '../../bento-core';
import StudiesTable from '../../components/DataAvailabilityTable/StudiesTable';
import { TableContainer } from './studiesView.styled';

const Studies = ({ data, invalid, interOpData }) => {
  const overlay = useSelector(state =>
    state.dashboardTab ? state.dashboardTab.isOverlayOpen : false
  );

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
