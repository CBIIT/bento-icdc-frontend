import React, { useEffect, useRef, useState } from 'react';
import { HashRouter, Route, Switch, useLocation } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LinkBar from '../LinkBar';
import aboutPageRoutes from '../../bento/aboutPagesRoutes';
import Dashboard from '../../pages/dashboard/DashboardController';
import UnifiedDash from '../../pages/unifiedView/unifiedController';
import GlobalSearchView from '../../pages/globalSearch/GlobalSearchController';
import JbrowseView from '../../pages/JbrowseDetail/JbrowseController';
import Home from '../../pages/landing/landingController';
import Footer from '../Footer/FooterView';
import Header from '../header/HeaderView';
import NavigatorView from '../../pages/navigator/NavigatorView';
import GraphQLView from '../graphql/GraphQLView';
import NavBar from '../NavBar/NavBarContainer';
import About from '../../pages/about/aboutController';
import Studies from '../../pages/studies/studiesController';
import Programs from '../../pages/programs/programsController';
import ProgramDetail from '../../pages/programDetail/program-detail-controller';
import StudyDetail from '../../pages/study/studyDetailController';
import CaseDetails from '../../pages/caseDetails/caseDetailsController';
import OverlayWindow from '../OverlayWindow/OverlayWindow';
import ShutdownBanner from '../ShutdownBanner/ShutdownBanner';
import { navBarExclusions } from '../../bento/navigationBarData';
import CartView from '../../pages/Cart/CartController';
import SysInfo from '../../pages/sysinfo/sysInfo';
import Error from '../../pages/error/Error';
import { Global, css } from '@emotion/react';
import { HeaderContainer, ContentWrapper } from './LayoutView.styled';

const LayoutView = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem('overlayLoad', 'true');
  };

  useEffect(() => {
    if (!sessionStorage.length) {
      setOpen(true);
    }
  }, [open]);

  useEffect(() => {
    const adjustForSiteAlert = () => {
      const hostDiv = document.body.children[0];
      if (!hostDiv || !hostDiv.shadowRoot) {
        document.documentElement.style.setProperty(
          '--site-alert-offset',
          '0px'
        );
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const siteAlert = hostDiv.shadowRoot.querySelector(
        '.usa-site-alert'
      ) as HTMLDivElement;
      if (siteAlert) {
        // document.documentElement.style.setProperty('--site-alert-offset', `${siteAlert.offsetHeight}px`);

        // Adjust site alert styling to also be fixed
        siteAlert.style.position = 'fixed';
        siteAlert.style.top = '0';
        siteAlert.style.left = '0';
        siteAlert.style.width = '100%';
        siteAlert.style.zIndex = '9999';
      }
    };

    // Initial check
    adjustForSiteAlert();
    const observer = new MutationObserver(adjustForSiteAlert);

    observer.observe(document.body, {
      childList: true,
    });
    window.addEventListener('resize', adjustForSiteAlert);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', adjustForSiteAlert);
    };
  }, []);

  const location = useLocation();
  const headerRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  if (contentRef && contentRef.current) {
    contentRef.current.scrollTo(0, 0);
  }

  return (
    <>
      <CssBaseline />
      <Global
        styles={css`
          html,
          body {
            height: 100%;
            margin: 0;
          }
          body {
          }
          #root {
            height: 100%;
          }
          *::-webkit-scrollbar {
            width: none;
          }
          *::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 2px #ccc;
            border-radius: 0px;
            background-color: #ffffff;
          }
          ,
          *::-webkit-scrollbar-thumb {
            background-color: rgba(94, 140, 165);
            outline: 1px solid slategrey;
            border-radius: 0px;
          }
        `}
      />
      <HashRouter>
        {open && <OverlayWindow open={open} handleClose={handleClose} />}
        <HeaderContainer ref={headerRef}>
          <ShutdownBanner src="https://cbiit.github.io/crdc-alert-elements/banners/government-shutdown.html" />
          <LinkBar url="https://datacommons.cancer.gov/?cid=caninecommons.cancer.gov" />
          <Header />
          {!navBarExclusions.find(item => item === location.hash) && <NavBar />}
        </HeaderContainer>
        {/* Reminder: Ajay need to replace the ICDC with env variable and
          change build npm to read env variable */}
        <ContentWrapper ref={contentRef}>
          <div className="switchWrapper">
            <Switch>
              <Route exact path="/ICDC/" component={Home} />
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/news" component={Home} />
              <Route exact path="/explore" component={Dashboard} />
              <Route path="/explore/:filterQuery" component={Dashboard} />
              <Route path="/unifiedView/:id" component={UnifiedDash} />
              <Route path="/fileCentricCart" component={CartView} />
              <Route path="/studies" component={Studies} />
              <Route path="/search/:id" component={GlobalSearchView} />
              <Route exact path="/search" component={GlobalSearchView} />
              <Route path="/jBrowse/:diplayMode" component={JbrowseView} />
              <Route path="/programs" component={Programs} />
              <Route path="/program/:id" component={ProgramDetail} />
              <Route path="/icdc-data-model" component={NavigatorView} />
              <Route path="/graphql" component={GraphQLView} />
              <Route path="/study/:fileType/:id" component={StudyDetail} />
              <Route path="/study/:id" component={StudyDetail} />
              <Route path="/case/:id" component={CaseDetails} />
              <Route path="/sysinfo" component={SysInfo} />
              {aboutPageRoutes.map((aboutPageRoute, index) => (
                <Route
                  key={`about-route-path-${index}`}
                  path={aboutPageRoute}
                  component={About}
                />
              ))}
              <Route component={Error} />
            </Switch>
          </div>
          <div>
            <Footer />
          </div>
        </ContentWrapper>
      </HashRouter>
    </>
  );
};

export default LayoutView;
