import { Link } from "react-router-dom";
import userService from "../../services/userService";
import authService from "../../services/authService";

const Home = () => {
  var userClaims = authService.getLocalStorageUserClaims();
  return (
    <>
      {userClaims !== null && <p>Hello, {userClaims.username}</p>}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {userClaims === null ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/searchsets">All your searchSets</Link>
            </li>
            <li>
              <Link to="/searchsets/all/bg-properties/all-tracked">All your Tracked BgProperties</Link>
            </li>
            <li>
              <Link to="/statistics/searchsets/all/bg-properties/all-newly">All Newly BgProperties</Link>
            </li>
            <li>
              <Link to="/" onClick={() => userService.logout()}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Home;
