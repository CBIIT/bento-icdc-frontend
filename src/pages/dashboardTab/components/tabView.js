import React, { useRef, useEffect } from 'react';
import {
  Grid,
  IconButton,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import { getColumns } from 'bento-components';
import SelectAllModal from './modal';
import {
  GET_FILES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
  GET_FILES_OVERVIEW_DESC_QUERY,
  GET_SAMPLES_OVERVIEW_DESC_QUERY,
  GET_CASES_OVERVIEW_DESC_QUERY,
} from '../../../bento/dashboardTabData';
import CustomDataTable from '../../../components/serverPaginatedTable/serverPaginatedTable';
import { addToCart, getCart, cartWillFull } from '../../fileCentricCart/store/cart';
import Message from '../../../components/Message';
import AddToCartAlertDialog from '../../../components/AddToCartDialog';

const getOverviewQuery = (api) => (api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_QUERY : api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_QUERY : GET_CASES_OVERVIEW_QUERY);

// Due to cypher limitation we have to send seperate query get descending list
const getOverviewDescQuery = (api) => (api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_DESC_QUERY : api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_DESC_QUERY : GET_CASES_OVERVIEW_DESC_QUERY);

const TabView = ({
  classes,
  data,
  customColumn,
  customOnRowsSelect,
  openSnack,
  disableRowSelection,
  buttonText,
  tableID,
  saveButtonDefaultStyle,
  DeactiveSaveButtonDefaultStyle,
  ActiveSaveButtonDefaultStyle,
  toggleMessageStatus,
  BottomMessageStatus,
  tabIndex,
  externalLinkIcon,
  options,
  TopMessageStatus,
  count,
  api,
  paginationAPIField,
  paginationAPIFieldDesc,
  dataKey,
  filteredSubjectIds,
  defaultSortCoulmn,
  defaultSortDirection,
  tableDownloadCSV,
}) => {
  // Get the existing files ids from  cart state
  const cart = getCart();
  const fileIDs = cart.fileIds ? cart.fileIds : [];
  const saveButton = useRef(null);
  const saveButton2 = useRef(null);
  const AddToCartAlertDialogRef = useRef();
  // Store current page selected info
  const [rowSelection, setRowSelection] = React.useState({
    selectedRowInfo: [],
    selectedRowIndex: [],
  });

  // Store current page selected info
  const [selectedIDs, setSelectedIDs] = React.useState([]);
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

  useEffect(() => {
    initSaveButtonDefaultStyle(saveButton);
    initSaveButtonDefaultStyle(saveButton2);

    if (rowSelection.selectedRowIndex.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
      updateActiveSaveButtonStyle(true, saveButton2);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
      updateActiveSaveButtonStyle(false, saveButton2);
    }
  });

  function exportFiles() {
    // Find the newly added files by comparing
    const newFileIDS = fileIDs !== null ? selectedIDs.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedIDs.length;
    if (cartWillFull(newFileIDS)) {
      // throw an alert
      setCartIsFull(true);
      AddToCartAlertDialogRef.current.open();
    } else if (newFileIDS > 0) {
      addToCart({ fileIds: selectedIDs });
      openSnack(newFileIDS);
      setSelectedIDs([]);
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
      if (rowSelection.selectedRowInfo.length > 0) {
        newSelectedRowInfo = rowSelection.selectedRowInfo.filter((key) => {
          if (displayedDataKeies.includes(key)) {
            return false;
          }
          return true;
        });
      }
    } else {
      newSelectedRowInfo = rowSelection.selectedRowInfo;
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

    setRowSelection({
      selectedRowInfo: newSelectedRowInfo,
      selectedRowIndex: newSelectedRowIndex,
    });
  }

  // Calculate the properate marginTop value for the tooltip on the top
  function tooltipStyle(text) {
    const marginTopValue = text.length > 40 ? '-148px' : '-118px';
    return { marginTop: marginTopValue };
  }

  /*
    Presist user selection
  */
  function onRowsSelect(curr, allRowsSelected, rowsSelected, displayData, selectedData) {
    rowSelectionEvent(displayData.map((d) => d.data[0]), rowsSelected);

    setSelectedIDs([...new Set(
      customOnRowsSelect(selectedData, allRowsSelected),
    )]);
    if (allRowsSelected.length === 0) {
      updateActiveSaveButtonStyle(true, saveButton);
      updateActiveSaveButtonStyle(true, saveButton2);
    } else {
      updateActiveSaveButtonStyle(false, saveButton);
      updateActiveSaveButtonStyle(false, saveButton2);
    }
  }

  // overwrite default options
  const defaultOptions = () => ({
    dataKey,
    rowsSelectedTrigger: (displayData, rowsSelected) => rowSelectionEvent(
      displayData,
      rowsSelected,
    ),
    rowsSelected: rowSelection.selectedRowIndex,
    onRowSelectionChange: onRowsSelect,
    isRowSelectable: (dataIndex) => (disableRowSelection
      ? disableRowSelection(data[dataIndex], fileIDs) : true),
  });
  const finalOptions = { ...options, ...defaultOptions() };

  return (
    <div>
      <Grid item xs={12} className={classes.saveButtonDiv}>
        <SelectAllModal />
        <AddToCartAlertDialog cartWillFull={cartIsFull} ref={AddToCartAlertDialogRef} />
        <button
          type="button"
          ref={saveButton2}
          onClick={exportFiles}
          className={classes.button}
        >
          { buttonText }
        </button>
        <IconButton aria-label="help" className={classes.helpIconButton} onMouseOver={() => toggleMessageStatus('top', 'open')} onMouseEnter={() => toggleMessageStatus('top', 'open')} onMouseLeave={() => toggleMessageStatus('top', 'close')}>
          {TopMessageStatus.src ? (
            <img
              onMouseEnter={() => toggleMessageStatus('top', 'open')}
              onMouseOver={() => toggleMessageStatus('top', 'open')}
              onFocus={() => toggleMessageStatus('top', 'open')}
              src={TopMessageStatus.src}
              alt={TopMessageStatus.alt}
              className={classes.helpIcon}
            />
          ) : (
            <HelpIcon
              className={classes.helpIcon}
              fontSize="small"
              onMouseOver={() => toggleMessageStatus('top', 'open')}
              onMouseEnter={() => toggleMessageStatus('top', 'open')}
              onFocus={() => toggleMessageStatus('top', 'open')}
            />
          )}
        </IconButton>

      </Grid>
      <Grid container>
        <Grid item xs={12} id={tableID}>
          <CustomDataTable
            data={data}
            columns={getColumns(customColumn, classes, data, externalLinkIcon)}
            options={finalOptions}
            count={count}
            overview={getOverviewQuery(api)}
            overviewDesc={getOverviewDescQuery(api)}
            paginationAPIField={paginationAPIField}
            paginationAPIFieldDesc={paginationAPIFieldDesc}
            queryCustomVaribles={{ case_ids: filteredSubjectIds }}
            defaultSortCoulmn={defaultSortCoulmn}
            defaultSortDirection={defaultSortDirection}
            tableDownloadCSV={tableDownloadCSV}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.saveButtonDivBottom}>
        <button
          type="button"
          ref={saveButton}
          onClick={exportFiles}
          className={classes.button}
        >
          { buttonText }
        </button>

        <IconButton aria-label="help" className={classes.helpIconButton} onMouseOver={() => toggleMessageStatus('bottom', 'open')} onMouseEnter={() => toggleMessageStatus('bottom', 'open')} onMouseLeave={() => toggleMessageStatus('bottom', 'close')}>
          {BottomMessageStatus.src ? (
            <img
              onMouseEnter={() => toggleMessageStatus('bottom', 'open')}
              onMouseOver={() => toggleMessageStatus('bottom', 'open')}
              onFocus={() => toggleMessageStatus('bottom', 'open')}
              src={BottomMessageStatus.src}
              alt={BottomMessageStatus.alt}
              className={classes.helpIcon}
            />
          ) : (
            <HelpIcon
              onMouseEnter={() => toggleMessageStatus('bottom', 'open')}
              onMouseOver={() => toggleMessageStatus('bottom', 'open')}
              onFocus={() => toggleMessageStatus('bottom', 'open')}
              className={classes.helpIcon}
              fontSize="small"
            />
          )}
        </IconButton>
        <div style={{ position: 'relative' }}>
          { BottomMessageStatus.isActive
            && tabIndex === BottomMessageStatus.currentTab.toString() ? (
              <div className={classes.messageBottom} style={tooltipStyle(BottomMessageStatus.text)}>
                {' '}
                <Message data={BottomMessageStatus.text} />
                {' '}
              </div>
            ) : ''}
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
  cartlink: {
    fontFamily: 'Lato',
    color: '#3E6886',
    fontSize: '12px',
    marginRight: '70px',
    textDecoration: 'none',
    borderBottom: '1px solid #3E6886',
    paddingBottom: '3px',
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
    paddingTop: '5px',
    paddingLeft: '18px',
    textAlign: 'left',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    borderRadius: '10px',
    width: '156px',
    lineHeight: '37px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#ff7f15',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '5px',
  },
  caseTableBorder: {
    borderTopColor: '#F48439',
  },
  fileTableBorder: {
    borderTopColor: '#2446C6',
  },
  sampleTableBorder: {
    borderTopColor: '#05C5CC',
  },
  messageBottom: {
    zIndex: '500',
    position: 'absolute',
    marginTop: '-148px',
    marginLeft: '-5px',
  },
  helpIcon: {
    zIndex: '600',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-5px',
  },
  tableCell1: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell2: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell3: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell4: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell5: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell6: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell7: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell8: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell9: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell10: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell11: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
  tableCell12: {
    width: (((document.documentElement.clientWidth * 0.6) / 10)),
    overflow: 'hidden',
    wordBreak: 'break-word',
    maxWidth: (((document.documentElement.clientWidth * 0.6) / 10)),
    minWidth: '160px',
  },
});

export default withStyles(styles, { withTheme: true })(TabView);
