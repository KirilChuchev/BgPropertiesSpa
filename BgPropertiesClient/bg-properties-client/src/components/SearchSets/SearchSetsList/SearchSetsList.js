import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import SearchSetShortDetails from "../SearchSetShortDetails";

const SearchSetsList = ({ searchSets, userId }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [searchSetIdClicked, setSearchSetIdClicked] = useState(false);

  function onSearchSetClick(id) {
    setIsClicked(true);
    setSearchSetIdClicked(id);
  }

  if (isClicked) {
    return <Redirect to={`/searchsets/one/${searchSetIdClicked}`} />;
  }

  return (
    <>
      <Link to="/">Go Home.</Link>
      <h2>Your SearchSets - short information:</h2>
      <h3>SearchSets for user: {userId}</h3>
      <Link to="/searchsets/create/">Create new SearchSet</Link>

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
