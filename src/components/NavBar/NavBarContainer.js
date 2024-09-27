import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBarView from './NavBarView';
import { toggleSidebar } from '../Layout/LayoutState';

export default compose(
  withRouter,
  connect(
    (state) => ({
      cartFieldIds: state.cartReducer.filesId,
    }),
    { toggleSidebar },
  ),
  lifecycle({
    componentDidMount() {
    },
    shouldComponentUpdate({ location: nextLocation }) {
      const pathName = this.props.location.pathname;
      return (
        // if the path is same don't update
        (pathName !== nextLocation || false)
      );
    },
  }),
)(NavBarView);
