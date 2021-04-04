import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import SearchSetShortDetails from "../SearchSetShortDetails";

import styles from "./SearchSetsList.module.css";

const SearchSetsList = ({ searchSets }) => {
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
    <section className={styles.searchSetShortDetailsListWrapper}>
      <Link to="/">Go Home.</Link>

      {/* <h3>SearchSets for user: {username}</h3> */}

      {searchSets?.length > 0 && (
        <>
          <section className={styles.titleSection}>
            <h4>Вашите SearhcSet-ове:</h4>
            <Link className="button" to="/searchsets/create">
              Създайте нов SearchSet
            </Link>
          </section>
          <section className={styles.searchSetShortDetailsList}>
            {searchSets.map((x, index) => (
              <SearchSetShortDetails
                key={x.id}
                onClick={() => onSearchSetClick(x.id)}
                searchSet={x}
                index={index + 1}
              />
            ))}
          </section>
        </>
      )}
      {searchSets?.length === 0 && (
        <>
          <p>No data fetched.</p>
          <Link to="/searchsets/create">Създайте Вашият първи SearchSet</Link>
        </>
      )}
    </section>
  );
};

export default SearchSetsList;
