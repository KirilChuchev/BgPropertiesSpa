import { useHistory } from "react-router-dom";

import FormView from "../FormView";

import authService from "../../../../services/authService";
import searchSetService from "../../../../services/searchSetService";

import { FormHeadingsAndSubmitButton } from "../FormView/FormViewConstants";
import { useContext } from "react";
import ThemeContext from "../../../../contexts/ThemeContext";

const CreateForm = () => {
  const token = authService.getLocalStorageUserClaims().token;

  let { theme } = useContext(ThemeContext);

  const history = useHistory();

  var searchSetInitialValues = {
    searchSetName: "",
    description: "",
    oneRoomPropType: false,
    twoRoomsPropType: false,
    threeRoomsPropType: false,
    fourRoomsPropType: false,
    multiRoomsPropType: false,
    maisonettePropType: false,
    studioPropType: false,
    officePropType: false,
    storePropType: false,
    restaurantPropType: false,
    warehousePropType: false,
    hotelPropType: false,
    industrialPropType: false,
    businessPropType: false,
    houseFloorPropType: false,
    housePropType: false,
    villagePropType: false,
    plotPropType: false,
    garagePropType: false,
    landPropType: false,
    priceFrom: "",
    priceTo: "",
    pricePerSqrMFrom: "",
    pricePerSqrMTo: "",
    sizeFrom: "",
    sizeTo: "",
    floorFrom: "",
    floorTo: "",
    cityRegion: "",
  };

  function handleSubmit(values) {
    alert("Моля потвърдете, че желаете създаването на нов SearchSet!");

    var searchSet = {};
    for (const valueName of Object.keys(values)) {
      if (valueName.endsWith("PropType")) {
        searchSet[`${valueName}`] = values[valueName] === true ? "on" : "";
      } else {
        searchSet[`${valueName}`] = String(values[valueName]);
      }
    }
    searchSetService
      .create(token, { ...searchSet })
      .then(() => {
        history.push("/searchsets");
        return null;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <FormView
      form={FormHeadingsAndSubmitButton.createForm}
      searchSet={searchSetInitialValues}
      theme={theme}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateForm;
