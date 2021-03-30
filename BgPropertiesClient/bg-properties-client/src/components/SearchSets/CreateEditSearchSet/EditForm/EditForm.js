import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import FormView from "../FormView";

import authService from "../../../../services/authService";
import searchSetService from "../../../../services/searchSetService";

import { FormHeadingsAndSubmitButton } from "../FormView/FormViewConstants";

const EditForm = ({ searchSetId }) => {
  const token = authService.getLocalStorageUserClaims().token;

  const history = useHistory();

  const [searchSet, setSearchSet] = useState({
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
  });

  console.log(searchSet);

  useEffect(() => {
    searchSetService.fetchOne(token, searchSetId).then((data) => {
      console.log(data);
      let obj = {};
      data.searchCriterias.forEach((x) => {
        if (x.name.endsWith("PropType") && x.value) {
          obj[x.name] = true;
        } else if (x.name.endsWith("PropType") && !x.value) {
          obj[x.name] = false;
        } else {
          obj[x.name] = x.value;
        }
        return obj;
      });
      obj["searchSetName"] = data.name;
      obj["description"] = data.description;
      console.log(obj);
      setSearchSet((searchSet) => ({ ...searchSet, ...obj }));
    });
  }, [token, searchSetId]);

  // function handleChange(event) {
  //   var obj = {};
  //   if (event.target.name.endsWith("PropType")) {
  //     obj[`${event.target.name}`] = event.target.checked ? "on" : "";
  //   } else {
  //     obj[`${event.target.name}`] = event.target.value;
  //   }
  //   setSearchSet(() => ({ ...searchSet, ...obj }));
  // }

  // async function handleSubmit(event, values, submitProps) {
  async function handleSubmit(values) {
    alert("Моля потвърдете, че желаете да промените Вашият SearchSet!");
    // event.preventDefault();

    var searchSet = {};
    for (const valueName of Object.keys(values)) {
      if (valueName.endsWith("PropType")) {
        searchSet[`${valueName}`] =
          values[valueName] === true || values[valueName] === "on" ? "on" : "";
      } else {
        searchSet[`${valueName}`] = values[valueName];
      }
    }

    console.log("Submitted searchSet", searchSet);
    // submitProps.setSubmitting(false);
    // await searchSetService.edit(token, searchSetId, { ...searchSet });
    // history.push(`/searchsets/${searchSetId}`);
    return null;
  }

  return (
    <FormView
      form={FormHeadingsAndSubmitButton.editForm}
      searchSet={searchSet}
      // handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditForm;
