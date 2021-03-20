import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";

import BgPropertiesList from "./BgPropertiesList";
import bgPropertyService from "../../services/bgPropertyService";

import authService from "../../services/authService";

const BgProperties = () => {
  
  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  let { searchSetId } = useParams();

  const [bgPropertiesModel, setBgPropertiesModel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: дали е правилно да дърпам от базата само колекцията или модела с колекцията
    bgPropertyService.fetchAll(token, searchSetId).then((data) => {
      setBgPropertiesModel(data);
      setIsLoading(false);
    });
  }, [token, searchSetId]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      {bgPropertiesModel && (
        <BgPropertiesList
          bgProperties={bgPropertiesModel.bgProperties}
          searchSetName={bgPropertiesModel.searchSetName}
          searchSetId={searchSetId}
        />
      )}
    </>
  );
};

export default BgProperties;
