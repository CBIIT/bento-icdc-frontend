import React from "react";
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Dashboard from "../../pages/dashboard/Dashboard";
import GlobalSearchView from '../../pages/globalSearch/GlobalSearchController';
import JbrowseView from '../../pages/JbrowseDetail/JbrowseController';
import Footer from '../../components/Footer/FooterView';
import NavigatorView from "../../pages/navigator/NavigatorView";

const LayoutView = () => {

  return (
      <>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/search/:id" component={GlobalSearchView} />
            <Route path="/jBrowse/:diplayMode" component={JbrowseView} />
            <Route path="/icdc-data-model" component={NavigatorView} />
          </Switch>
        </HashRouter>
        <Footer />
      </>
  );
};

export default LayoutView;
