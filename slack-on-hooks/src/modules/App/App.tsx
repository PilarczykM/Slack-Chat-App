import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";
import firebase from "../../firebase";
import { ApplicationState } from "../../store";
import { ADD_USER } from "../../store/user/types";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";

export const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: ApplicationState) => state.user.isLoading
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: ADD_USER,
          payload: { currentUser: user },
        });
        history.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};
