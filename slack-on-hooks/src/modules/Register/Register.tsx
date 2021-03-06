import { Md5 } from "md5-typescript";
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
import firebase from "../../firebase";
import * as S from "./Register.styled";
import { InputProps } from "./types";
import { handleError, inputValidator } from "./utils";

export const Register: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [inputValues, setInputValues] = useState<InputProps>({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevSate) => ({
      ...prevSate,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password, username } = inputValues;

    let errors = inputValidator(inputValues);

    setErrors(errors);

    if (errors.length === 0) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser: firebase.auth.UserCredential) => {
          createdUser.user
            ?.updateProfile({
              displayName: username,
              photoURL: `http://gravatar.com/avatar/${Md5.init(
                createdUser.user.email
              )}?d:indenticon`,
            })
            .then(() => {
              saveUser(createdUser)?.then(() => {
                setIsLoading(false);
                console.log("User was saved in database!");
              });
            })
            .catch((err) => {
              setIsLoading(false);
              errors = handleError(err);
              setErrors(errors);
            });
        })
        .catch((err) => {
          setIsLoading(false);
          errors = handleError(err);
          setErrors(errors);
        });
    }
  };

  const saveUser = (
    createdUser: firebase.auth.UserCredential
  ): Promise<void> | undefined => {
    if (createdUser && createdUser.user) {
      return firebase
        .firestore()
        .collection("users")
        .doc(createdUser.user.uid)
        .set({
          name: createdUser.user.displayName,
          avatar: createdUser.user.photoURL,
        });
    }
  };

  const displayErrors = (errors: string[]): JSX.Element[] =>
    errors.map((err, i) => <p key={i}>{err}</p>);

  return (
    <S.Constainer>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ minWidth: 400, maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
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
              <Button color="orange" fluid size="large" loading={isLoading}>
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
