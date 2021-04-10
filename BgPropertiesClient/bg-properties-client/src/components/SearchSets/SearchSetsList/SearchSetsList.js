import { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import SearchSetShortDetails from "../SearchSetShortDetails";
import ThemeContext from "../../../contexts/ThemeContext";

import { themeStyleSelector } from "../../../utils/themeStyleSelector";

import styles from "./SearchSetsList.module.css";

const SearchSetsList = ({ searchSets }) => {

  let { theme } = useContext(ThemeContext);

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
    <section className={themeStyleSelector(theme, styles, styles.lightThemeSearchSetShortDetailsListWrapper)}>
      <Link to="/">Go Home.</Link>

      {searchSets?.length > 0 && (
        <>
          <section className={styles.searchSetsListHeader}>
            <h4 className={styles.titleSection}>Вашите SearhcSet-ове:</h4>
            <Link className={styles.headerLink} to="/searchsets/create">
              Създайте нов SearchSet
            </Link>
          </section>
          <section className={styles.searchSetShortDetailsList}>
            {searchSets.map((x, index) => (
              <SearchSetShortDetails
                key={x.id}
                onSearchSetClick={onSearchSetClick}
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
