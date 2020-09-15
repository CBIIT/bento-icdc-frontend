import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/HeaderView';
import NavBar from '../NavBar/NavBarContainer';
import Footer from '../Footer/FooterView';
import Error from '../../pages/error/Error';
import Dashboard from '../../pages/dashboard/dashboardController';
import CaseDetail from '../../pages/caseDetail/caseDetailController';
import Cases from '../../pages/cases/casesController';
import Studies from '../../pages/studies/studiesController';
import Programs from '../../pages/programs/programController';
import modelPage from '../../pages/modelPage/modelPageView';
import table from '../../pages/table/tableView';
import StudyDetail from '../../pages/studyDetail/studyDetailController';
import ProgramDetail from '../../pages/programDetail/programDetailController';
import Cart from '../../pages/cart/cartController';
import Home from '../../pages/landing/landingController';
import About from '../../pages/about/aboutController';
import GoogleAnalytics from '../GoogleAnalytics/GoogleAnalytics';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const Layout = ({ classes, isSidebarOpened }) => (
  <>
    <CssBaseline />
    <HashRouter>
      <>
        <Header />
        <NavBar />
        {/* Reminder: Ajay need to replace the ICDC with env variable and
          change build npm to read env variable */}
        <div
          className={classes.content}
        >
          <Route component={ScrollToTop} />
          <Switch>
            <Route exact path="/ICDC/" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/cases" component={Dashboard} />
            <Route path="/programs" component={Programs} />
            <Route path="/studies" component={Studies} />
            <Route path="/model" component={modelPage} />
            <Route path="/table" component={table} />
            <Route path="/cart" component={Cart} />
            <Route path="/program/:id" component={ProgramDetail} />
            <Route path="/study/:id" component={StudyDetail} />
            <Route path="/case/:id" component={CaseDetail} />
            <Route path="/study_cases/:id" component={Cases} />
            <Route path="/purpose" component={About} />
            <Route path="/steeringCommittee" component={About} />
            <Route path="/crdc" component={About} />
            <Route path="/icdcData" component={About} />
            <Route path="/developers" component={About} />
            <Route path="/support" component={About} />
            <Route path="/submit" component={About} />

            <Route component={Error} />
          </Switch>
          <GoogleAnalytics />
          <Footer data={{ isSidebarOpened }} />
        </div>
      </>
    </HashRouter>
  </>
);

const styles = (theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
    // width: `calc(100vw - 240px)`,   // Ajay need to add this on addung side bar
    width: 'calc(100%)', // Remove this on adding sidebar
    background: theme.custom.bodyBackGround,
    marginTop: '139px',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.6em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px #ccc',
      borderRadius: '10px',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(94,140,165)',
      outline: '1px solid slategrey',
      borderRadius: '10px',
    },
  },
});

export default withStyles(styles)(Layout);
