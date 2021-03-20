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

const bgPropertyService = {
  fetchOne,
  fetchAll,
};

export default bgPropertyService;
