import md5 from "md5";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import firebase from "../../../firebase";
import { handleError, inputValidator } from "../utils";
import * as S from "./Register.styled";

export const Register = () => {
  const [errors, setErrors] = useState([]);
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputValues((prevSate) => ({
      ...prevSate,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, username } = inputValues;

    let errors = inputValidator(inputValues);

    setErrors(errors);

    if (errors.length === 0) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d:indenticon`,
            })
            .then(() => {
              saveUser(createdUser).then(() => {
                console.log("User was saved in database!");
              });
            })
            .catch((err) => {
              errors = handleError(err);
              setErrors(errors);
            });
        })
        .catch((err) => {
          errors = handleError(err);
          setErrors(errors);
        });
    }
  };

  const saveUser = (createdUser) => {
    return firebase
      .firestore()
      .collection("users")
      .doc(createdUser.user.uid)
      .set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL,
      });
  };

  const displayErrors = (errors) =>
    errors.map((err, i) => <p key={i}>{err}</p>);

  return (
    <S.Constainer>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ minWidth: 300, maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register dev chat.
          </Header>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {displayErrors(errors)}
            </Message>
          )}
          <Form onSubmit={handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="User name"
                onChange={handleChange}
                value={inputValues.username}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email address"
                onChange={handleChange}
                value={inputValues.email}
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={handleChange}
                value={inputValues.password}
                type="password"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password confirmation"
                onChange={handleChange}
                value={inputValues.passwordConfirmation}
                type="password"
              />
              <Button color="orange" fluid size="large">
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </S.Constainer>
  );
};
