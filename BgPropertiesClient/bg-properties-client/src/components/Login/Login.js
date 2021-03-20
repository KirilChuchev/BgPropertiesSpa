import { useState } from "react";
import { useHistory } from "react-router-dom";

import userService from "../../services/userService";
import authService from "../../services/authService";

const Login = () => {

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    userService
      .login({ email, password })
      .then((userClaims) => {
        let currentUser = authService.getLocalStorageUserClaims();
        let path = currentUser.token === userClaims.token ? "/" : "/login";
        let message = path === "/" ? "Successfully login." : "Something went wrong.";
        console.log(message);
        history.push(path);
      })
      .catch((err) => {
        if (err.includes("Unauthorized") || err.includes("Forbidden")) {
          userService.logout();
        }
        console.log(err);
        history.push("/login");
      });
  }

  return (
    <div className="login">
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
        <div size="lg" id="password">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button size="lg" type="submit" disabled={!validateForm()}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
