function validateAuthResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

function getLocalStorageUserClaims() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function setLocalStorageUserClaims(userData) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem("currentUser", JSON.stringify(userData));
}

const authService = {
  validateAuthResponse,
  getLocalStorageUserClaims,
  setLocalStorageUserClaims,
};

export default authService;
