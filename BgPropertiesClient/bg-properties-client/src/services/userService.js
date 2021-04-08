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
  })
  .catch((err) => {
    return Promise.reject(err);
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
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  console.log("Successfully logout.");
}

function userDataInfo(token) {
  return fetch(`/user/data-info`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  })
  .then(queryService.handleResponse)
  // .catch((error) => console.log(error));
  .catch((error) => Promise.reject(error));
}

const userService = {
  register,
  registerAdmin,
  login,
  logout,
  userDataInfo,
};

export default userService;
