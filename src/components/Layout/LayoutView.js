import React from "react";
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Dashboard from "../../pages/dashboard/Dashboard";
import GlobalSearchView from '../../pages/globalSearch/GlobalSearchController';
import Footer from '../../components/Footer/FooterView';

const LayoutView = () => {

    return (
        <>
          <HashRouter>
            <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/search/:id" component={GlobalSearchView} />
            </Switch>
          </HashRouter>
          <Footer />
        </>
    )

};

export default LayoutView;
