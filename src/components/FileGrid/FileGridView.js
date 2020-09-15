import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import Snackbar from '@material-ui/core/Snackbar';
import _ from 'lodash';
import CustomFooter from './customFooter';
import { addFiles } from '../../pages/cart/store/cartAction';
import SuccessOutlinedIcon from '../../utils/SuccessOutlined';

const FileGridView = ({
  classes, data, disableRowSelection,
}) => {
  const dispatch = useDispatch();
  // Get the existing files ids from  cart state
  const fileIDs = useSelector((state) => state.cart.files);

  const downloadButton = useRef(null);

  const addFileToCartButtonm = useRef(null);

  let globalData = [];

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });

  useEffect(() => {
    // Init download button status and style
    // It may a problem that the code below always
    // set downloadButton as grey out .
    downloadButton.current.disabled = true;
    downloadButton.current.style.color = 'rgb(0, 0, 0,0.26)';
    downloadButton.current.style.backgroundColor = 'rgba(0, 0, 0, 0.12)';

    addFileToCartButtonm.current.disabled = true;
    addFileToCartButtonm.current.style.color = 'rgb(0, 0, 0,0.26)';
    addFileToCartButtonm.current.style.backgroundColor = 'rgba(0, 0, 0, 0.12)';
  });

  function onRowsSelect(curr, allRowsSelected) {
  // Change button status based on selection status
    if (allRowsSelected.length === 0) {
      downloadButton.current.disabled = true;
      downloadButton.current.style.color = '#FFFFFF';
      downloadButton.current.style.backgroundColor = 'rgba(0, 0, 0, 0.12)';

      addFileToCartButtonm.current.disabled = true;
      addFileToCartButtonm.current.style.color = '#FFFFFF';
      addFileToCartButtonm.current.style.backgroundColor = 'rgba(0, 0, 0, 0.12)';
    } else {
      downloadButton.current.disabled = false;
      downloadButton.current.style.color = '#FFFFFF';
      downloadButton.current.style.backgroundColor = '#0B3556';
      downloadButton.current.style.cursor = 'pointer';

      addFileToCartButtonm.current.disabled = false;
      addFileToCartButtonm.current.style.color = '#FFFFFF';
      addFileToCartButtonm.current.style.backgroundColor = '#C53B27';
      addFileToCartButtonm.current.style.cursor = 'pointer';
    }
  }

  function openSnack(value) {
    setsnackbarState({ open: true, value });
  }
  function closeSnack() {
    setsnackbarState({ open: false });
  }

  function fileName() {
    const date = new Date();
    const yyyy = date.getFullYear();
    let dd = date.getDate();
    let mm = (date.getMonth() + 1);

    if (dd < 10) { dd = `0${dd}`; }

    if (mm < 10) { mm = `0${mm}`; }

    const todaysDate = `${yyyy}-${mm}-${dd}`;

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) { hours = `0${hours}`; }

    if (minutes < 10) { minutes = `0${minutes}`; }

    if (seconds < 10) { seconds = `0${seconds}`; }

    return `${'ICDC Study File Manifest'} ${todaysDate} ${hours}-${minutes}-${seconds}${'.csv'}`;
  }

  function convertToCSV(jsonse) {
    const objArray = jsonse;
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    array.map((entry, index) => {
      let line = '';
      Object.keys(entry).map((keyName) => {
        if (line !== '') line += ',';
        line += entry[keyName];
        return line;
      });

      if (index === 0) {
        str = ['Study Code', 'File Name', 'File ID', 'Md5sum', 'User Comments'].join(',');
        str += `\r\n${line},${document.getElementById('multiline-user-coments').value}\r\n`;
      } else {
        str += `${line}\r\n`;
      }
      return str;
    });

    return str;
  }

  function addToCart() {
    // Find the newly added files by comparing
    const newFileIDS = fileIDs !== null ? globalData.map((d) => d.uuid).filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : globalData.map((d) => d.uuid).length;
    openSnack(newFileIDS);
    dispatch(addFiles({ files: globalData.map((d) => d.uuid) }));
  }

  function downloadJson() {
    const jsonse = JSON.stringify(globalData);
    const csv = convertToCSV(jsonse);
    const downloadData = new Blob([csv], { type: 'text/csv' });
    const JsonURL = window.URL.createObjectURL(downloadData);
    let tempLink = '';
    tempLink = document.createElement('a');
    tempLink.setAttribute('href', JsonURL);
    tempLink.setAttribute('download', fileName());
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[parseInt(i, 10)]}`;
  }

  const columns = [
    {
      name: 'studyDesignation',
      label: 'Study Designation',
      options: {
        display: false,
      },
    },
    {
      name: 'file_name',
      label: 'File Name',
      options: {
        sortDirection: 'asc',
      },
    },
    { name: 'file_type', label: 'File Type' },
    { name: 'parent', label: 'Association' },
    { name: 'file_description', label: 'Description' },
    { name: 'file_format', label: 'Format' },
    {
      name: 'file_size',
      label: 'Size',
      options: {
        customBodyRender: (bytes) => (formatBytes(bytes)),
      },
    },
    {
      name: 'uuid',
      label: 'UUID',
      options: {
        display: false,
      },
    },
    {
      name: 'md5sum',
      label: 'Md5Sum',
      options: {
        display: false,
      },
    },
  ];

  const options = () => ({
    selectableRows: true,
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: true,
    downloadOptions: {
      filename: 'tableDownload.csv',
      filterOptions: {
        useDisplayedColumnsOnly: true,
      },
    },
    viewColumns: true,
    pagination: true,
    onRowsSelect: (curr, allRowsSelected) => onRowsSelect(curr, allRowsSelected),
    isRowSelectable: (dataIndex) => disableRowSelection(data[dataIndex], fileIDs),
    customToolbarSelect: (selectedRows, displayData) => {
      const dataIndex = Object.keys(selectedRows.data).map((keyVlaue) => (
        selectedRows.data[parseInt(keyVlaue, 10)].index
      ));

      const keysToInclude = [0, 1, 7, 8];

      const selectedFiles = dataIndex.map((keyVlaue) => (
        keysToInclude.map((value) => (displayData[parseInt(keyVlaue, 10)].data[value]))
      ));

      globalData = selectedFiles.map((obj) => ({
        studyDesignation: obj[0],
        fileName: obj[1],
        uuid: obj[2],
        md5Sum: obj[3],
      }));
      return '';
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <CustomFooter
        className={classes.customFooterStyle}
        text="DOWNLOAD MANIFEST"
        label="User Comments"
        onClick={downloadJson}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
        onChangePage={(_, page) => changePage(page)}
      />
    ),
  });
  const btnStyle = {
    color: 'rgba(0, 0, 0,0.26)',
    boxShadow: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    padding: '6px 16px',
    fontSize: '0.875rem',
    minWidth: '64px',
    boxSizing: 'border-box',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    lineHeight: '1.75',
    fontWeight: '500',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: '4px',
    textTransform: 'uppercase',
  };

  const divStyle = {
    position: 'absolute',
    marginTop: '-47px',
    marginLeft: '30px',
  };

  return (
    <div className={classes.tableContainer}>
      <div className={classes.tableDiv}>
        <Grid item xs={12}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>ASSOCIATED FILES</span>
          </div>
        </Grid>
        <Grid item xs={12} id="table_associated_files">
          <Snackbar
            className={classes.snackBar}
            open={snackbarState.open}
            onClose={closeSnack}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            message={(
              <div className={classes.snackBarMessage}>
                <span className={classes.snackBarMessageIcon}>
                  <SuccessOutlinedIcon />
                  {' '}
                </span>
                <span className={classes.snackBarText}>
                  {snackbarState.value}
                  {'    '}
                  File(s) successfully
                  {' '}
                  {snackbarState.action}
                  {' '}
                  your cart
                </span>
              </div>
)}
          />
          <MUIDataTable
            data={_.cloneDeep(data)}
            columns={columns}
            options={options()}
            className={classes.tableStyle}
          />
          <div style={divStyle}>
            <button
              type="button"
              style={btnStyle}
              ref={downloadButton}
              onClick={downloadJson}
            >
              download manifest
            </button>
            {' '}
            <button
              type="button"
              style={btnStyle}
              ref={addFileToCartButtonm}
              onClick={addToCart}
            >
              Add File(s) To Your Cart
            </button>

          </div>
        </Grid>
      </div>
    </div>
  );
};

const styles = (theme) => ({

  tableWrapper: {
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    paddingTop: '30px',
    margin: 'auto auto 30px auto',
    maxWidth: '1440px',
    background: '#f3f3f4',
    paddingBottom: '30px',
  },
  tableStyle: {
    maxWidth: '1440px',
  },
  customFooterStyle: {
    background: '#f3f3f4',
  },
  tableTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff17f15',
    paddingBottom: '20px',
  },
  tableHeader: {
    paddingLeft: '32px',
    color: '#0296c9',
  },
  tableDiv: {
    maxWidth: theme.custom.maxContentWidth,
    margin: '40px auto auto auto',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },
  header: {
    paddingLeft: '32px',
    paddingRight: '32px',
    borderBottom: '#81a6b9 4px solid',
    height: '100px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
});

export default withStyles(styles, { withTheme: true })(FileGridView);
