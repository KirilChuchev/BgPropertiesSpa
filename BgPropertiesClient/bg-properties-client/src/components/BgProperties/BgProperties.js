import React, { useState, useEffect } from "react";
import BgPropertiesList from "./BgPropertiesList";
import bgPropertyService from "../../services/bgPropertyService";
import { useParams } from "react-router";

const BgProperties = () => {
  let { searchSetId } = useParams();

  const [bgPropertiesModel, setBgPropertiesModel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: дали е правилно да дърпам от базата само колекцията или модела с колекцията
    bgPropertyService.fetchAll(searchSetId).then((data) => {
      setBgPropertiesModel(data);
      setIsLoading(false);
    });
  }, [searchSetId]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <BgPropertiesList
        bgProperties={bgPropertiesModel.bgProperties}
        searchSetName={bgPropertiesModel.searchSetName}
        searchSetId={searchSetId}
      />
    </>
  );
};

export default BgProperties;
