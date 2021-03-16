import React, { useState, useEffect } from "react";
import BgPropertiesList from "./BgPropertiesList";
import bgPropertyService from "../../services/bgPropertyService";
import { useParams, Redirect } from "react-router";

const BgProperties = () => {
  let { searchSetId } = useParams();

  const [bgPropertiesModel, setBgPropertiesModel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBgPropertyClicked, setIsBgPropertyClicked] = useState(false);
  const [bgPropertyIdClicked, setBgPropertyIdClicked] = useState();
  // const history = useHistory();

  useEffect(() => {
    // TODO: дали е правилно да дърпам от базата само колекцията или модела с колекцията
    bgPropertyService.fetchAll(searchSetId).then((data) => {
      setBgPropertiesModel(data);
      setIsLoading(false);
    });
  }, [searchSetId]);

  function onBgPropertyClick(id) {
    setIsBgPropertyClicked(true);
    setBgPropertyIdClicked(id);
  }

  if (isLoading) {
    return "Loading...";
  }

  if (isBgPropertyClicked) {
    // history.push(`/bg-properties/one/${bgPropertyIdClicked}/${searchSetId}`)
    // return <></>;
    return <Redirect to={`/bg-properties/one/${bgPropertyIdClicked}/${searchSetId}`} />;
  }

  return (
    <>
      <BgPropertiesList
        bgProperties={bgPropertiesModel.bgProperties}
        searchSetName={bgPropertiesModel.searchSetName}
        onBgPropertyClick={onBgPropertyClick}
      />
    </>
  );
};

export default BgProperties;
