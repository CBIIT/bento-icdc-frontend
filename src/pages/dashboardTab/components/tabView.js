import React, { useRef, useEffect } from 'react';
import {
  Badge,
  Grid,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import { getColumns, ToolTip as Tooltip } from 'bento-components';
import _ from 'lodash';
import SelectAllModal from './modal';
import {
  GET_FILES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
  GET_FILES_OVERVIEW_DESC_QUERY,
  GET_SAMPLES_OVERVIEW_DESC_QUERY,
  GET_CASES_OVERVIEW_DESC_QUERY,
  tooltipContent,
  multiStudyData,
} from '../../../bento/dashboardTabData';
import { clearTableSelections, fetchAllFileIDs, getFilesCount } from '../store/dashboardReducer';
import CustomDataTable from '../../../components/serverPaginatedTable/serverPaginatedTable';
import { addToCart, getCart, cartWillFull } from '../../fileCentricCart/store/cart';
import AddToCartAlertDialog from '../../../components/AddToCartDialog';
import updateColumns, { hasMultiStudyParticipants } from '../../../utils/columnsUtil';
import DocumentDownload from '../../../components/DocumentDownload';

const getOverviewQuery = (api) => (api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_QUERY : api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_QUERY : GET_CASES_OVERVIEW_QUERY);

// Due to cypher limitation we have to send seperate query get descending list
const getOverviewDescQuery = (api) => (api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_DESC_QUERY : api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_DESC_QUERY : GET_CASES_OVERVIEW_DESC_QUERY);

const StyledBadge = withStyles(() => ({
  badge: {
    border: '2px solid #A7AFB3',
    backgroundColor: '#FFF',
    color: '#000',
    height: '17px',
    width: '13px',
    borderRadius: '100%',
    fontSize: '8px',
    fontFamily: 'Open Sans',
    fontWeight: '700',
    top: 3,
    right: 5,
    padding: '0px',
    boxShadow: '0px 8px 17px 2px rgba(0,0,0,0.14) , 0px 3px 14px 2px rgba(0,0,0,0.12) , 0px 5px 5px -3px rgba(0,0,0,0.2) ',
  },
  root: {
    marginTop: '5px',
  },
}))(Badge);

const TabView = ({
  classes,
  data,
  customColumn,
  openSnack,
  disableRowSelection,
  buttonText,
  addAllButtonText,
  tableID,
  saveButtonDefaultStyle,
  DeactiveSaveButtonDefaultStyle,
  ActiveSaveButtonDefaultStyle,
  toggleMessageStatus,
  BottomMessageStatus,
  selectAllToolTipStatus,
  externalLinkIcon,
  options,
  TopMessageStatus,
  count,
  api,
  paginationAPIField,
  paginationAPIFieldDesc,
  dataKey,
  filteredSubjectIds,
  filteredSampleIds,
  filteredFileIds,
  defaultSortCoulmn,
  defaultSortDirection,
  tableDownloadCSV,
  primaryKeyIndex = 0,
  setRowSelection,
  selectedRowInfo = [],
  selectedRowIndex = [],
  tableHasSelections,
  unifiedViewFlag,
  tabIndex,
}) => {
  // Get the existing files ids from  cart state
  const cart = getCart();

  const fileIDs = cart.fileIds ? cart.fileIds : [];
  const saveButton = useRef(null);
  const saveButton2 = useRef(null);
  const AddToCartAlertDialogRef = useRef();

  const [cartIsFull, setCartIsFull] = React.useState(false);

  const buildButtonStyle = (button, styleObject) => {
    const styleKV = Object.entries(styleObject);
    // eslint-disable-next-line  no-restricted-syntax, no-unused-vars
    for (const [key, value] of styleKV) {
      // eslint-disable-next-line no-param-reassign
      button.current.style[key] = value;
    }
  };
  const initSaveButtonDefaultStyle = (button) => {
    // eslint-disable-next-line no-param-reassign
    button.current.disabled = true;
    buildButtonStyle(button, saveButtonDefaultStyle);
  };

  const updateActiveSaveButtonStyle = (flag, button) => {
    if (flag) {
      // eslint-disable-next-line no-param-reassign
      button.current.disabled = true;
      buildButtonStyle(button, DeactiveSaveButtonDefaultStyle);
    } else {
      // eslint-disable-next-line no-param-reassign
      button.current.disabled = false;
      buildButtonStyle(button, ActiveSaveButtonDefaultStyle);
    }
  };
  async function updateButtonStatus() {
    const status = await tableHasSelections();
    if (!status) {
      updateActiveSaveButtonStyle(true, saveButton);
      updateActiveSaveButtonStyle(true, saveButton2);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
      updateActiveSaveButtonStyle(false, saveButton2);
    }
  }

  useEffect(() => {
    initSaveButtonDefaultStyle(saveButton);
    initSaveButtonDefaultStyle(saveButton2);
    updateButtonStatus();
  });

  async function exportFiles() {
    const selectedIDs = await fetchAllFileIDs(getFilesCount(), selectedRowInfo);
    // Find the newly added files by comparing
    const selectFileIds = filteredFileIds != null
      ? selectedIDs.filter((x) => filteredFileIds.includes(x))
      : selectedIDs;
    const newFileIDS = fileIDs !== null ? selectFileIds.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedIDs.length;
    if (cartWillFull(newFileIDS)) {
      // throw an alert
      setCartIsFull(true);
      AddToCartAlertDialogRef.current.open();
    } else if (newFileIDS > 0) {
      addToCart({ fileIds: selectFileIds });
      openSnack(newFileIDS);
      // tell the reducer to clear the selection on the table.
      clearTableSelections();
    } else if (newFileIDS === 0) {
      openSnack(newFileIDS);
      // tell the reducer to clear the selection on the table.
      clearTableSelections();
    }
  }

  function rowSelectionEvent(displayData, rowsSelected) {
    const displayedDataKeies = displayData;
    const selectedRowsKey = rowsSelected
      ? rowsSelected.map((index) => displayedDataKeies[index])
      : [];
    let newSelectedRowInfo = [];

    if (rowsSelected) {
      // Remove the rowInfo from selectedRowInfo if this row currently be
      // displayed and not be selected.
      if (selectedRowInfo.length > 0) {
        newSelectedRowInfo = selectedRowInfo.filter((key) => {
          if (displayedDataKeies.includes(key)) {
            return false;
          }
          return true;
        });
      }
    } else {
      newSelectedRowInfo = selectedRowInfo;
    }
    newSelectedRowInfo = newSelectedRowInfo.concat(selectedRowsKey);

    // Get selectedRowIndex by comparing current page data with selected row's key.
    // if rowInfo from selectedRowInfo is currently be displayed
    const newSelectedRowIndex = displayedDataKeies.reduce(
      (accumulator, currentValue, currentIndex) => {
        if (newSelectedRowInfo.includes(currentValue)) {
          accumulator.push(currentIndex);
        }
        return accumulator;
      }, [],
    );

    // reduce the state chagne, when newSelectedRowIndex and newSelectedRowInfo is same as previous.
    if (_.differenceWith(
      newSelectedRowIndex,
      selectedRowIndex,
      _.isEqual,
    ).length !== 0
      || _.differenceWith(
        newSelectedRowInfo,
        selectedRowInfo,
        _.isEqual,
      ).length !== 0
      || _.differenceWith(
        selectedRowInfo,
        newSelectedRowInfo,
        _.isEqual,
      ).length !== 0
      || _.differenceWith(
        selectedRowIndex,
        newSelectedRowIndex,
        _.isEqual,
      ).length !== 0) {
      setRowSelection({
        selectedRowInfo: newSelectedRowInfo,
        selectedRowIndex: newSelectedRowIndex,
      });
    }
  }

  /*
    Presist user selection
  */
  function onRowsSelect(curr, allRowsSelected, rowsSelected, displayData) {
    rowSelectionEvent(displayData.map((d) => d.data[primaryKeyIndex]), rowsSelected);
  }

  // overwrite default options
  const defaultOptions = () => ({
    dataKey,
    rowsSelectedTrigger: (displayData, rowsSelected) => rowSelectionEvent(
      displayData,
      rowsSelected,
    ),
    rowsSelected: selectedRowIndex,
    onRowSelectionChange: onRowsSelect,
    isRowSelectable: (dataIndex) => (disableRowSelection
      ? disableRowSelection(data[dataIndex], fileIDs) : true),
  });
  const finalOptions = {
    ...options,
    ...defaultOptions(),
    serverTableRowCount: selectedRowInfo.length,
  };

  /**
 * Returns a string version of the unified view data to be passed through
 * the url.
 * @return {json}
 */
  const stringyfyData = (dataObj) => JSON.stringify(dataObj);

  const renderMultiStudyTooltipText = (tableMeta, value) => {
    const cases = [...tableMeta, value];
    const caseID = value;
    return (
      <>
        <Typography align="center" color="inherit" className={classes.descripText}>
          {multiStudyData.toolTipText}
        </Typography>

        <div className={classes.casesText}>
          {tableMeta.map((elem, elemIdx) => (
            <ul className={classes.ul} key={elemIdx}>
              <li>
                <Link className={classes.link} to={`case/${elem}`}>
                  <Typography align="center" className={classes.multiStudyTooltip}>
                    {`Case: ${elem}`}
                  </Typography>
                </Link>
              </li>
            </ul>
          ))}

          <div className={classes.dashboardLink}>
            <Link
              rel="noreferrer"
              color="inherit"
              to={{
                pathname: `/unifiedView/${stringyfyData({ ...cases, caseID })}`,
              }}
              className={classes.link}
            >
              <Typography align="center" className={classes.multiStudyTooltip}>
                View All Related Cases via Dashboard
              </Typography>
            </Link>
          </div>

        </div>
      </>
    );
  };

  const toolTipIcon = (tableMeta, value) => (
    <Tooltip
      title={renderMultiStudyTooltipText(tableMeta, value)}
      placement="bottom"
      interactive
      classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }}
    >
      <StyledBadge
        badgeContent={tableMeta.length + 1}
      >
        <img
          src={multiStudyData.icon}
          className={classes.multiStudyIcon}
          alt={multiStudyData.alt}
        />
      </StyledBadge>
    </Tooltip>
  );

  const customCaseIdLink = (column, value, tableMeta) => (
    <div className={classes.caseIdContainer}>
      <Link className={classes.link} to={`case/${value}`}>
        {value}
      </Link>
      {
        hasMultiStudyParticipants(tableMeta.rowData[1])
        && toolTipIcon(tableMeta.rowData[1], value)
      }
    </div>
  );

  // const flag = true;
  const columns = updateColumns(getColumns(customColumn, classes, data, externalLinkIcon, '', () => {}, DocumentDownload).map((column, index) => {
    if (column.name === 'case_id' && index === 0) {
      return {
        name: column.name,
        label: column.label,
        options: {
          display: true,
          viewColumns: column.viewColumns,
          customBodyRender: (value, tableMeta) => (
            <>
              {customCaseIdLink(column, value, tableMeta)}
            </>
          ),
        },
      };
    }
    return column;
  }),
  customColumn.columns);

  const unifiedViewColumns = updateColumns(getColumns(customColumn, classes, data, externalLinkIcon, '', () => {}, DocumentDownload), customColumn.columns);

  return (
    <div>
      <Grid item xs={12} className={classes.saveButtonDiv}>
        <SelectAllModal
          openSnack={openSnack}
          addAllButtonText={addAllButtonText}
          toggleMessageStatus={toggleMessageStatus}
          selectAllToolTipStatus={selectAllToolTipStatus}
          tabIndex={tabIndex}
        />
        <AddToCartAlertDialog cartWillFull={cartIsFull} ref={AddToCartAlertDialogRef} />
        <button
          type="button"
          ref={saveButton2}
          onClick={exportFiles}
          className={classes.button}
        >
          {buttonText}
        </button>
        <Tooltip title={tooltipContent[tabIndex]} arrow placement="bottom">
          <IconButton
            aria-label="help"
            className={classes.helpIconButton}
          >
            {TopMessageStatus.src ? (
              <img
                src={TopMessageStatus.src}
                alt={TopMessageStatus.alt}
                className={classes.helpIcon}
              />
            ) : (
              <HelpIcon
                className={classes.helpIcon}
                fontSize="small"
              />
            )}
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid container>
        <Grid item xs={12} id={tableID}>
          <CustomDataTable
            data={data}
            columns={unifiedViewFlag ? unifiedViewColumns : columns}
            options={finalOptions}
            count={count}
            overview={getOverviewQuery(api)}
            overviewDesc={getOverviewDescQuery(api)}
            paginationAPIField={paginationAPIField}
            paginationAPIFieldDesc={paginationAPIFieldDesc}
            queryCustomVaribles={{
              case_ids: filteredSubjectIds,
              sample_ids: filteredSampleIds,
              file_uuids: filteredFileIds,
            }}
            defaultSortCoulmn={defaultSortCoulmn}
            defaultSortDirection={defaultSortDirection}
            tableDownloadCSV={tableDownloadCSV}
            components={{
              Tooltip,
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.saveButtonDivBottom}>
        <button
          type="button"
          ref={saveButton}
          onClick={exportFiles}
          className={[classes.button, classes.bottomBtn].join(' ')}
        >
          {buttonText}
        </button>
        <Tooltip title={tooltipContent[tabIndex]} arrow placement="bottom">
          <IconButton
            aria-label="help"
            className={classes.helpIconButton}
          >
            {BottomMessageStatus.src ? (
              <img
                src={BottomMessageStatus.src}
                alt={BottomMessageStatus.alt}
                className={classes.helpIcon}
              />
            ) : (
              <HelpIcon
                className={classes.helpIcon}
                fontSize="small"
              />
            )}
          </IconButton>
        </Tooltip>
        <div style={{ position: 'relative' }}>
          <Link
            rel="noreferrer"
            to={(location) => ({ ...location, pathname: '/fileCentricCart' })}
            color="inherit"
            className={classes.cartlink}
          >
            Go to Cart
            {' '}
            {'>'}
          </Link>
        </div>

      </Grid>
    </div>
  );
};

const styles = () => ({

  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  descripText: {
    fontWeight: '600',
    fontSize: '16px',
  },
  multiStudyTooltip: {
    fontSize: '18px',
  },
  customTooltip: {
    borderRadius: '5%',
    padding: 'auto',
    maxWidth: '250px',
  },
  dashboardLink: {
    padding: 'auto',
  },
  casesText: {
    marginTop: '-10px',
  },
  cartlink: {
    fontFamily: 'Lato',
    color: '#3E6886',
    fontSize: '12px',
    marginLeft: '55px',
    textDecoration: 'none',
    borderBottom: '1px solid #3E6886',
    // paddingBottom: '3px',
  },
  caseTitle: {
    color: '#194563',
    fontSize: '25.2pt',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    letterSpacing: '0.025em',
    backgroundColor: '#f5f5f5',
    padding: '10px 32px 8px 28px',
  },
  chips: {
    position: 'absolute',
    marginLeft: '250px',
    marginTop: '36px',
    zIndex: '999',
  },
  chipRoot: {
    color: '#ffffff',
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '0.075em',
    marginLeft: '10px',
    backgroundColor: '#9b9b9b',
    fontSize: '9pt',
  },
  chipDeleteIcon: {
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
    },
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
  saveButtonDiv: {
    paddingTop: '5px',
    paddingLeft: '18px',
    textAlign: 'left',
  },
  saveButtonDivBottom: {
    marginTop: '-2px',
    paddingLeft: '18px',
    textAlign: 'left',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    borderRadius: '10px',
    width: '156px',
    lineHeight: '37px',
    fontSize: '16px',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#ff7f15',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '5px',
  },
  bottomBtn: {
    marginTop: '13px',
    marginBottom: '8px',
  },
  messageBottom: {
    zIndex: '500',
    position: 'absolute',
    marginTop: '-148px',
    marginLeft: '-5px',
  },
  helpIcon: {
    zIndex: '600',
    width: '17px',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-5px',
  },
  multiStudyIcon: {
    width: '34px',
    height: '24px',
  },
  badge: {
    // borderRadius: '13px',
  },
  caseIdContainer: {
    display: 'flex',
  },
  ul: {
    listStyleType: 'none',
    padding: '0px',
  },
});

export default withStyles(styles, { withTheme: true })(TabView);
