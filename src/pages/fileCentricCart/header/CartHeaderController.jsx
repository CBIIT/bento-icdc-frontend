import React from 'react';
import { myFilesPageData } from '../../../bento/fileCentricCartWorkflowData';
import CartHeader from './cartHeader';

const CartHeaderController = ({ filesId }) => (
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
