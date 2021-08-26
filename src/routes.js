import React from "react";
import {
  HashRouter as Router,
  Route,
  Link
} from "react-router-dom";
import App from "./pages/App/App";
import Collector from "./pages/Collector/Collector";

export default function Routes() {
  return (
    <Router basename="/">
        <div>
            <ul>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/about">About</Link></li>
            </ul>
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/collector">
                <Collector />
            </Route>
            <Route path="/app">
                <App />
            </Route>
        </div>
    </Router>
  );
}

const Home = () => <div><h2>Home</h2></div>
const About = () => <div><h2>About</h2></div>
