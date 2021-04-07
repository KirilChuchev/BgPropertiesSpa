import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import userService from "../../services/userService";
import authService from "../../services/authService";
import LoginFormView from "./LoginFormView";
import Home from "../Home";

const Login = ({
  history
}) => {
  console.log("in");
  // const history = useHistory();

  let userInitialValues = {
    email: "",
    password: "",
  };

  const [serverErrors, setServerErrors] = useState({});

  function handleSubmit({ email, password }) {
    console.log("here");
    userService
      .login({ email, password })
      .then((userClaims) => {
        let currentUser = authService.getLocalStorageUserClaims();
        if (!currentUser || currentUser?.token === undefined) {
          console.log("problem");
          history.push("/login");
          return null;
        }
        history.push("/");
        return null;
        // let path = currentUser.token === userClaims.token ? "/" : "/login";
        // let message =
        //   path === "/" ? "Successfully login." : "Something went wrong.";
        //   // return <Redirect to="/"/>;
        //   console.log(message);
        //   let somethingWrong = message;
        //   setServerErrors(state => ({...state, somethingWrong}));
        //   history.push(path);
        //  console.log("push", path);
        //  console.log(history);
        // return null;
        // return <Redirect to="/register"/>;
      })
      .catch((err) => {
        console.log(err);
        if (err.includes("Unauthorized") || err.includes("Forbidden")) {
          userService.logout();
        }
        console.log(err);
        let somethingWrong = err;
        setServerErrors(state => ({...state, somethingWrong}));
        history.push("/login");
        // return null;
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
