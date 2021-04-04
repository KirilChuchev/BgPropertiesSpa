import { useState } from "react";
import { useHistory } from "react-router-dom";

import userService from "../../services/userService";
import authService from "../../services/authService";
import LoginFormView from "./LoginFormView";

const Login = () => {
  let history = useHistory();

  let userInitialValues = {
    email: "",
    password: "",
  };

  const [serverErrors, setServerErrors] = useState({});

  function handleSubmit({ email, password }) {
    userService
      .login({ email, password })
      .then((userClaims) => {
        let currentUser = authService.getLocalStorageUserClaims();
        if (!currentUser || currentUser?.token === undefined) {
          history.push("/login");
          return null;
        }
        let path = currentUser.token === userClaims.token ? "/" : "/login";
        let message =
          path === "/" ? "Successfully login." : "Something went wrong.";

        console.log(message);
        let somethingWrong = message;
        setServerErrors(state => ({...state, somethingWrong}));
        history.push(path);
        return null;
      })
      .catch((err) => {
        if (err.includes("Unauthorized") || err.includes("Forbidden")) {
          userService.logout();
        }
        console.log(err);
        let somethingWrong = err;
        setServerErrors(state => ({...state, somethingWrong}));
        history.push("/login");
        return null;
      });
  }

  return (
    <LoginFormView
      userInitialValues={userInitialValues}
      handleSubmit={handleSubmit}
      serverErrors={serverErrors}
    />
  );
};

export default Login;
