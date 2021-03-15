import React, { useState, useEffect } from "react";
import BgPropertiesList from "./BgPropertiesList";
import BgProperty from "./BgProperty";
import bgPropertyService from "../../services/bgPropertyService";
import { useParams } from "react-router";

const BgProperties = () => {
  let { searchSetId } = useParams();

  console.log("id: " + searchSetId);

  const [bgPropertiesModel, setBgPropertiesModel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBgPropertyClicked, setIsBgPropertyClicked] = useState(false);
  const [bgPropertyIdClicked, setBgPropertyIdClicked] = useState();

  useEffect(() => {
    // TODO: дали е правилно да дърпам от базата само колекцията или модела с колекцията
    bgPropertyService.fetchAll(searchSetId).then((data) => {
      setBgPropertiesModel(data);
      setIsLoading(false);
    });
  }, [searchSetId]);

  console.log(bgPropertiesModel);

  function onBgPropertyClick(id) {
    setIsBgPropertyClicked(true);
    setBgPropertyIdClicked(id);
  }

  if (isLoading) {
    return "Loading...";
  }

  if (isBgPropertyClicked) {
    let bgProperty = bgPropertiesModel.bgProperties.find(
      (x) => x.id === bgPropertyIdClicked
    );
    return <BgProperty bgProperty={bgProperty} />;
  }

  return (
    <>
      <BgPropertiesList
        bgProperties={bgPropertiesModel.bgProperties}
        searchSetName={bgPropertiesModel.searchSetName}
        onClick={onBgPropertyClick}
      />
    </>
  );
};

export default BgProperties;
