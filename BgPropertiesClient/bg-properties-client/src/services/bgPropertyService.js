import queryService from "./queryService";

function fetchOne(token, bgPropertyId, searchSetId) {
  return fetch(
    `/bg-properties/one/${bgPropertyId}/${searchSetId}`,
    //   { mode: "no-cors" }
    //   , {
    //     credentials: 'include',
    //     mode: "no-cors",
    //     // credentials: 'same-origin',
    //     // : 'Allow-Origin',
    //   }
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(queryService.handleResponse)
    .catch((error) => console.log(error));
}

function fetchAll(token, searchSetId) {
  return fetch(`/bg-properties/all/${searchSetId}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(queryService.handleResponse)
    .catch((error) => console.log(error));
}

function trackOne(token, bgPropertyId) {
  return fetch(`/tracking/track`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bgPropertyId),
  })
    .then(queryService.handleResponse)
    .catch((error) => console.log(error));
}

function searchSetTracked(token, searchSetId) {
  console.log("here");
  return fetch(`/tracking/searchsets/${searchSetId}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  })
  .then(queryService.handleResponse)
  .catch((error) => console.log(error));
}

function userTracked(token) {
  return fetch(`/tracking/user`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  })
  .then(queryService.handleResponse)
  .catch((error) => console.log(error));
}

const bgPropertyService = {
  fetchOne,
  fetchAll,
  trackOne,
  searchSetTracked,
  userTracked,
};

export default bgPropertyService;
