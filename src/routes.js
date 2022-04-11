/* eslint-disable no-unused-vars */

import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Collector from "./pages/Collector/Collector";
import Dashboard from './pages/Dashboard/Dashboard';
import Home from "./pages/Home/Home";
import Encounters from './pages/Encounters/Encounters';
import CollectorList from "./pages/CollectorList/CollectorList";

export default function Routes() {

  return (
    <Router basename="/">
      <Route exact path="/" component={Home} />
			{/*<Route path="/encounters" component={Encounters} />*/}
      <Route path="/collector" component={Collector} />
			{/*<Route path="/collector-list" component={CollectorList} />*/}

			{/* Reference only */}
            <Route path="/dashboard-demo" component={Dashboard} />
    </Router>
  );
}
