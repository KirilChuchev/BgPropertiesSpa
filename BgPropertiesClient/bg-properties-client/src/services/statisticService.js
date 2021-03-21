import queryService from "./queryService";

function fetchTopProfitable(token, searchSetId) {
    return fetch(`/statistics/top-profitable/${searchSetId}`, {
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


  const statisticService = {
    fetchTopProfitable,
  }

  export default statisticService;