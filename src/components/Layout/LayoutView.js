import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LinkBar } from 'bento-components';
import aboutPageRoutes from '../../bento/aboutPagesRoutes';
import resourceDropdownRoutes from '../../bento/resourceDropdownRoutes';
import dataDropdownRoutes from '../../bento/dataDropdownRoutes';
import Header from '../Header/HeaderView';
import NavBar from '../NavBar/NavBarContainer';
import Footer from '../Footer/FooterView';
import Error from '../../pages/error/Error';
import Home from '../../pages/landing/landingController';
import Studies from '../../pages/studies/studiesController';
import Dashboard from '../../pages/dashboardTab/dashboardController';
import Cart from '../../pages/fileCentricCart/cartController';
import About from '../../pages/about/aboutController';
import Programs from '../../pages/programs/programsController';
import ProgramDetail from '../../pages/programDetail/programDetailController';
import CaseDetails from '../../pages/caseDetails/caseDetailsController';
import GA from '../../utils/googleAnalytics';
import StudyDetail from '../../pages/study/studyDetailController';
import UnifiedView from '../../pages/dashboardTab/unifiedViewController';
import OverlayWindow from '../OverlayWindow/OverlayWindow';
import GraphqlClient from '../GraphqlClient/GraphqlView';
import ModelExplorer from './utils';
import JbrowseController from '../../pages/JbrowseDetail/JbrowseController';
import WarningBanner from '../warning-banner/WarningBannerView';
// import Jbrowsetest from '../../pages/JbrowseDetail/JbrowseTest';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const Layout = ({ classes, isSidebarOpened }) => (
  <>
    <CssBaseline />
    <HashRouter>
      <>
        <LinkBar url="https://datacommons.cancer.gov/?cid=caninecommons.cancer.gov" />
        <WarningBanner />
        <Header />
        <OverlayWindow />
        <NavBar />
        {/* Reminder: Ajay need to replace the ICDC with env variable and
          change build npm to read env variable */}
        <div
          className={classes.content}
        >
          <Route component={ScrollToTop} />
          { GA.init() && <GA.RouteTracker /> }
          <Switch>
            <Route exact path="/ICDC/" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/news" component={Home} />
            <Route path="/study/:id" component={StudyDetail} />
            <Route path="/studies" component={Studies} />
            <Route path="/explore" component={Dashboard} />
            <Route path="/unifiedView/:id" component={UnifiedView} />
            <Route path="/fileCentricCart" component={Cart} />
            <Route path="/programs" component={Programs} />
            <Route path="/program/:id" component={ProgramDetail} />
            <Route path="/case/:id" component={CaseDetails} />
            <Route path="/jBrowse/:diplayMode" component={JbrowseController} />
            <Route path="/icdc-data-model" component={ModelExplorer} />
            {aboutPageRoutes.map(
              (aboutPageRoute) => <Route path={aboutPageRoute} component={About} />,
            )}
            {resourceDropdownRoutes.map(
              (resourceDropdownRoute) => <Route path={resourceDropdownRoute} component={About} />,
            )}
            {dataDropdownRoutes.map(
              (dataDropdownRoute) => <Route path={dataDropdownRoute} component={About} />,
            )}
            <Route path="/graphql" component={GraphqlClient} />
            <Route component={Error} />
          </Switch>
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
  LinkBar: {
    position: 'relative',
    zIndex: '1000',
  },
  Header: {
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    // width: `calc(100vw - 240px)`,   // Ajay need to add this on addung side bar
    width: 'calc(100%)', // Remove this on adding sidebar
    background: theme.custom.bodyBackGround,
    marginTop: '367.578px',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: 'none',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 2px #ccc',
      borderRadius: '0px',
      backgroundColor: '#FFFFFF',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(94,140,165)',
      outline: '1px solid slategrey',
      borderRadius: '0px',
    },
  },
});

export default withStyles(styles)(Layout);
