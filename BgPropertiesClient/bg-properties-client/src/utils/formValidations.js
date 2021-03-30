import {
  FloorOptionInputFormElementConsts,
  LocationOptionInputFormElementConsts,
  PropTypeInputFormElementConsts,
  NameInputFormElementConst,
} from "../components/SearchSets/CreateEditSearchSet/FormView/FormViewConstants";

export const validateCreateEditSearchSetForm = (values) => {
  let errors = {};

  // SearchSetName
  if (String(values.searchSetName) === "") {
    errors.searchSetName = "Полето SearchSet не трябва да е празно.";
  }
  if (String(values.searchSetName) !== "" && values.searchSetName.length > 20) {
    errors.searchSetName =
      "Името на Вашия SearchSet не трябва да превишава 20 знака.";
  }

  // Description
  if (String(values.description) !== "" && values.description.length > 200) {
    errors.description = " Описанието не може да превишава 200 знака.";
  }

  // Price from
  if (
    String(values.priceFrom) !== "" &&
    !String(values.priceFrom).match(/^[0-9]+$/)
  ) {
    errors.priceFrom =
      'Полето "Цена на имота: -> от" трябва да съдържа цели, неотрицателни числа.';
  }

  // Price to
  if (
    String(values.priceTo) !== "" &&
    (!String(values.priceTo).match(/^[0-9]+$/) || parseInt(values.priceTo) <= 0)
  ) {
    errors.priceTo =
      'Полето "Цена на имота: -> до" трябва да съдържа цели положителни числа.';
  }

  // Price from && Price to
  if (
    String(values.priceFrom) !== "" &&
    String(values.priceFrom).match(/^[0-9]+$/) &&
    String(values.priceTo) !== "" &&
    String(values.priceTo).match(/^[0-9]+$/) &&
    parseInt(values.priceTo) > 0 &&
    parseInt(values.priceFrom) > parseInt(values.priceTo)
  ) {
    errors.priceTo =
      'Стойността на полето "Цена на имота: -> до" трябва да е по-голяма или равна на стойността на полето "Цена на имота: -> от"';
  }

  // Price per square meter from
  if (
    String(values.pricePerSqrMFrom) !== "" &&
    !String(values.pricePerSqrMFrom).match(/^[0-9]+$/)
  ) {
    errors.pricePerSqrMFrom =
      'Полето "Цена на кв.м площ: -> от" трябва да съдържа цели, неотрицателни числа.';
  }

  // Price per square meter to
  if (
    String(values.pricePerSqrMTo) !== "" &&
    (!String(values.pricePerSqrMTo).match(/^[0-9]+$/) ||
      parseInt(values.pricePerSqrMTo) <= 0)
  ) {
    errors.pricePerSqrMTo =
      'Полето "Цена на кв.м площ: -> до" трябва да съдържа цели, положителни числа.';
  }

  // Price per square meter from && Price per square meter to
  if (
    String(values.pricePerSqrMFrom) !== "" &&
    String(values.pricePerSqrMFrom).match(/^[0-9]+$/) &&
    String(values.pricePerSqrMTo) !== "" &&
    String(values.pricePerSqrMTo).match(/^[0-9]+$/) &&
    parseInt(values.pricePerSqrMTo) > 0 &&
    parseFloat(values.pricePerSqrMFrom) > parseFloat(values.pricePerSqrMTo)
  ) {
    errors.pricePerSqrMTo =
      'Стойността на полето "Цена на кв.м площ: -> до" трябва да е по-голяма или равна на стойността на полето "Цена на кв.м площ: -> от"';
  }

  // Size from
  if (
    String(values.sizeFrom) !== "" &&
    !String(values.sizeFrom).match(/^[0-9]+$/)
  ) {
    errors.sizeFrom =
      'Полето "Квадратура: -> от" трябва да съдържа цели, неотрицателни числа.';
  }

  // Size to
  if (
    String(values.sizeTo) !== "" &&
    (!String(values.sizeTo).match(/^[0-9]+$/) || parseInt(values.sizeTo) <= 0)
  ) {
    errors.sizeTo =
      'Полето "Квадратура: -> до" трябва да съдържа цели, положителни числа.';
  }

  // Size from && Size to
  if (
    String(values.sizeFrom) !== "" &&
    String(values.sizeFrom).match(/^[0-9]+$/) &&
    String(values.sizeTo) !== "" &&
    String(values.sizeTo).match(/^[0-9]+$/) &&
    parseInt(values.sizeTo) > 0 &&
    parseInt(values.sizeFrom) > parseInt(values.sizeTo)
  ) {
    errors.sizeTo =
      'Стойността на полето "Квадратура: -> до" трябва да е по-голяма или равна на стойността на полето "Квадратура: -> от"';
  }

  // Floor from
  if (
    (!String(values.floorFrom) && String(values.floorFrom) !== "") ||
    !FloorOptionInputFormElementConsts.map((x) => x.value).includes(
      values.floorFrom
    )
  ) {
    errors.floorFrom =
      'Полето "Етаж: -> от" трябва да съдържа едно от изредените стойности.';
  }

  // Floor To
  if (
    (!String(values.floorTo) && String(values.floorTo) !== "") ||
    !FloorOptionInputFormElementConsts.map((x) => x.value).includes(
      values.floorTo
    )
  ) {
    errors.floorTo =
      'Полето "Етаж: -> до" трябва да съдържа едно от изредените стойности.';
  }

  // Floor from && Floor To
  if (
    String(values.floorFrom) &&
    FloorOptionInputFormElementConsts.map((x) => x.value).includes(
      values.floorFrom
    ) &&
    String(values.floorTo) &&
    FloorOptionInputFormElementConsts.map((x) => x.value).includes(
      values.floorTo
    ) &&
    parseInt(values.floorFrom) > parseInt(values.floorTo)
  ) {
    errors.floorTo =
      '"Етаж: -> до" трябва да е по-голям или равен на "Етаж: -> от".';
  }

  // cityRegion
  if (
    !String(values.cityRegion) ||
    !LocationOptionInputFormElementConsts.map((x) => x.value)
      .filter((x) => String(x) !== "")
      .includes(values.cityRegion)
  ) {
    errors.cityRegion =
      "За местоположение трябва да изберете едно от изредените стойности.";
  }

  //PropTypes

  var propTypesClicked = Object.keys(values)
    .filter(
      (x) =>
        x.endsWith("PropType") && (values[x] === "on" || values[x] === true)
    )
    .map((x) => ({ key: x, value: values[x] }));

  console.log("PropTypes", propTypesClicked);

  if (propTypesClicked.length === 0) {
    errors.checkboxes =
      "Трябва да изберете поне едно поле от посочените групи категории.";
  }

  var blockClicked = new Set();
  for (const propType of propTypesClicked) {
    blockClicked.add(
      PropTypeInputFormElementConsts.find((x) => x.name === propType.key).block
    );
  }
  if (blockClicked.size > 1) {
    errors.checkboxes =
      "Не може да изберете едновременно полета от различни групи категории.";
  }

  console.log("blockClicked", blockClicked);

  return errors;
};
