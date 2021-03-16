import React, { useState } from "react";
import { Link, Redirect} from "react-router-dom";
import BgPropertyShortDetails from "../BgPropertyShortDetails";

const BgPropertiesList = ({ bgProperties, searchSetName, searchSetId }) => {

  const [isBgPropertyClicked, setIsBgPropertyClicked] = useState(false);
  const [bgPropertyId, setBgPropertyId] = useState("");

  function onBgPropertyClick(id) {
    setIsBgPropertyClicked(true);
    setBgPropertyId(id);
  }

  if (isBgPropertyClicked) {
    // history.push(`/bg-properties/one/${bgPropertyIdClicked}/${searchSetId}`)
    // return <></>;
    return <Redirect to={`/searchsets/${searchSetId}/bg-properties/${bgPropertyId}`} />;
  }


  return (
    <>
      <Link to="/">Go Home.</Link>
      <h2>
        All BgProperties for{" "}
        <span style={{ color: "red" }}>{searchSetName}</span> -{" "}
        <span style={{ color: "green" }}>{bgProperties.length}</span> items.
      </h2>
      <ol>
        {bgProperties.map((x) => (
          <li key={x.id} onClick={() => onBgPropertyClick(x.id)}>
            {<BgPropertyShortDetails bgProperty={x} />}
          </li>
        ))}
      </ol>
    </>
  );
};

export default BgPropertiesList;
