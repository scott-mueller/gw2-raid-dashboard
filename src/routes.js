import React from "react";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import App from "./pages/App/App";
import Collector from "./pages/Collector/Collector";
import Dashboard from './pages/Dashboard/Dashboard';

export default function Routes() {

  return (
    <Router basename="/">
            <Route exact path="/" component={Home}>
            </Route>
            <Route path="/about" component={About} />
            <Route path="/collector">
                <Collector />
            </Route>
            <Route path="/app">
                <App />
            </Route>
            <Route path="/dashboard-demo">
              <Dashboard />
            </Route>
    </Router>
  );
}

const Home = () => <div><h2>Home</h2></div>
const About = () => <div><h2>About</h2></div>
