import { useEffect, useState } from "react";
import searchSetService from "../../services/searchSetService";
import SearchSetsList from "./SearchSetsList";

const SearchSets = ({ userId }) => {
  const [searchSets, setSearchSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchSetService.fetchAll(userId).then((data) => {
      setSearchSets(data);
      setIsLoading(false);
    });
  }, [userId]);

  if (isLoading) {
    return "Loading...";
  }

  if (!searchSets) {
    return "No data fetched.";
  }

  return (
    <>
      <SearchSetsList userId={userId} searchSets={searchSets} />
    </>
  );
};

export default SearchSets;
