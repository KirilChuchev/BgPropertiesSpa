import { useHistory } from "react-router-dom";

import FormView from "../FormView";

import authService from "../../../../services/authService";
import searchSetService from "../../../../services/searchSetService";

import { FormHeadingsAndSubmitButton } from "../FormView/FormViewConstants";

const CreateForm = () => {
  const token = authService.getLocalStorageUserClaims().token;

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
  }

  async function handleSubmit(values) {
    alert("Моля потвърдете, че желаете създаването на нов SearchSet!");
    var searchSet = {};
    for (const valueName of Object.keys(values)) {
      if (valueName.endsWith("PropType")) {
        searchSet[`${valueName}`] = values[valueName] === true ? "on" : "";
      } else {
        searchSet[`${valueName}`] = (String)(values[valueName]);
      }
    }
    console.log("Submitted searchSet", searchSet);
    await searchSetService.create(token, { ...searchSet });
    history.push("/searchsets");
    return null;
  }

  return (
    <FormView
      form={FormHeadingsAndSubmitButton.createForm}
      searchSet={searchSetInitialValues}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateForm;
