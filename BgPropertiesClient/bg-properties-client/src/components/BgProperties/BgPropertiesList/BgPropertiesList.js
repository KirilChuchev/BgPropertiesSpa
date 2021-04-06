import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import BgPropertyShortDetails from "../BgPropertyShortDetails";

import styles from "./BgPropertiesList.module.css";

const BgPropertiesList = ({ bgProperties, searchSetId }) => {
  const [isBgPropertyClicked, setIsBgPropertyClicked] = useState(false);
  const [bgPropertyId, setBgPropertyId] = useState("");

  function onBgPropertyClick(id) {
    setIsBgPropertyClicked(true);
    setBgPropertyId(id);
  }

  if (isBgPropertyClicked) {
    return (
      <Redirect
        to={`/searchsets/${searchSetId}/bg-properties/${bgPropertyId}`}
      />
    );
  }

  return (
    <section className={styles.bgPropertyListWrapper}>
      <Link to="/">Go Home.</Link>

      {!!bgProperties?.length && (
        <>
          <h2 className={styles.titleSection}>
            Налични обяви за имоти -
            <span className={styles.bgPropertiesCount}>
              {" "}
              {bgProperties.length}{" "}
            </span>
            items.
          </h2>

          <section className={styles.bgPropertyShortDetailsList}>
            {bgProperties.map((x, index) => (
              <BgPropertyShortDetails
                key={x.id}
                index={index + 1}
                bgProperty={x}
                onBgPropertyClick={onBgPropertyClick}
              />
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default BgPropertiesList;
