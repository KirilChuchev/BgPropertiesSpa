function getLocalStorageUserClaims() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function setLocalStorageUserClaims(userData) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem("currentUser", JSON.stringify(userData));
}

const authService = {
  getLocalStorageUserClaims,
  setLocalStorageUserClaims,
};

export default authService;
