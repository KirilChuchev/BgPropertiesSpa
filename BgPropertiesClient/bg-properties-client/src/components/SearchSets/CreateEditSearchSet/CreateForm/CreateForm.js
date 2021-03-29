import { useState } from "react";
import { useHistory } from "react-router-dom";

import FormView from "../FormView";

import authService from "../../../../services/authService";
import searchSetService from "../../../../services/searchSetService";

import { FormHeadingsAndSubmitButton } from "../FormView/FormViewConstants";

const CreateForm = () => {
  const token = authService.getLocalStorageUserClaims().token;

  const history = useHistory();

  const [searchSet, setSearchSet] = useState({
    searchSetName: "",
    description: "",
    oneRoomPropType: "",
    twoRoomsPropType: "",
    threeRoomsPropType: "",
    fourRoomsPropType: "",
    multiRoomsPropType: "",
    maisonettePropType: "",
    studioPropType: "",
    officePropType: "",
    storePropType: "",
    restaurantPropType: "",
    warehousePropType: "",
    hotelPropType: "",
    industrialPropType: "",
    businessPropType: "",
    houseFloorPropType: "",
    housePropType: "",
    villagePropType: "",
    plotPropType: "",
    garagePropType: "",
    landPropType: "",
    priceFrom: "",
    priceTo: "",
    pricePerSqrMFrom: "",
    pricePerSqrMTo: "",
    sizeFrom: "",
    sizeTo: "",
    floorFrom: "",
    floorTo: "",
    cityRegion: "",
  });

  console.log(searchSet);

  function handleChange(event) {
    var obj = {};
    if (event.target.name.endsWith("PropType")) {
      obj[`${event.target.name}`] = event.target.checked ? "on" : "";
    } else {
      obj[`${event.target.name}`] = event.target.value;
    }
    console.log(obj);
    setSearchSet(() => ({ ...searchSet, ...obj }));
  }

  async function handleSubmit(event) {
    alert("Моля потвърдете, че желаете създаването на нов SearchSet!");
    event.preventDefault();
    console.log(searchSet);
    await searchSetService.create(token, { ...searchSet });
    history.push("/searchsets");
    return null;
  }

  return (
    <FormView
      form={FormHeadingsAndSubmitButton.createForm}
      searchSet={searchSet}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateForm;
