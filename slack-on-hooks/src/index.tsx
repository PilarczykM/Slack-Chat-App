import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { App } from "./App";
import { GlobalStyle } from "./GlobalStyle";
import { Login } from "./modules/Login/Login";
import { Register } from "./modules/Register/Register";
import * as serviceWorker from "./serviceWorker";

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <>
    <GlobalStyle />
    <Root />
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
