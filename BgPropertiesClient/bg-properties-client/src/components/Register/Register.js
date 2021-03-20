import { useState } from "react";
import { useHistory } from "react-router-dom";

import userService from "../../services/userService";

const Register = () => {

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      username.length > 0 &&
      password === confirmPassword
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    userService
      .register({ email, username, password })
      .then((res) => {
        let message = "";
        let path = "";
        if (
          res.status === "Success" &&
          res.message === "User created successfully! Please login."
        ) {
          message = res.message;
          path = "/login";
        } else {
          message = "Something went wrong.";
          path = "/register";
        }
        console.log(message);
        history.push(path);
      })
      .catch((err) => {
        if (err.includes("Unauthorized") || err.includes("Forbidden")) {
          userService.logout();
        }
        console.log(err);
        history.push("/register");
      });
  }
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div size="lg" id="email">
          <label>Email</label>
          <input
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div size="lg" id="username">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div size="lg" id="password">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div size="lg" id="confirmPassword">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button size="lg" type="submit" disabled={!validateForm()}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
