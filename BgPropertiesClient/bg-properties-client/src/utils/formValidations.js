import * as Yup from "yup";

import {
  FloorOptionInputFormElementConsts,
  LocationOptionInputFormElementConsts,
  PropTypeInputFormElementConsts,
  PriceInputFormElementConsts,
  PricePerSqrMInputFormElementConsts,
  SizeInputFormElementConsts,
  FloorInputFormElementConsts,
} from "../components/SearchSets/CreateEditSearchSet/FormView/FormViewConstants";

export const validateCreateEditSearchSetForm = (values) => {
  let errors = {};

  // SearchSetName
  if (String(values.searchSetName) === "") {
    errors.searchSetName = "Задайте имe на Вашия SearchSet.";
  }
  if (String(values.searchSetName) !== "" && values.searchSetName.length > 20) {
    errors.searchSetName =
      "Името на Вашия SearchSet не трябва да превишава 30 знака.";
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
    let field = PriceInputFormElementConsts.find((x) => x.id === "priceFrom")
      .text;
    errors.priceFrom = `Полето "${field}" трябва да съдържа цели, неотрицателни числа.`;
  }

  // Price to
  if (
    String(values.priceTo) !== "" &&
    (!String(values.priceTo).match(/^[0-9]+$/) || parseInt(values.priceTo) <= 0)
  ) {
    let field = PriceInputFormElementConsts.find((x) => x.id === "priceTo")
      .text;
    errors.priceTo = `Полето "${field}" трябва да съдържа цели положителни числа.`;
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
    let fieldOne = PriceInputFormElementConsts.find((x) => x.id === "priceFrom")
      .text;
    let fieldTwo = PriceInputFormElementConsts.find((x) => x.id === "priceTo")
      .text;
    errors.priceTo = `Стойността на полето "${fieldOne}" трябва да е по-голяма или равна на стойността на полето "${fieldTwo}"`;
  }

  // Price per square meter from
  if (
    String(values.pricePerSqrMFrom) !== "" &&
    !String(values.pricePerSqrMFrom).match(/^[0-9]+$/)
  ) {
    let field = PricePerSqrMInputFormElementConsts.find(
      (x) => x.id === "pricePerSqrMFrom"
    ).text;
    errors.pricePerSqrMFrom = `Полето "${field}" трябва да съдържа цели, неотрицателни числа.`;
  }

  // Price per square meter to
  if (
    String(values.pricePerSqrMTo) !== "" &&
    (!String(values.pricePerSqrMTo).match(/^[0-9]+$/) ||
      parseInt(values.pricePerSqrMTo) <= 0)
  ) {
    let field = PricePerSqrMInputFormElementConsts.find(
      (x) => x.id === "pricePerSqrMTo"
    ).text;
    errors.pricePerSqrMTo = `Полето "${field}" трябва да съдържа цели, положителни числа.`;
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
    let fieldOne = PricePerSqrMInputFormElementConsts.find(
      (x) => x.id === "pricePerSqrMFrom"
    ).text;
    let fieldTwo = PricePerSqrMInputFormElementConsts.find(
      (x) => x.id === "pricePerSqrMTo"
    ).text;
    errors.pricePerSqrMTo = `Стойността на полето "${fieldOne}" трябва да е по-голяма или равна на стойността на полето "${fieldTwo}"`;
  }

  // Size from
  if (
    String(values.sizeFrom) !== "" &&
    !String(values.sizeFrom).match(/^[0-9]+$/)
  ) {
    let field = SizeInputFormElementConsts.find((x) => x.id === "sizeFrom")
      .text;
    errors.sizeFrom = `Полето "${field}" трябва да съдържа цели, неотрицателни числа.`;
  }

  // Size to
  if (
    String(values.sizeTo) !== "" &&
    (!String(values.sizeTo).match(/^[0-9]+$/) || parseInt(values.sizeTo) <= 0)
  ) {
    let field = SizeInputFormElementConsts.find((x) => x.id === "sizeTo").text;
    errors.sizeTo = `Полето "${field}" трябва да съдържа цели, положителни числа.`;
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
    let fieldOne = SizeInputFormElementConsts.find((x) => x.id === "sizeFrom")
      .text;
    let fieldTwo = SizeInputFormElementConsts.find((x) => x.id === "sizeTo")
      .text;
    errors.sizeTo = `Стойността на полето "${fieldOne}" трябва да е по-голяма или равна на стойността на полето "${fieldTwo}"`;
  }

  // Floor from
  if (
    (!String(values.floorFrom) && String(values.floorFrom) !== "") ||
    !FloorOptionInputFormElementConsts.map((x) => x.value).includes(
      values.floorFrom
    )
  ) {
    let field = FloorInputFormElementConsts.find(
      (x) => x.id === "floorFrom"
    ).text;
    errors.floorFrom = `Полето "${field}" трябва да съдържа едно от изредените стойности.`;
  }

  // Floor To
  if (
    (!String(values.floorTo) && String(values.floorTo) !== "") ||
    !FloorOptionInputFormElementConsts.map((x) => x.value).includes(
      values.floorTo
    )
  ) {
    let field = FloorInputFormElementConsts.find(
      (x) => x.id === "floorTo"
    ).text;
    errors.floorTo = `Полето "${field}" трябва да съдържа едно от изредените стойности.`;
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
    let fieldOne = FloorInputFormElementConsts.find(
      (x) => x.id === "floorFrom"
    ).text;
    let fieldTwo = FloorInputFormElementConsts.find(
      (x) => x.id === "floorTo"
    ).text;
    errors.floorTo = `Етаж: "${fieldOne}" трябва да е по-голям или равен на Етаж: "${fieldTwo}".`;
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

export const validateRegisterLoginForm = (values) => {
  let errors = {};

  // Username
  if (
    values?.username !== undefined &&
    String(values.username) !== "" &&
    values.username.match(/[\W]/)
  ) {
    errors.username = "Username can only contain letters or digits.";
  }

  // Email
  if (
    String(values.email) !== "" &&
    !values.email.match(
      // eslint-disable-next-line
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    errors.email = "Invalid email format";
  }

  // Password
  if (
    !values.password.match(/[^a-zA-Z\d\s:]+/) ||
    !values.password.match(/[A-Z]/) ||
    !values.password.match(/[0-9]/) ||
    values.password.length < 6
  ) {
    errors.password = `Passwords must be at least 6 characters.
    Passwords must have at least one non alphanumeric character.
    Passwords must have at least one digit ('0'-'9').
    Passwords must have at least one uppercase ('A'-'Z').`;
  }
  return errors;
};

export const validationSchemaRegisterForm = Yup.object({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Required"),
  // phone: Yup.string().when("modeOfContact", {
  //   is: "telephonemoc",
  //   then: Yup.string().required("Required"),
  // }),
});

export const validationSchemaLoginForm = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
});
