import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBarView from './NavBarView';

export default compose(
  withRouter,
  connect(
    (state) => ({
      cartFieldIds: state.cartReducer.filesId,
    }),
  ),
  lifecycle({
    componentDidMount() {
    },
    shouldComponentUpdate({ location: nextLocation }) {
      const pathName = this.props.location.pathname;
      return (
        pathName !== nextLocation || false // if the path is same don't update
      );
    },
  }),
)(NavBarView);
