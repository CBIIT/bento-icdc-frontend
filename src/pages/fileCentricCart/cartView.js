import React from 'react';
import {
  Grid, withStyles, Dialog, DialogActions, DialogContent, DialogContentText,
  IconButton, Link,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  getColumns, getOptions, getDefaultCustomFooter,
} from 'bento-components';
import _ from 'lodash';
import { DeleteOutline as DeleteOutlineIcon, ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
import CustomDataTable from '../../components/serverPaginatedTable/serverPaginatedTable';
import client from '../../utils/graphqlClient';
import {
  myFilesPageData,
  table,
  manifestData,
  externalLinkIcon,
  GET_MY_CART_DATA_QUERY,
  GET_MY_CART_DATA_QUERY_DESC,
} from '../../bento/fileCentricCartWorkflowData';
import { deleteFromCart } from './store/cart';
import { downloadJson } from './utils';
import Message from '../../components/Message';
import DialogThemeProvider from './dialogThemeConfig';
import TableThemeProvider from './cartTableThemeConfig';
import GA from '../../utils/googleAnalytics';

const cartView = ({
  classes, data, fileIDs = [], defaultSortCoulmn, defaultSortDirection, isLoading,
}) => {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [TopMessageStatus, setTopMessageStatus] = React.useState(false);
  const [removeAllMessageStatus, setRemoveAllMessageStatus] = React.useState(false);
  const [userComments, setUserComments] = React.useState('');
  async function fetchData() {
    const fetchResult = await client
      .query({
        query: GET_MY_CART_DATA_QUERY,
        variables: {
          first: fileIDs.length, ...{ file_ids: fileIDs },
        },
      })
      .then((result) => result.data.filesInList);
    return fetchResult;
  }

  function toggleMessageStatus(status) {
    return status === 'close' ? setTopMessageStatus(false) : setTopMessageStatus(true);
  }

  function toggleRemoveAllMessageStatus(status) {
    return status === 'close' ? setRemoveAllMessageStatus(false) : setRemoveAllMessageStatus(true);
  }

  function closeModal() {
    setModalStatus(false);
  }

  function removeSubjects() {
    setModalStatus(true);
  }
  function deleteSubjectsAndCloseModal() {
    setModalStatus(false);
    GA.sendEvent('File', 'Removed', null, `${fileIDs.length} Files`);
    deleteFromCart({ fileIds: fileIDs });
  }

  function onRowSelectionChange(curr, allRowsSelected) {
    return (curr, allRowsSelected);
  }
  async function prepareDownload() {
    const data1 = await fetchData();
    GA.sendEvent('Manifest', 'Download', 'cart');
    return downloadJson(
      data1,
      userComments,
      myFilesPageData.manifestFileName,
      manifestData,
    );
  }

  // eslint-disable-next-line no-unused-vars
  function divStyle() {
    const css = {
      position: 'absolute',
      marginTop: '-51px',
      marginLeft: '30px',
      display: 'none',
      padding: '0 16px',
    };
    if (isLoading === false) {
      css.display = 'block';
    }
    return css;
  }

  const fileIdIndex = table.columns.map((d) => d.dataField).findIndex((e) => e === 'file_uuid');

  const deleteColumn = [{
    name: 'Remove',
    label: 'Remove',
    options: {
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div className={classes.tableDeleteButtonDiv}>
          <button
            type="button"
            className={classes.tableDeleteButton}
            onClick={() => deleteFromCart({ fileIds: tableMeta.rowData[fileIdIndex] })}
          >
            <DeleteOutlineIcon fontSize="small" />
          </button>
        </div>
      ),
      customHeadRender: () => (
        <th className={classes.removeThCell}>
          <span role="button">
            <div className={classes.removeHeadCell}>
              <div
                className={classes.removeHeadCellText}
              >
                Remove
              </div>
              <div className={classes.removeHeadCellIcon}>
                <IconButton aria-label="help" className={classes.removeHeadCellIconButton}>
                  <ArrowDropDownIcon onClick={() => removeSubjects()} onMouseEnter={() => toggleRemoveAllMessageStatus('open')} onMouseLeave={() => toggleRemoveAllMessageStatus('close')} />
                </IconButton>
                { removeAllMessageStatus ? (
                  <div className={classes.removeAllMessage}>
                    {' '}
                    Remove
                    {' '}
                    <b>All</b>
                    {' '}
                    items in cart.
                    {' '}
                  </div>
                ) : ''}
              </div>
            </div>
          </span>
        </th>
      ),
    },
  }];
  const columns = getColumns(table, classes).concat(deleteColumn);
  const options = getOptions(table, classes, getDefaultCustomFooter, onRowSelectionChange);

  const messageData = (
    <span>
      {myFilesPageData.tooltipMessage}
      {' '}
    </span>
  );

  const numberOfFilesBeDeleted = myFilesPageData.popUpWindow.showNumberOfFileBeRemoved ? fileIDs.length : '';

  return (
    <Grid>
      <DialogThemeProvider>
        <Dialog
          open={modalStatus}
          onClose={() => closeModal()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.popUpWindow}
        >
          <DialogContent className={classes.popUpWindowContent}>
            <DialogContentText id="alert-dialog-description">
              { myFilesPageData.popUpWindow.messagePart1 }
              <b>
                { myFilesPageData.popUpWindow.messagePart2 }
                { numberOfFilesBeDeleted }
                { myFilesPageData.popUpWindow.messagePart3 }
              </b>
              { myFilesPageData.popUpWindow.messagePart4 }
              {' '}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" disableElevation onClick={() => deleteSubjectsAndCloseModal()} className={classes.okButton}>
              {myFilesPageData.popUpWindow.okButtonText}
            </Button>
            <Button variant="contained" disableElevation onClick={() => closeModal()} className={classes.cancelButton}>
              {myFilesPageData.popUpWindow.cancelButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      </DialogThemeProvider>
      {/* Section: Header */}
      <Grid item xs={12}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              src={myFilesPageData.headerIconSrc}
              alt={myFilesPageData.headerIconAlt}
            />

          </div>
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle}>
              <span>
                <span>{myFilesPageData.mainTitle}</span>
              </span>
              <span className={classes.headerMainSubTitle}>
                {' '}
                {' '}
                {myFilesPageData.subTitle}
              </span>
            </div>
          </div>
        </div>
      </Grid>

      {/* Section: Body */}
      <Grid item xs={12}>
        <div id="table_selected_files" className={classes.bodyWrapper}>
          <div className={classes.tableWrapper}>

            {/* Section: Table */}
            <div className={classes.tableStyle}>
              <TableThemeProvider>
                <CustomDataTable
                  data={_.cloneDeep(data)}
                  columns={columns}
                  options={options}
                  className={classes.tableStyle}
                  count={fileIDs.length || 0}
                  overview={GET_MY_CART_DATA_QUERY}
                  overviewDesc={GET_MY_CART_DATA_QUERY_DESC}
                  paginationAPIField="filesInList"
                  paginationAPIFieldDesc="filesInListDesc"
                  queryCustomVaribles={{ file_ids: fileIDs }}
                  defaultSortCoulmn={defaultSortCoulmn}
                  defaultSortDirection={defaultSortDirection}
                />
              </TableThemeProvider>
            </div>

            {/* Section: Bottom controls */}
            <div className={classes.paddingLeftRight}>
              <div className={classes.message}>
                <span>
                  To access and analyze files: select and remove unwanted files,
                  click the “Download Manifest” button, and upload the resulting
                  Manifest file to your
                  {' '}
                  <Link target="_blank" className={classes.link} href="http://www.cancergenomicscloud.org/">
                    Seven Bridges Genomics
                  </Link>
                  <img
                    src={externalLinkIcon.src}
                    alt={externalLinkIcon.alt}
                    className={classes.linkIcon}
                  />
                  {' '}
                  account.
                </span>
              </div>
              {/* Section: User Comments */}
              <div className={classes.manifestTextarea}>
                <TextField
                  id="multiline-user-coments"
                  label={myFilesPageData.textareaPlaceholder}
                  multiline
                  rows={6}
                  style={{ minWidth: '550px' }}
                  className={classes.textField}
                  margin="dense"
                  variant="filled"
                  onChange={(e) => setUserComments(e.target.value)}
                />
              </div>

              {/* Section: Button Group */}
              <div className={classes.buttonGroup}>
                <button
                  type="button"
                  className={classes.downloadButton}
                  onClick={() => prepareDownload()}
                >
                  {myFilesPageData.downButtonText}
                  {' '}
                </button>
                <IconButton aria-label="help" onFocus={() => toggleMessageStatus('top', 'open')} onMouseEnter={() => toggleMessageStatus('open')} onMouseOver={() => toggleMessageStatus('open')} onMouseLeave={() => toggleMessageStatus('close')}>
                  <img
                    onMouseEnter={() => toggleMessageStatus('open')}
                    onMouseOver={() => toggleMessageStatus('open')}
                    onFocus={() => toggleMessageStatus('top', 'open')}
                    src={myFilesPageData.tooltipIcon}
                    alt={myFilesPageData.tooltipAlt}
                    className={classes.helpIcon}
                  />
                </IconButton>
                { TopMessageStatus ? (
                  <div className={classes.messageTop}>
                    {' '}
                    <Message data={messageData} />
                    {' '}
                  </div>
                ) : ''}
              </div>
            </div>

          </div>
        </div>
      </Grid>

    </Grid>

  );
};

const styles = (theme) => ({
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '14px',
    width: '100px',
  },
  bodyWrapper: {
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
  tableWrapper: {
    maxWidth: '1440px',
    margin: '0 30px',
    backgroundColor: theme.palette.background.paper,
  },
  customFooterStyle: {
    background: '#f3f3f4',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#ff8a00',
    fontSize: '25px',
    lineHeight: '125px',
    paddingLeft: '5px',
  },
  headerMainSubTitle: {

  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },
  tableTitleWizard: {
    width: '400px',
    float: 'right',
    paddingTop: '8px',
  },
  header: {
    paddingLeft: '32px',
    paddingRight: '32px',
    borderBottom: '#81a6b9 4px solid',
    height: '100px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    marginBottom: '25px',
  },
  link: {
    color: '#dc762f',
    fontWeight: 'bolder',
    '&:hover': {
      color: '#dc762f',
    },
  },
  linkIcon: {
    color: '#dc762f',
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  helpIcon: {
    verticalAlign: 'top',
    width: '20px',
    zIndex: '600',
  },
  topButtonGroup: {
    textAlign: 'right',
    padding: '10px 43px 15px 0px',
    position: 'relative',
  },
  messageTop: {
    position: 'absolute',
    right: '33px',
    top: '-128px',
    zIndex: '400',
  },
  manifestButtonGroup: {
    marginTop: '10px',
    float: 'right',
  },
  manifestTextarea: {
    marginTop: '20px',
  },
  downloadButton: {
    height: '36px',
    minWidth: '191px',
    color: '#fff',
    boxShadow: 'none',
    backgroundColor: '#3890c5',
    padding: '6px 16px',
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    lineHeight: '1.75',
    fontWeight: '500',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: '4px',
    textTransform: 'uppercase',
    border: 'none',
    verticalAlign: 'top',
    marginTop: '6px',
  },
  popUpWindowText: {
    fontFamily: 'Lato',
    size: '16px',
  },
  okButton: {
    background: '#98A19E',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(152,161,158,0.6)',
    },
  },
  cancelButton: {
    background: '#42779A',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(66,119,154,0.6)',
    },
  },
  tableDeleteButton: {
    background: '#fff',
    border: '1px solid #ccc',
    width: '29px',
    cursor: 'pointer',
    height: '26px',
    borderRadius: '15%',
    padding: '0',
  },
  tableDeleteButtonDiv: {
  },
  removeCell: {
    cursor: 'pointer',
    display: 'inline-flex',
    outline: 'none',
  },
  removeThCell: {
    top: '0px',
    color: '#A61401',
    zIndex: '100',
    position: 'relative',
    fontSize: '11pt',
    borderTop: '#42779A 3px solid',
    fontStyle: 'normal',
    fontFamily: "'Lato Regular','Raleway', sans-serif",
    fontWeight: 'bold',
    paddingLeft: '20px',
    borderBottom: '#42779A 3px solid',
    letterSpacing: '0.06em',
    backgroundColor: '#ffffff',
    width: '120px',
    textAlign: 'center',
  },
  removeHeadCell: {
    cursor: 'pointer',
    display: 'flex',
    verticalAlign: 'top',
  },
  removeHeadCellText: {
    display: 'inline-block',
    cursor: 'default',
    lineHeight: '37px',
  },
  removeHeadCellIcon: {
    ursor: 'pointer',
    display: 'flex',
    marginTop: '1px',
    verticalAlign: 'top',
  },
  removeHeadCellIconButton: {
    color: '#A61401',
    width: '25px',
    marginTop: '5px',
    height: '25px',
  },
  removeAllMessage: {
    fontWeight: '500',
    position: 'absolute',
    top: '36px',
    right: '0',
    zIndex: '400',
    background: '#fff',
    border: '2px solid #A61401',
    borderRadius: '7px',
    fontSize: '12px',
    width: '110px',
    height: '48px',
    padding: '5px 0px',
  },
  message: {
    color: '#000000',
    fontSize: '15px',
    fontFamily: '"Open Sans", sans-serif',
    lineHeight: '22px',
    marginBottom: '5px',
  },
  paddingLeftRight: {
    padding: '0 16px',
  },
  buttonGroup: {
    paddingBottom: '10px',
  },
});
export default withStyles(styles, { withTheme: true })(cartView);
