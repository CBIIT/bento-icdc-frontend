import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { GA_TRACKING_ID } from './config';

const createHistoryInGA = (pathname) => {
  const { gtag } = window;

  if (typeof (gtag) === 'function') {
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    });
  }
};

class GoogleAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // states
    };
  }

  componentDidMount() {
    const { location } = this.props;
    createHistoryInGA(location.pathname);
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate({ location, prevHistory }) {
    // eslint-disable-next-line no-unused-vars
    const { location: newLocation } = this.props;

    if (location.pathname === newLocation.pathname) {
      // don't log identical link clicks (nav links likely)
      return;
    }

    createHistoryInGA(newLocation.pathname);
  }

  render() {
    return null;
  }
}

export default withRouter(GoogleAnalytics);
