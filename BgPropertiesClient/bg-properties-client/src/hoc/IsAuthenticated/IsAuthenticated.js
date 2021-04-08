import { useEffect } from "react";
import { useHistory } from "react-router";
import authService from "../../services/authService";
import Login from "../../components/Login";

const IsAuthenticated = ({ Component }) => {
  const history = useHistory();

  let token = authService.getLocalStorageUserClaims()?.token;

  useEffect(() => {
    if (!token) {
      history.push("/login");
      return null;
    }
  });
  return token ? <Component /> : <Login />;
};

export default IsAuthenticated;
