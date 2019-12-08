import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import App from './App';
import CreateForm from './components/createForm'
import registerServiceWorker from './registerServiceWorker';

render(
    <Router >
        <Route path={"/home"} component={App} />
        <Route path={"/test"} component={CreateForm} />
     </Router>,
  document.getElementById('root')
);
registerServiceWorker();
