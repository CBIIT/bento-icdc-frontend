import React, { useRef, useEffect } from 'react';
// import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {
  // Badge,
  Grid,
  IconButton,
  // Typography,
  withStyles,
  Link,
} from '@material-ui/core';
// import { Link } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import { getColumns, ToolTip as Tooltip, cn } from 'bento-components';
import _ from 'lodash';
import SelectAllModal from './modal';
import {
  GET_FILES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
  tooltipContent,
  // multiStudyData,
  tabContainers,
} from '../../../bento/dashboardTabData';
import {
  clearTableSelections,
  fetchAllFileIDs,
  getFilesCount,
  getState,
} from '../store/dashboardReducer';
import CustomDataTable from '../../../components/serverPaginatedTable/serverPaginatedTable';
import { addToCart, getCart, cartWillFull } from '../../fileCentricCart/store/cart';
import AddToCartAlertDialog from '../../../components/AddToCartDialog';
import updateColumns, { hasMultiStudyParticipants } from '../../../utils/columnsUtil';
import DocumentDownload from '../../../components/DocumentDownload';
import ViewJBrowseButton from '../../JbrowseDetail/components/JBrowseViewBtn';
import MultiStudyToolTip from './multiStudyTooltip';
import styles from './tabStyle';

const getOverviewQuery = (api) => (api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_QUERY : api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_QUERY : GET_CASES_OVERVIEW_QUERY);

// const StyledBadge = withStyles(() => ({
//   badge: {
//     border: '2px solid #A7AFB3',
//     backgroundColor: '#FFF',
//     color: '#000',
//     height: '17px',
//     width: '13px',
//     borderRadius: '100%',
//     fontSize: '8px',
//     fontFamily: 'Open Sans',
//     fontWeight: '700',
//     top: 3,
//     right: 5,
//     padding: '0px',
// eslint-disable-next-line max-len
//     boxShadow: '0px 8px 17px 2px rgba(0,0,0,0.14) , 0px 3px 14px 2px rgba(0,0,0,0.12) , 0px 5px 5px -3px rgba(0,0,0,0.2) ',
//   },
//   root: {
//     marginTop: '5px',
//   },
// }))(Badge);

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
  fileLevel,
  displayViewJBowseBtn,
  disableViewJBowseBtn,
  paginationAPIField,
  paginationAPIFieldDesc,
  dataKey,
  allFilters,
  filteredFileIds,
  filteredStudyFileIds,
  defaultSortCoulmn,
  defaultSortDirection,
  tableDownloadCSV,
  primaryKeyIndex = 0,
  setRowSelection,
  selectedRowInfo = [],
  selectedRowIndex = [],
  // eslint-disable-next-line no-unused-vars
  tableHasSelections,
  unifiedViewFlag,
  unifiedViewCaseIds,
  tabIndex,
  // association,
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

  async function updateButtonStatus(status) {
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
    updateButtonStatus(selectedRowInfo.length > 0);
  });

  async function exportFiles() {
    const selectedIDs = await fetchAllFileIDs(getFilesCount(), selectedRowInfo);

    // Find the newly added files by comparing
    const selectFileIds = ((tabIndex === 3) && filteredStudyFileIds !== null)
      ? selectedIDs.filter((x) => filteredStudyFileIds.includes(x))
      : ((tabIndex === 2) && filteredFileIds != null)
        ? selectedIDs.filter((x) => filteredFileIds.includes(x)) : selectedIDs;

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

    // check if displayed data is equal
    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    const { currentActiveTab, dataStudyFileSelected, dataFileSelected } = getState();
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
      if (newSelectedRowInfo.length === 0
        && dataFileSelected.selectedRowInfo.length === 0) {
        setRowSelection({
          selectedRowInfo: newSelectedRowInfo,
          selectedRowIndex: newSelectedRowIndex,
        });
      }

      if ((currentActiveTab === tabContainers[0].name
        || currentActiveTab === tabContainers[1].name)
        && !isEqual(newSelectedRowInfo, dataFileSelected.selectedRowInfo)
        && !isEqual(newSelectedRowInfo, dataStudyFileSelected.selectedRowInfo)) {
        setRowSelection({
          selectedRowInfo: newSelectedRowInfo,
          selectedRowIndex: newSelectedRowIndex,
        });
      }

      if (currentActiveTab === tabContainers[2].name
        && (!isEqual(newSelectedRowInfo, dataStudyFileSelected.selectedRowInfo)
        || newSelectedRowInfo.length === 0)) {
        setRowSelection({
          selectedRowInfo: newSelectedRowInfo,
          selectedRowIndex: newSelectedRowIndex,
        });
      }

      if (currentActiveTab === tabContainers[3].name
        && !isEqual(newSelectedRowInfo, dataFileSelected.selectedRowInfo)) {
        setRowSelection({
          selectedRowInfo: newSelectedRowInfo,
          selectedRowIndex: newSelectedRowIndex,
        });
      }
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

  const customLink = (path, column, value, tableMeta) => (
    <div className={classes.caseIdContainer} style={{ display: 'flex' }}>
      <div>
        <Link href={`/#${path}/${value}`}>
          {value}
        </Link>
      </div>
      {
        (column.dataField === 'case_id' && !unifiedViewFlag)
        && hasMultiStudyParticipants(tableMeta.rowData[1])
        && (
          <>
            <MultiStudyToolTip
              tableMeta={tableMeta.rowData[1]}
              value={value}
            />
          </>
        )
      }
    </div>
  );

  const getPath = (dataField) => (dataField === 'case_id' ? '/case' : '/study');

  // const flag = true;
  const getTabColumns = ({ columns }) => columns.map((column) => ({
    name: column.dataField,
    label: column.header,
    options: {
      display: column.display,
      viewColumns: column.viewColumns,
      customBodyRender: (value, tableMeta) => (
        <>
          { (column.link) ? customLink(getPath(column.dataField),
            column, value, tableMeta) : value }
        </>
      ),
    },
  }));

  const columns = (customColumn.name === 'Cases') ? getTabColumns(customColumn)
    : updateColumns(getColumns(customColumn, classes, data, externalLinkIcon, '', () => {}, DocumentDownload), customColumn.columns);

  return (
    <div>
      <Grid item xs={12} className={classes.saveButtonDiv}>
        <SelectAllModal
          openSnack={openSnack}
          addAllButtonText={addAllButtonText}
          toggleMessageStatus={toggleMessageStatus}
          selectAllToolTipStatus={selectAllToolTipStatus}
          tabIndex={tabIndex}
          unifiedViewFlag={unifiedViewFlag}
          unifiedViewCaseIds={unifiedViewCaseIds}
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
        { displayViewJBowseBtn
          && (
          <ViewJBrowseButton
            customClass={classes.helpIcon}
            disable={disableViewJBowseBtn}
          />
          )}
      </Grid>
      <Grid container>
        <Grid item xs={12} id={tableID}>
          <CustomDataTable
            data={data}
            columns={columns}
            options={finalOptions}
            count={count}
            fileLevel={fileLevel}
            overview={getOverviewQuery(api)}
            paginationAPIField={paginationAPIField}
            paginationAPIFieldDesc={paginationAPIFieldDesc}
            queryCustomVaribles={allFilters}
            defaultSortCoulmn={defaultSortCoulmn}
            defaultSortDirection={defaultSortDirection}
            tableDownloadCSV={tableDownloadCSV}
            unifiedViewFlag={unifiedViewFlag}
            unifiedViewCaseIds={unifiedViewCaseIds}
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
          className={cn(classes.button, classes.bottomBtn)}
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
        { displayViewJBowseBtn
          && (
          <ViewJBrowseButton
            customClass={classes.helpIcon}
            disable={disableViewJBowseBtn}
          />
          )}
        <div style={{ position: 'relative' }}>
          <Link
            rel="noreferrer"
            href="/#/fileCentricCart"
            color="inherit"
            className={classes.cartlink}
          >
            Go to My Files
            {' '}
            {'>'}
          </Link>
        </div>
        <div className={classes.spacer} />

      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(TabView);
