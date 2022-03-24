import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  CustomDataTable,
  getOptions,
  manipulateLinks,
  ToolTip as Tooltip,
} from 'bento-components';
import { useSelector } from 'react-redux';
import {
  pageData, textLabels,
} from '../../bento/studiesData';
import Stats from '../../components/Stats/AllStatsController';
import { navigatedToDashboard } from '../../utils/utils';
import { studyDisposition } from '../study/utils';
import pendingFileIcon from '../../assets/icons/PendingRelease-icons.Studies-Listing.svg';
import InvalidAccesionModal from './InvalidAccesionModal';
import StudiesThemeProvider from './studiesMuiThemConfig';

const Studies = ({ classes, data, invalid }) => {
  const overlay = useSelector((state) => (
    state.dashboardTab
      ? state.dashboardTab.isOverlayOpen : false));

  const tableOptions = getOptions(pageData.table, classes);
  const embargoToolTipIcon = () => (
    <Tooltip title="Under Embargo" arrow placement="bottom">
      <img src={pageData.embargoFileIcon} className={classes.embargoFileIcon} alt="icdc embargo file icon" />
    </Tooltip>
  );

  const pendingToolTipIcon = () => (
    <Tooltip title="Release Pending" arrow placement="bottom">
      <img src={pendingFileIcon} className={classes.embargoFileIcon} alt="icdc embargo file icon" />
    </Tooltip>
  );

  /**
 * Conditionally returns a tooltip based on study disposition.
 * @param {String} param
 * @return {function}
 */
  const renderSwitch = (param) => {
    switch (param) {
      case 'embargo':
        return embargoToolTipIcon();
      case 'pending':
        return pendingToolTipIcon();
      default:
        return false;
    }
  };

  const customStudyCodeLink = (column, value, tableMeta) => (
    <>
      <Link className={classes.link} to={`${column.actualLink}${tableMeta.rowData[column.actualLinkId]}`}>
        {value}
      </Link>
      {
        column.header !== 'Program' && renderSwitch(studyDisposition(tableMeta.rowData[5]))
      }
    </>
  );

  const customCaseNumbLink = (column, value, tableMeta) => (
    renderSwitch(studyDisposition(tableMeta.rowData[5]))
      ? (
        renderSwitch(studyDisposition(tableMeta.rowData[5]))
      ) : (
        <Link
          className={classes.buttonCaseNumb}
          to={(location) => ({ ...location, pathname: '/explore' })}
          onClick={() => navigatedToDashboard(tableMeta.rowData[0], 'Cases')}
        >
          {value}
        </Link>
      )
  );

  const updatedTableWithLinks = manipulateLinks([
    ...pageData.table.columns,
    ...pageData.table.optionalColumns,
  ]);

  const columns = updatedTableWithLinks.map((column) => ({
    name: column.dataField,
    label: column.header,
    options: {
      display: column.display,
      viewColumns: column.viewColumns,
      customBodyRender: (value, tableMeta) => (
        <>
          {
            column.internalLink ? (
              column.totalNumberOfCases ? customCaseNumbLink(column, value, tableMeta)
                : customStudyCodeLink(column, value, tableMeta)
            )
              : (
                (`${value}` !== 'null') ? `${value}` : ''
              )
          }
        </>
      ),
    },
  }));

  return (
    <StudiesThemeProvider>
      <Stats />
      {
        invalid && !overlay ? (
          <InvalidAccesionModal />
        ) : null
    }
      <div className={classes.tableContainer}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={pageData.studyListingIcon.src}
                alt={pageData.studyListingIcon.alt}
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span className={classes.headerMainTitle}>{pageData.table.title}</span>
              </div>
            </div>
          </div>

          <div className={classes.tableDiv}>
            <Grid container>
              <Grid item xs={12} id="table_studies">
                <CustomDataTable
                  data={data[pageData.table.dataField]}
                  columns={columns}
                  options={{ ...tableOptions, ...textLabels }}
                  components={{
                    Tooltip,
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>

      </div>
    </StudiesThemeProvider>
  );
};

const styles = (theme) => ({
  link: {
    textDecoration: 'underline',
    fontFamily: 'Open Sans',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#DC762F',
    lineSpacing: '19pt',
    float: 'left',
    marginRight: '5px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  embargoFileIcon: {
    width: '20px',
  },
  embargoToolTip: {
    visibility: 'hidden',
    fontWeight: '500',
    zIndex: '400',
    background: '#fff',
    border: '2px solid #A61401',
    borderRadius: '7px',
    fontSize: '12px',
    width: '110px',
    padding: '5px 0px 0px 2px',
    marginTop: '-30px',
    marginLeft: '-100px',
  },
  embargoToolTipMsgLeft: {

  },
  embargoToolTipMsgRight: {
  },
  buttonCaseNumb: {
    background: 'none!important',
    fontFamily: 'Open Sans',
    fontSize: '15px',
    border: 'none',
    lineSpacing: '19pt',
    padding: '0!important',
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: '#DC762F',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    background: 'none!important',
    border: 'none',
    padding: '0!important',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#DC762F',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    margin: 'auto',
    paddingLeft: '27px',
    paddingRight: '27px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#eee',
  },
  header: {
    background: '#eee',
    paddingLeft: '35px',
    paddingRight: '50px',
    borderBottom: '#004c73 10px solid',
    height: '155px',
    paddingTop: '70px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilyRaleway,
    fontWeight: '500',
    letterSpacing: '0.025em',
    color: '#0296c9',
    fontSize: '28px',
    position: 'absolute',
    marginTop: '12px',
    marginLeft: '10px',
    lineHeight: '25px',
  },

  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    width: '83px',
    zIndex: '10',
  },
  tableContainer: {
    background: '#eee',
    paddingBottom: '50px',
  },
  tableDiv: {
    margin: 'auto',
    fontSize: '10pt',
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '0.025em',
    textAlign: 'left',
  },
});

export default withStyles(styles, { withTheme: true })(Studies);
