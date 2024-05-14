import React, { useEffect, useRef } from 'react';
import {
  HashRouter,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { withStyles, CssBaseline } from "@material-ui/core";
import aboutPageRoutes from '../../bento/aboutPagesRoutes';
import Dashboard from "../../pages/dashboard/DashboardController";
import UnifiedDash from '../../pages/unifiedView/unifiedController';
import CartView from '../../pages/fileCentricCart/CartController';
import GlobalSearchView from '../../pages/globalSearch/GlobalSearchController';
import JbrowseView from '../../pages/JbrowseDetail/JbrowseController';
import Home from '../../pages/landing/landingController';
import Footer from '../../components/Footer/FooterView';
import Header from '../Header/HeaderView';
import NavigatorView from "../../pages/navigator/NavigatorView";
import GraphQLView from "../graphql/GraphQLView";
import NavBar from '../NavBar/NavBarContainer';
import About from '../../pages/about/aboutController';
import Studies from '../../pages/studies/studiesController';
import Programs from '../../pages/programs/programsController';
import ProgramDetail from '../../pages/programDetail/programDetailController';
import StudyDetail from '../../pages/study/studyDetailController';
import CaseDetails from '../../pages/caseDetails/caseDetailsController';
import OverlayWindow from '../OverlayWindow/OverlayWindow';
import ShutdownBanner from '../ShutdownBanner/ShutdownBanner';
import { navBarExclusions } from '../../bento/navigationBarData';
import styles from './LayoutStyle';

const LayoutView = ({
  classes,
}) => {
  const location = useLocation();
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  if (contentRef && contentRef.current) {
    contentRef.current.scrollTo(0, 0);
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        // Access the new size information from entry.contentRect
        contentRef.current.style.height = `calc(100% - ${entry.contentRect.height}px)`;
      });
    });

    // Attach the ResizeObserver to the target element (in this case, the containerRef)
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    // Cleanup function to disconnect the ResizeObserver when the component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
      <>
        <CssBaseline />
        <HashRouter>
          <OverlayWindow />
          <div className={classes.container}>
            <div id="headerSection" ref={headerRef} className={classes.header}>
              <ShutdownBanner src="https://cbiit.github.io/crdc-alert-elements/banners/government-shutdown.html" />
              <Header />
              {!navBarExclusions.find((item) => item === location.hash) && <NavBar />}
            </div>
          </div>
          {/* Reminder: Ajay need to replace the ICDC with env variable and
          change build npm to read env variable */}
          <div
            ref={contentRef}
            className={classes.content}
          >
            <Switch>
              <Route exact path="/ICDC/" component={Home} />
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/explore" component={Dashboard} />
              <Route path="/unifiedView/:id" component={UnifiedDash} />
              <Route path="/fileCentricCart" component={CartView} />
              <Route path="/studies" component={Studies} />
              <Route path="/search/:id" component={GlobalSearchView} />
              <Route path="/jBrowse/:diplayMode" component={JbrowseView} />
              <Route path="/programs" component={Programs} />
              <Route path="/program/:id" component={ProgramDetail} />
              <Route path="/icdc-data-model" component={NavigatorView} />
              <Route path="/graphql" component={GraphQLView} />
              <Route path="/study/:id" component={StudyDetail} />
              <Route path="/case/:id" component={CaseDetails} />
              {aboutPageRoutes.map(
                (aboutPageRoute) => <Route path={aboutPageRoute} component={About} />,
              )}
            </Switch>
            <Footer />
          </div>
        </HashRouter>
      </>
  );
};

export default withStyles(styles)(LayoutView);
