import { Link } from "react-router-dom";
import { useState } from "react";
import SearchSetShortDetails from "../SearchSetShortDetails";
import SearchSet from "../SearchSet";

const SearchSetsList = ({ searchSets, userId }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [searchSetIdClicked, setSearchSetIdClicked] = useState(false);

  function onSearchSetClick(id) {
    setIsClicked(true);
    setSearchSetIdClicked(id)
  }

  if (isClicked) {
    return <SearchSet searchSet={searchSets.find(x => x.id === searchSetIdClicked)}/>;
  }

  return (
    <>
      <Link to="/">Go Home.</Link>
      <h2>Your SearchSets - short information:</h2>
      <h3>SearchSets for user: {userId}</h3>
      <ol>
        {searchSets.map((x) => (
          <li key={x.id} onClick={() => onSearchSetClick(x.id)}>
            {<SearchSetShortDetails searchSet={x} />}
          </li>
        ))}
      </ol>
    </>
  );
};

export default SearchSetsList;
