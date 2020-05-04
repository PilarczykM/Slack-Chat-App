import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import firebase from "../../firebase";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";

export const App: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};
