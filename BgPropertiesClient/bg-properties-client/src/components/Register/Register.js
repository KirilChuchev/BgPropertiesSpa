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
        history.push(path);
        return null;
      })
      .catch((err) => {
        if (err.includes("Unauthorized") || err.includes("Forbidden")) {
          userService.logout();
        }
        console.log(err);
        history.push("/register");
        return null;
      });
  }
  return (
    <RegisterFormView
      userInitialValues={userInitialValues}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;
