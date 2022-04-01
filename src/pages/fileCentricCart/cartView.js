import React from 'react';
import {
  Grid, withStyles,
  IconButton,
} from '@material-ui/core';
import { DeleteOutline as DeleteOutlineIcon, ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
import CartBody from './components/body/cartBody';
import CartHeader from './components/header/cartHeader';
import CartFooter from './components/footer/cartFooter';
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

const CustomHeaderRemove = ({
  openDialogBox,
  classes: {
    removeThCell,
    removeHeadCell,
    removeAllMessage,
    removeHeadCellText,
    removeHeadCellIcon,
    removeHeadCellIconButton,
  },
}) => {
  const [popUpStatus, setPopUpStatus] = React.useState(false);
  const showPopUp = (status) => setPopUpStatus(status === 'open');

  return (
    <th className={removeThCell}>
      <span role="button">
        <div className={removeHeadCell}>
          <div
            id="cart_remove_button_text"
            className={removeHeadCellText}
          >
            Remove
          </div>
          <div className={removeHeadCellIcon}>
            <IconButton aria-label="help" className={removeHeadCellIconButton}>
              <ArrowDropDownIcon
                onClick={openDialogBox}
                onMouseEnter={() => showPopUp('open')}
                onMouseLeave={() => showPopUp('close')}
              />
            </IconButton>
            { popUpStatus ? (
              <div className={removeAllMessage}>
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
  );
};

const cartView = ({
  classes,
  data,
  fileIDs = [],
  defaultSortCoulmn,
  defaultSortDirection,
  updateSortOrder,
  paginationAPIField,
  paginationAPIFieldDesc,
  localPage,
  localRowsPerPage,
  isLoading,
  tableDownloadCSV,
}) => {
  const [modalStatus, setModalStatus] = React.useState(false);
  const commentRef = React.useRef();
  // const [userComments, setUserComments] = React.useState('');
  let dataCartView = data;
  let localPageCartView = localPage;
  let localRowsPerPageCartView = localRowsPerPage;
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

  // function toggleRemoveAllMessageStatus(status) {
  //   return status === 'close'
  // ? setRemoveAllMessageStatus(false) : setRemoveAllMessageStatus(true);
  // }

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
    const userComments = commentRef.current.getValue();
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

  if (localStorage.getItem('data')) {
    if (localStorage.getItem('data') !== 'undefined' && localStorage.getItem('data').length > 0 && (localStorage.getItem('page') !== localPage || localStorage.getItem('rowsPerPage') !== localRowsPerPage || localStorage.getItem('sortColumn') !== defaultSortCoulmn || localStorage.getItem('sortDirection') !== defaultSortDirection)) {
      const dataLocal = JSON.parse(localStorage.getItem('data'));
      dataCartView = dataLocal;
      localPageCartView = localStorage.getItem('page');
      localRowsPerPageCartView = localStorage.getItem('rowsPerPage');
    }
  }

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
        <CustomHeaderRemove
          classes={classes}
          openDialogBox={openDialogBox}
        />
      ),
    },
  }];

  const numberOfFilesBeDeleted = myFilesPageData.popUpWindow.showNumberOfFileBeRemoved ? fileIDs.length : '';

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
              updateSortOrder={updateSortOrder}
              data={dataCartView}
              deleteColumn={deleteColumn}
              fileIDs={fileIDs}
              defaultSortCoulmn={defaultSortCoulmn}
              defaultSortDirection={defaultSortDirection}
              tableDownloadCSV={tableDownloadCSV}
              paginationAPIField={paginationAPIField}
              paginationAPIFieldDesc={paginationAPIFieldDesc}
              localPage={localPageCartView}
              localRowsPerPage={localRowsPerPageCartView}
              isLoading={isLoading}
            />

            {/* Section: Footer */}
            <CartFooter
              myFilesPageData={myFilesPageData}
              externalLinkIcon={externalLinkIcon}
              ref={commentRef}
              preparedownload={() => prepareDownload()}
            />
          </div>
        </div>
      </Grid>

    </Grid>

  );
};

export default withStyles(Styles, { withTheme: true })(cartView);
