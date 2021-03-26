import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import FormView from "../FormView";

import authService from "../../../../services/authService";
import searchSetService from "../../../../services/searchSetService";

const EditForm = ({ searchSetId }) => {
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

  useEffect(() => {
    searchSetService.fetchOne(token, searchSetId).then((data) => {
      console.log(data);
      let obj = {};
      data.searchCriterias.forEach((x) => {
        if (x.name.endsWith("PropType") && x.value) {
          obj[x.name] = "on";
        } else {
          obj[x.name] = x.value;
        }
      });
      obj["searchSetName"] = data.name;
      obj["description"] = data.description;
      console.log(obj);
      setSearchSet((searchSet) => ({ ...searchSet, ...obj }));
    });
  }, [token, searchSetId]);

  function handleChange(event) {
    var obj = {};
    if (event.target.name.endsWith("PropType")) {
      obj[`${event.target.name}`] = event.target.checked ? "on" : "";
    } else {
      obj[`${event.target.name}`] = event.target.value;
    }
    setSearchSet(() => ({ ...searchSet, ...obj }));
  }

  async function handleSubmit(event) {
    alert("Моля потвърдете, че желаете да промените Вашият SearchSet!");
    event.preventDefault();
    console.log(searchSet);
    await searchSetService.edit(token, searchSetId, { ...searchSet });
    history.push(`/searchsets/${searchSetId}`);
    return null;
  }

  return (
    <FormView
      searchSet={searchSet}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditForm;
