import { useEffect } from "react";
import { useHistory } from "react-router";
import authService from "../../services/authService";
import Login from "../../components/Login";

const IsAuthenticated = ({Component}) => {
  const history = useHistory();

  let token = authService.getLocalStorageUserClaims()?.token;

  console.log("token before", token);

  useEffect(() => {
    console.log("here in");
    if (!token) {
      history.push("/login");
    return null;
    //   return <Login/>;
    }
  });
  //   return (
  //     <div>
  //       <Component />
  //     </div>
  //   );
  console.log("token after", token);

//   return Component;
  return token ? <Component/> : <Login/>;
};

export default IsAuthenticated;
