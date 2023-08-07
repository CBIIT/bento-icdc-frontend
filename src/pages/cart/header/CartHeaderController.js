import React from 'react';
// import { useQuery } from '@apollo/client';
// import {
//   CircularProgress,
//   Container,
// } from '@material-ui/core';
import {
  // GET_STORE_MANIFEST_DATA_QUERY,
  myFilesPageData,
} from '../../../bento/fileCentricCartWorkflowData';
import CartHeader from './cartHeader';
// import { getManifestData } from '../util/TableService';

const CartHeaderController = ({
  filesId,
}) => (
  <>
    <CartHeader
      headerIconSrc={myFilesPageData.headerIconSrc}
      headerIconAlt={myFilesPageData.headerIconAlt}
      mainTitle={myFilesPageData.mainTitle}
      subTitle={myFilesPageData.subTitle}
      filesId={filesId}
    />
  </>
);

export default CartHeaderController;
