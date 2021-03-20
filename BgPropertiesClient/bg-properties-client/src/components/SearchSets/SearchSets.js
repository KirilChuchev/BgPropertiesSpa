import { useEffect, useState } from "react";

import SearchSetsList from "./SearchSetsList";

import authService from "../../services/authService";
import searchSetService from "../../services/searchSetService";

const SearchSets = () => {

  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  const [searchSets, setSearchSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchSetService.fetchAll(token).then((data) => {
      setSearchSets(data);
      setIsLoading(false);
    });
  }, [token]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <SearchSetsList username={userClaims.username} searchSets={searchSets} />
    </>
  );
};

export default SearchSets;
