import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import BgPropertyShortDetails from "../BgPropertyShortDetails";
// import authService from "../../../services/authService";
// import bgPropertyService from "../../../services/bgPropertyService";

import styles from "./BgPropertiesList.module.css";

const BgPropertiesList = ({
  resource,
  bgProperties,
  searchSetName,
  searchSetId,
}) => {
  // const userClaims = authService.getLocalStorageUserClaims();
  // var token = userClaims.token;

  const [isBgPropertyClicked, setIsBgPropertyClicked] = useState(false);
  const [bgPropertyId, setBgPropertyId] = useState("");

  function onBgPropertyClick(id) {
    setIsBgPropertyClicked(true);
    setBgPropertyId(id);
  }

  // function onTrackClick(bgPropertyId) {
  //   bgPropertyService.trackOne(token, bgPropertyId);
  // }

  if (isBgPropertyClicked) {
    // history.push(`/bg-properties/one/${bgPropertyIdClicked}/${searchSetId}`)
    // return <></>;

    return (
      <Redirect
        to={`/searchsets/${searchSetId}/bg-properties/${bgPropertyId}`}
      />

      // <Redirect
      //   to={{
      //     pathname: `/searchsets/${searchSetId}/bg-properties/${bgPropertyId}`,
      //     staticContext: () => onTrackClick(),
      //   }}
      // />
    );
  }

  return (
    <section className={styles.bgPropertyListWrapper}>
      <Link to="/">Go Home.</Link>

      {!!bgProperties?.length && (
        <>
          <h2 className={styles.titleSection}>
            Налични обяви за имоти -
            <span className={styles.bgPropertiesCount}> {bgProperties.length} </span>
            items.
          </h2>

          <section className={styles.bgPropertyShortDetailsList}>
            {bgProperties.map((x, index) => (
              <BgPropertyShortDetails
                key={x.id}
                resource={resource}
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
