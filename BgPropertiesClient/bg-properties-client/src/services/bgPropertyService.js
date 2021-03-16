function fetchOne(bgPropertyId, searchSetId) {
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
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

function fetchAll(searchSetId) {
  return fetch(`/bg-properties/all/${searchSetId}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

const bgPropertyService = {
  fetchOne,
  fetchAll,
};

export default bgPropertyService;
