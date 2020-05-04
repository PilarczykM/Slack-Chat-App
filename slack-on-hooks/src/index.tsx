import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { GlobalStyle } from "./GlobalStyle";
import { App } from "./modules/App/App";
import * as serviceWorker from "./serviceWorker";

const Root: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
