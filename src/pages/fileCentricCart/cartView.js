import React from 'react';
import {
  Grid, withStyles,
  IconButton, Link,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { DeleteOutline as DeleteOutlineIcon, ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
import { ToolTip as Tooltip } from 'bento-components';
import CartBody from './components/body/cartBody';
import CartHeader from './components/header/cartHeader';
import DialogBox from './components/dialogBox/dialogBox';
import Styles from './cartView.style';
import client from '../../utils/graphqlClient';
import {
  myFilesPageData,
  table,
  manifestData,
  externalLinkIcon,
  GET_MY_CART_DATA_QUERY,
} from '../../bento/fileCentricCartWorkflowData';
import { deleteFromCart } from './store/cart';
import { downloadJson } from './utils';
import GA from '../../utils/googleAnalytics';

const cartView = ({
  classes, data, fileIDs = [], defaultSortCoulmn, defaultSortDirection, isLoading, tableDownloadCSV,
}) => {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [removeAllMessageStatus, setRemoveAllMessageStatus] = React.useState(false);
  const [userComments, setUserComments] = React.useState('');
  async function fetchData() {
    const fetchResult = await client
      .query({
        query: GET_MY_CART_DATA_QUERY,
        variables: {
          first: fileIDs.length, ...{ uuids: fileIDs },
        },
      })
      .then((result) => result.data.filesInList);
    return fetchResult;
  }

  function toggleRemoveAllMessageStatus(status) {
    return status === 'close' ? setRemoveAllMessageStatus(false) : setRemoveAllMessageStatus(true);
  }

  // ================= Dialogbox Functions =================
  const closeDialogBox = () => setModalStatus(false);
  const openDialogBox = () => setModalStatus(true);

  function deleteSubjectsAndCloseModal() {
    closeDialogBox(false);
    GA.sendEvent('File', 'Removed', null, `${fileIDs.length} Files`);
    deleteFromCart({ fileIds: fileIDs });
  }

  // =========== Downlaod Manifest Functions ===========
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
                  <ArrowDropDownIcon onClick={() => openDialogBox()} onMouseEnter={() => toggleRemoveAllMessageStatus('open')} onMouseLeave={() => toggleRemoveAllMessageStatus('close')} />
                </IconButton>
                {removeAllMessageStatus ? (
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

  const numberOfFilesBeDeleted = myFilesPageData.popUpWindow.showNumberOfFileBeRemoved ? fileIDs.length : '';

  const toolTipIcon = ({ title, placement }) => (
    <Tooltip arrow title={title} placement={placement}>
      <IconButton className={classes.helpBtn} aria-label="help">
        <img
          src={myFilesPageData.tooltipIcon}
          alt={myFilesPageData.tooltipAlt}
          className={classes.helpIcon}
        />
      </IconButton>
    </Tooltip>
  );

  return (
    <Grid className={classes.marginTopNegative20}>
      {/* Section: DialogBox */}
      <DialogBox
        isOpen={modalStatus}
        acceptAction={deleteSubjectsAndCloseModal}
        closeModal={closeDialogBox}
        messageData={myFilesPageData.popUpWindow}
        numberOfFilesBeDeleted={numberOfFilesBeDeleted}
      />

      {/* Section: Header */}
      <Grid item xs={12} className={[classes.headerGrid, classes.paddingBottom40]}>
        <CartHeader
          headerIconSrc={myFilesPageData.headerIconSrc}
          headerIconAlt={myFilesPageData.headerIconAlt}
          mainTitle={myFilesPageData.mainTitle}
          subTitle={myFilesPageData.subTitle}
        />
      </Grid>

      {/* Section: Body */}
      <Grid item xs={12}>
        <div id="table_selected_files" className={classes.bodyWrapper}>
          <div className={classes.tableWrapper}>

            {/* Section: Table */}
            <CartBody
              data={data}
              deleteColumn={deleteColumn}
              fileIDs={fileIDs}
              defaultSortCoulmn={defaultSortCoulmn}
              defaultSortDirection={defaultSortDirection}
              tableDownloadCSV={tableDownloadCSV}
            />

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
                {toolTipIcon({ title: myFilesPageData.userCommentsTooltipMessage, placement: 'right' })}
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
                {toolTipIcon({ title: myFilesPageData.downloadBtnTooltipMessage, placement: 'right' })}
              </div>
            </div>

          </div>
        </div>
      </Grid>

    </Grid>

  );
};

export default withStyles(Styles, { withTheme: true })(cartView);
