import { themeStyleConsts } from "../constants/themeStyleConsts";

// /**
//  * @param {string} theme
//  * @param {string} style - certain style
//  */
export const themeStyleSelector = (theme, styles, style) => {
  console.log("old", style);
  console.log(theme);

  let styleNameAsString = String(style);
  let firstUnderscoreIndex = styleNameAsString.indexOf("_");
  let secondUnderscoreIndex = styleNameAsString.indexOf("__");
  console.log(firstUnderscoreIndex);
  let letterToUpperCase = styleNameAsString[
    firstUnderscoreIndex + 1
  ].toUpperCase();

  let themeName = themeStyleConsts.find(x => x.key === (String)(theme)).value + "Theme";

  let modifiedStyleName =
    themeName +
    letterToUpperCase +
    styleNameAsString.substring(
      firstUnderscoreIndex + 2,
      secondUnderscoreIndex
    );
  console.log("new", modifiedStyleName);
  return styles[`${modifiedStyleName}`];
};
