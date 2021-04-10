import { themeStyleConsts } from "../constants/themeStyleConsts";

// /**
//  * @param {string} theme
//  * @param {string} style - certain style
//  */
export const themeStyleSelector = (theme, styles, style) => {
  let styleNameAsString = String(style);
  let firstUnderscoreIndex = styleNameAsString.indexOf("Theme");
  let secondUnderscoreIndex = styleNameAsString.indexOf("__");

  let themeName = themeStyleConsts.find((x) => x.key === String(theme)).value;

  let modifiedStyleName =
    themeName +
    styleNameAsString.substring(firstUnderscoreIndex, secondUnderscoreIndex);
  return styles[`${modifiedStyleName}`];
};
