import { InputValues } from "./types";

export function inputValidator(inputValues: InputValues): string[] {
  const { email, password } = inputValues;
  let errors = [];

  if (!email && email.trim() === "") {
    errors.push("Email is not valid!");
  } else if (!_validateEmail(email)) {
    errors.push("This is really your email address?");
  }
  if (!password && password.trim() === "") {
    errors.push("Password is not valid!");
  }

  return errors;
}

function _validateEmail(email: string) {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export function handleError(err: any): string[] {
  let errors = [];
  switch (err.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
      errors.push("Email or password is invalid.");
      break;
    default:
      errors.push("Unknown error! " + err.code);
      break;
  }

  return errors;
}
