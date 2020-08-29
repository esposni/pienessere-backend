import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Poesia from './Poesia';
import Ricetta from './Ricetta';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

ReactDOM.render(<BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={props => <App {...props} />} />
        <Route path="/poesia" render={props => <Poesia {...props} />} />
        <Route path="/ricetta" render={props => <Ricetta {...props} />} />

        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
    </BrowserRouter>
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
