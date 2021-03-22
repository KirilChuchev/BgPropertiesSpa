import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";

import BgPropertiesList from "./BgPropertiesList";
import bgPropertyService from "../../services/bgPropertyService";

import authService from "../../services/authService";
import statisticService from "../../services/statisticService";

const BgProperties = () => {
  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  let { searchSetId } = useParams();

  const [bgPropertiesModel, setBgPropertiesModel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let location = useLocation();
  let resource = resourceSelector(location.pathname);

  // /searchsets/:searchSetId/bg-properties/all-tracked

  function resourceSelector(path) {
    if (path.includes("/statistics/top-profitable/")) {
      return "top-profitable";
    } else if (
      path.includes("/searchsets/") &&
      path.includes("/bg-properties/all/")
    ) {
      return "bg-properties";
    } else if (
      path.includes("/searchsets/") &&
      path.includes("/bg-properties/all-tracked/") &&
      !path.includes("/all/")
    ) {
      return "searchset-tracked";
    } else if (path.includes("/searchsets/all/bg-properties/all-tracked/")) {
      return "user-tracked";
    }
  }

  useEffect(() => {
    // TODO: дали е правилно да дърпам от базата само колекцията или модела с колекцията
    const bgPropertyServiceMap = {
      "bg-properties": (token, searchSetId) =>
        bgPropertyService.fetchAll(token, searchSetId),
      "top-profitable": (token, searchSetId) =>
        statisticService.fetchTopProfitable(token, searchSetId),
      "searchset-tracked": (token, searchSetId) =>
        bgPropertyService.searchSetTracked(token, searchSetId),
      "user-tracked": (token) => bgPropertyService.userTracked(token),
    };

    bgPropertyServiceMap[resource](token, searchSetId).then((data) => {
      setBgPropertiesModel(data);
      setIsLoading(false);
    });
  }, [token, searchSetId, resource]);

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
