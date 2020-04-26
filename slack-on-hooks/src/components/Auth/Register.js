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
import styled from "styled-components";
import firebase from "../../firebase";
import { handleError, inputValidator } from "./utils";

const StyledConstainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Zamienic na named export xD
const Register = () => {
  const [errorsObj, setErrors] = useState([]);
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

    const { username, email, password, passwordConfirmation } = inputValues;
    // Todo: Input validator powinien przyjac calego inputValues.
    let errors = inputValidator(
      email,
      username,
      password,
      passwordConfirmation
    );

    setErrors(errors);

    if (errors.length === 0) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          console.log(createdUser);
        })
        .catch((err) => {
          console.log(handleError(err));
        });
    } else {
      console.log(errors);
    }
  };

  return (
    <StyledConstainer>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ minWidth: 300, maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register dev chat.
          </Header>
          {/* Todo: Do osobnej funkcji render errors! */}
          {errorsObj.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {errorsObj.map((err) => (
                <p>{err}</p>
              ))}
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
    </StyledConstainer>
  );
};

export default Register;
