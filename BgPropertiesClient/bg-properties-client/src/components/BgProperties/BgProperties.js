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

  function resourceSelector(path) {
    if (path.includes("/statistics/top-profitable/")) {
      return "top-profitable";
    } else if (
      path.includes("/searchsets/") &&
      path.includes("/bg-properties") &&
      !path.includes("/all-tracked") &&
      !path.includes("/all-newly")
    ) {
      // console.log("all bgproperties");
      return "bg-properties";
    } else if (
      path.includes("/searchsets/") &&
      path.includes("/bg-properties/all-tracked") &&
      !path.includes("/all/")
    ) {
      return "searchset-tracked";
    } else if (
      path.includes("/statistics/searchsets/") &&
      path.includes("/bg-properties/all-newly") &&
      !path.includes("/all/")
    ) {
      // console.log("searchset-newly");
      return "searchset-newly";
    } else if (path.includes("/searchsets/all/bg-properties/all-tracked")) {
      // console.log("tracked");
      return "user-tracked";
    } else if (
      path.includes("/statistics/searchsets/all/bg-properties/all-newly")
    ) {
      // console.log("user-newly");
      return "user-newly";
    }
  }

  useEffect(() => {
    const bgPropertyServiceMap = {
      "bg-properties": (token, searchSetId) =>
        bgPropertyService.fetchAll(token, searchSetId),
      "top-profitable": (token, searchSetId) =>
        statisticService.fetchTopProfitable(token, searchSetId),
      "searchset-tracked": (token, searchSetId) =>
        bgPropertyService.searchSetTracked(token, searchSetId),
      "user-tracked": (token) => bgPropertyService.userTracked(token),
      "user-newly": (token) => statisticService.fetchUserNewly(token),
      "searchset-newly": (token, searchSetId) =>
        statisticService.fetchSearchSetNewly(token, searchSetId),
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
