import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Segment,
  Form,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";

const StyledConstainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Register = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setInputValues((prevSate) => ({
      ...prevSate,
      [inputName]: inputValue,
    }));
  };

  return (
    <StyledConstainer>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ minWidth: 300, maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register dev chat.
          </Header>
          <Form size="large">
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
