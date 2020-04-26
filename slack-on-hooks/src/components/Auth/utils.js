export function inputValidator(inputValues) {
  const { email, username, password, passwordConfirmation } = inputValues;
  let errors = [];

  if (!email && email === "") {
    errors.push("Email is not valid!");
  }
  if (!username && username === "") {
    errors.push("User name is not valid!");
  }
  if (!password && password === "") {
    errors.push("Password is not valid!");
  } else if (password !== passwordConfirmation) {
    errors.push("Passwords does not match!");
  }

  return errors;
}

export function handleError(err) {
  let errors = [];
  switch (err.code) {
    case "auth/invalid-email":
      errors.push("Your email is invalid.");
      break;
    case "auth/weak-password":
      errors.push("Your password is to week. Try better password!");
      break;
    case "auth/operation-not-allowed":
      errors.push("Contact us! Something went wrong.");
      break;
    case "auth/email-already-in-use":
      errors.push("Email already exists!");
      break;
    default:
      errors.push("Unknown error! " + err.code);
      break;
  }

  return errors;
}
