import React from 'react';
import {
  BrowserRouter, HashRouter, Route, Switch
} from 'react-router-dom';
import GlobalSearch from './pages/globalSearch/GlobalSearch';
import Footer from './components/Footer/FooterView';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/search" component={GlobalSearch} />
        </Switch>
      </HashRouter>
      <Footer />
    </BrowserRouter>
  )
}

export default App;

