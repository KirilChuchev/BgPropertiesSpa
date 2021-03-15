function create(obj) {
  return fetch(`/searchset/`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function fetchOne(id) {
  fetch(`/searchset/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

function fetchAll(userId) {
  return fetch(`/searchset/all/${userId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

const searchSetService = {
  create,
  fetchOne,
  fetchAll,
};

export default searchSetService;
