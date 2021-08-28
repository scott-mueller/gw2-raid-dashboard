import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Link
} from "react-router-dom";
import App from "./pages/App/App";
import Collector from "./pages/Collector/Collector";
import * as Realm from 'realm-web';

export default function Routes() {

  const REALM_APP_ID = 'scott-mueller-realm-yeisv';
  const app = new Realm.App({ id: REALM_APP_ID });

  const [mongoUser, setUser] = useState(app.currentUser || {});
  const [col, setCol ] = useState({});

  const loginAnonymous = async () => {

    const credentials = Realm.Credentials.apiKey('kcHq4RuuRxuTMAlp9iUgN8R1QRGKysJQ7SX0ZYsOFfLDIdTN5Ju6f6QGbe1Zb4fu');
    const user = await app.logIn(credentials);

    console.log('Logged in!!');
    console.log(user);

    setUser(user);
  };

  const getCollector = async () => {

    const mongodb = app.currentUser.mongoClient('mongodb-atlas');
    const collectors = mongodb.db('gw2-rba').collection('collectors');

    const collector = await collectors.findOne({ _id: 'ANCJsIlO' });
    setCol(collector);
  };

  return (
    <Router basename="/">
        <div>
            <ul>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/about">About</Link></li>
            </ul>
            <div>
              <p>{mongoUser.id || 'Not Logged In'}</p>
              <button onClick={loginAnonymous}>Log In</button>
              <br />
              <button onClick={getCollector}>Get Collector</button>
              <p>{JSON.stringify(col)}</p>
            </div>
            <hr />
            <Route exact path="/" component={Home}>
            </Route>
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
