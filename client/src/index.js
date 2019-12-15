import React from 'react';
import ReactDOM  from 'react-dom';
import {HashRouter as Router, Route } from "react-router-dom";
import './index.css';
import Home from './Home';
import CreateForm from './components/createForm'
import SearchHome from './SearchHome'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    (<Router >
        <Route exact path={"/home"} component={Home} />
        <Route path={"/search"} component={SearchHome} />
    </Router>),
  document.getElementById('root')
);
registerServiceWorker();
