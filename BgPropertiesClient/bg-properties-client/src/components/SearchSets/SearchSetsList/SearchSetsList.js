import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import SearchSetShortDetails from "../SearchSetShortDetails";

const SearchSetsList = ({ searchSets, username }) => {
  
  const [isClicked, setIsClicked] = useState(false);
  const [searchSetIdClicked, setSearchSetIdClicked] = useState(false);

  function onSearchSetClick(id) {
    setIsClicked(true);
    setSearchSetIdClicked(id);
  }

  if (isClicked) {
    return <Redirect to={`/searchsets/${searchSetIdClicked}`} />;
  }

  return (
    <>
      <Link to="/">Go Home.</Link>
      <h2>Your SearchSets - short information:</h2>
      <h3>SearchSets for user: {username}</h3>
      <Link to="/searchsets/create">Create new SearchSet</Link>

      {searchSets?.length > 0 && (
        <ol>
          {searchSets.map((x) => (
            <li key={x.id} onClick={() => onSearchSetClick(x.id)}>
              {<SearchSetShortDetails searchSet={x} />}
            </li>
          ))}
        </ol>
      )}
      {searchSets?.length === 0 && (
        <p>No data fetched.</p>
      )}
    </>
  );
};

export default SearchSetsList;
