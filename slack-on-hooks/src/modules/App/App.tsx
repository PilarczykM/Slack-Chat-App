import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";
import firebase from "../../firebase";
import { State } from "../../store";
import { turnOffLoadingActionCreator } from "../../store/loadingScreen/slice";
import { loginUserActionCreator } from "../../store/user/slice";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";

export const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoading = useSelector((state: State) => state.loadingScreen);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(turnOffLoadingActionCreator());
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          loginUserActionCreator({
            displayName,
            uid,
            photoURL,
            email,
          })
        );
        history.push("/");
      } else {
        dispatch(turnOffLoadingActionCreator());
        history.push("/login");
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
