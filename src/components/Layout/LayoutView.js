import React from "react";
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { withStyles } from "@material-ui/core";
import aboutPageRoutes from '../../bento/aboutPagesRoutes';
import Dashboard from "../../pages/dashboard/DashboardController";
import GlobalSearchView from '../../pages/globalSearch/GlobalSearchController';
import JbrowseView from '../../pages/JbrowseDetail/JbrowseController';
import Home from '../../pages/landing/landingController';
import Footer from '../../components/Footer/FooterView';
import Header from '../header/HeaderView';
import NavigatorView from "../../pages/navigator/NavigatorView";
import GraphQLView from "../graphql/GraphQLView";
import NavBar from '../NavBar/NavBarContainer';
import About from '../../pages/about/aboutController';
import styles from './LayoutStyle';

const LayoutView = ({
  classes,
}) => {
  return (
      <>
        <div className={classes.container}>
          <div id="headerSection" className={classes.header}>
            <Header />
            <NavBar />
          </div>
        </div>
        <HashRouter>
          <Switch>
            <Route exact path="/ICDC/" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/explore" component={Dashboard} />
            <Route path="/search/:id" component={GlobalSearchView} />
            <Route path="/jBrowse/:diplayMode" component={JbrowseView} />
            <Route path="/icdc-data-model" component={NavigatorView} />
            <Route path="/graphql" component={GraphQLView} />
            {aboutPageRoutes.map(
              (aboutPageRoute) => <Route path={aboutPageRoute} component={About} />,
            )}
          </Switch>
        </HashRouter>
        <Footer />
      </>
  );
};

export default withStyles(styles)(LayoutView);
