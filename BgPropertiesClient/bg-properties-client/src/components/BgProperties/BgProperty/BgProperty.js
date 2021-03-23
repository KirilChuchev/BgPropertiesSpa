import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../../../services/authService";
import bgPropertyService from "../../../services/bgPropertyService";

const BgProperty = () => {

  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  let { bgPropertyId, searchSetId } = useParams();

  const [bgPropertyModel, setBgPropertyModel] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let bgProperty = bgPropertyModel?.bgProperty;

  useEffect(() => {
    bgPropertyService
      .fetchOne(token, bgPropertyId, searchSetId)
      .then((data) => {
        setBgPropertyModel(data);
        setIsLoading(false);
        // console.log("track");
      });
  }, [token, bgPropertyId, searchSetId, bgProperty?.isTracked]);

  async function trackBgProperty(token, bgPropertyId){
    await bgPropertyService.trackOne(token, bgPropertyId);
    setBgPropertyModel({...bgPropertyModel, bgProperty: {...bgProperty, isTracked: !bgProperty.isTracked}});
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      {bgPropertyModel && (
        <Fragment>
          <p>
            <strong>URL: </strong>
            {bgProperty.url || "n/a"}
          </p>
          <p>
            <strong>Created on: </strong>
            {bgProperty.createdOn || "n/a"}
          </p>
          <p>
            <strong>Type: </strong>
            {bgProperty.propertyType || "n/a"}
          </p>
          <p>
            <strong>Area: </strong>
            {bgProperty.area || "n/a"}
          </p>
          <p>
            <strong>Building Type: </strong>
            {bgProperty.buildingType || "n/a"}
          </p>
          <p>
            <strong>Building Year: </strong>
            {bgProperty.buildingYear || "n/a"}
          </p>
          <p>
            <strong>Location: </strong>
            {bgProperty.location || "n/a"}
          </p>
          <p>
            <strong>Floor: </strong>
            {bgProperty.floor || "n/a"}
          </p>
          <p>
            <strong>Total Building Floors: </strong>
            {bgProperty.totalBuildingFloors || "n/a"}
          </p>
          <p>
            <strong>Description: </strong>
            {bgProperty.description || "n/a"}
          </p>
          <p>
            <strong>Price (in EUR): </strong>
            {bgProperty.priceInEUR || "n/a"}
          </p>
          <p>
            <strong>PricePerSquareMeter (in EUR): </strong>
            {bgProperty.pricePerSquareMeterInEUR || "n/a"}
          </p>
          <p>
            <strong>IsTracked: </strong>
            {bgProperty.isTracked ? "Tracked" : "No"}
          </p>
          <p>
            <strong>IsNewly: </strong>
            {bgProperty.isNewly || "n/a"}
          </p>
          <button onClick={() => trackBgProperty(token, bgPropertyId)}>{bgProperty.isTracked ? "Un-Track" : "Track"}</button>
        </Fragment>
      )}
    </>
  );
};

export default BgProperty;
