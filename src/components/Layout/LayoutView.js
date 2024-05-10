import React from "react";
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { withStyles } from "@material-ui/core";
import Dashboard from "../../pages/dashboard/DashboardController";
import GlobalSearchView from '../../pages/globalSearch/GlobalSearchController';
import JbrowseView from '../../pages/JbrowseDetail/JbrowseController';
import Footer from '../../components/Footer/FooterView';
import Header from '../header/HeaderView';
import NavigatorView from "../../pages/navigator/NavigatorView";
import GraphQLView from "../graphql/GraphQLView";
import NavBar from '../NavBar/NavBarContainer';
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
            <Route exact path="/" component={Dashboard} />
            <Route path="/search/:id" component={GlobalSearchView} />
            <Route path="/jBrowse/:diplayMode" component={JbrowseView} />
            <Route path="/icdc-data-model" component={NavigatorView} />
            <Route path="/graphql" component={GraphQLView} />
          </Switch>
        </HashRouter>
        <Footer />
      </>
  );
};

export default withStyles(styles)(LayoutView);
