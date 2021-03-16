function create(obj) {
  return fetch(`/searchsets/create`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function fetchOne(id) {
  return fetch(`/searchsets/one/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

function fetchAll(userId) {
  return fetch(`/searchsets/all/${userId}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

const searchSetService = {
  create,
  fetchOne,
  fetchAll,
};

export default searchSetService;
