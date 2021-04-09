import { useEffect } from "react";
import { useHistory } from "react-router";
import authService from "../../services/authService";
import Home from "../../components/Home";

const IsGuest = ({ Component }) => {
  const history = useHistory();

  let token = authService.getLocalStorageUserClaims()?.token;

  useEffect(() => {
    if (token) {
      history.push("/");
      return null;
    }
  });
  return !token ? <Component /> : <Home />;
};

export default IsGuest;