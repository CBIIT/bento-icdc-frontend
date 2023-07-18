import React from 'react';
import { connect } from 'react-redux';
import {
  onDeleteAllCartFile,
  onDeleteCartFile,
  CartContextProvider,
} from '@bento-core/cart';
import { table } from '../../bento/fileCentricCartWorkflowData';
import CartView from './CartView';

const CartController = (props) => (
  <CartContextProvider>
    <CartView
      {...props}
      config={table}
    />
  </CartContextProvider>
);

const mapStateToProps = (state) => ({
  filesId: state.cartReducer.filesId,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAllFiles: () => dispatch(onDeleteAllCartFile()),
  deleteCartFile: ({ file_uuid: fileId }) => dispatch(onDeleteCartFile(fileId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartController);
