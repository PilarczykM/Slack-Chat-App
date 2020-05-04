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
import * as S from "./Login.styled";
import { InputValues } from "./types";
import { handleError, inputValidator } from "./utils";

export const Login: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<InputValues>({
    email: "",
    password: "",
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

    let errors = inputValidator(inputValues);

    const { email, password } = inputValues;

    setErrors(errors);

    if (errors.length === 0) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((signedInUser) => {
          setIsLoading(false);
          console.log(signedInUser);
        })
        .catch((err) => {
          setIsLoading(false);
          errors = handleError(err);
          setErrors(errors);
        });
    }
  };

  const displayErrors = (errors: string[]): JSX.Element[] =>
    errors.map((err, i) => <p key={i}>{err}</p>);

  return (
    <S.Constainer>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ minWidth: 400, maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login dev chat.
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
              <Button color="violet" fluid size="large" loading={isLoading}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Do not have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </S.Constainer>
  );
};
