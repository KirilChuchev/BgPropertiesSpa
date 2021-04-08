import { useState } from "react";
import { useHistory } from "react-router-dom";

import userService from "../../services/userService";
import RegisterFormView from "./RegisterFormView";

const Register = () => {
  let history = useHistory();

  let userInitialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [serverErrors, setServerErrors] = useState({});

  function handleSubmit({ email, username, password }) {
    userService
      .register({ email, username, password })
      .then((res) => {
        let message = "";
        let path = "";
        if (
          res?.status === "Success" &&
          res?.message === "User created successfully! Please login."
        ) {
          message = res.message;
          path = "/login";
        } else {
          message = "Something went wrong.";
          path = "/register";
        }
        console.log(message);
        let somethingWrong =
          message === "Something went wrong." ? message : null;
        setServerErrors((state) => ({ ...state, somethingWrong }));
        history.push(path);
        return null;
      })
      .catch((err) => {
        if (err.includes("Unauthorized") || err.includes("Forbidden")) {
          userService.logout();
        }
        console.log(err);
        let userExistence = err;
        setServerErrors((state) => ({ ...state, userExistence }));
        history.push("/register");
        return null;
      });
  }
  return (
    <RegisterFormView
      userInitialValues={userInitialValues}
      handleSubmit={handleSubmit}
      serverErrors={serverErrors}
    />
  );
};

export default Register;
