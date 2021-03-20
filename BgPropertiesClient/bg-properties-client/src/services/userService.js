import authService from "./authService";
import queryService from "./queryService";

function register(userCredentials) {
  return fetch("/user/register", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(userCredentials),
  })
  .then(queryService.handleResponse)
  .then((userClaims) => {
    authService.setLocalStorageUserClaims(userClaims);
    return userClaims;
  });
}

function registerAdmin() {}

function login(userCredentials) {
  return fetch("/user/login", {
    method: "POST",
    // mode: "no-cors",
    // credentials: "",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(userCredentials),
  })
    .then(queryService.handleResponse)
    .then((userClaims) => {
      authService.setLocalStorageUserClaims(userClaims);
      return userClaims;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  console.log("Successfully logout.");
}

const userService = {
  register,
  registerAdmin,
  login,
  logout,
};

export default userService;
