function fetchOne(id) {
  return fetch(
    `/BgProperty/onlyId/${id}`,
    //   { mode: "no-cors" }
    //   , {
    //     credentials: 'include',
    //     mode: "no-cors",
    //     // credentials: 'same-origin',
    //     // : 'Allow-Origin',
    //   }
    {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //   }
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

function fetchAll(searchSetId) {
  return fetch(`/bg-property/all/${searchSetId}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

const bgPropertyService = {
  fetchOne,
  fetchAll,
};

export default bgPropertyService;
