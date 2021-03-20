import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../../../services/authService";
import bgPropertyService from "../../../services/bgPropertyService";

const BgProperty = () => {

  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  let { bgPropertyId, searchSetId } = useParams();

  const [bgPropertyModel, setBgProperty] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let bgProperty = bgPropertyModel?.bgProperty;

  useEffect(() => {
    bgPropertyService
      .fetchOne(token, bgPropertyId, searchSetId)
      .then((data) => {
        setBgProperty(data);
        setIsLoading(false);
      });
  }, [token, bgPropertyId, searchSetId]);

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
            {bgProperty.isTracked || "n/a"}
          </p>
          <p>
            <strong>IsNewly: </strong>
            {bgProperty.isNewly || "n/a"}
          </p>
        </Fragment>
      )}
    </>
  );
};

export default BgProperty;
