import queryService from "./queryService";

function create(token, obj) {
  return fetch(`/searchsets/create`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(obj),
  })
    .then(queryService.handleResponse)
    .catch((err) => console.log(err));
}

function edit(token, searchSetId, obj) {
  return fetch(`/searchsets/edit/${searchSetId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(obj),
  })
    .then(queryService.handleResponse)
    .catch((err) => console.log(err));
}

function fetchOne(token, id) {
  return fetch(`/searchsets/one/${id}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(queryService.handleResponse)
    .catch((err) => console.log(err));
}

function fetchAll(token) {
  return fetch(`/searchsets/all/`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(queryService.handleResponse)
    // .catch((err) => console.log(err));
    .catch((error) => Promise.reject(error));
}

const searchSetService = {
  edit,
  create,
  fetchOne,
  fetchAll,
};

export default searchSetService;
