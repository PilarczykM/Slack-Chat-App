export function inputValidator(
  email,
  userName,
  password,
  passwordConfirmation
) {
  let errors = [];

  if (!email && email === "") {
    errors.push("Email is not valid!");
  }
  if (!userName && userName === "") {
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
  switch (err.code) {
    case "auth/invalid-email":
      return "Your email is invalid.";
    case "auth/weak-password":
      return "Your password is to week. Try better password!";
    case "auth/operation-not-allowed":
      return "Contact us! Something went wrong.";
    case "auth/email-already-in-use":
      return "Email already exists!";
    default:
      return "Unknown error! " + err.code;
  }
}
