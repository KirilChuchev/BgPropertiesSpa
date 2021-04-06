export const extractSearchSetCriteriasByType = (searchCriterias, predicate) => {
  return searchCriterias.filter((x) => x.value !== "").filter(predicate);
};

export const parseTime = (str) => {
    let date = Date(str);
    let endIndex = date.indexOf("GMT");
    let res = date.slice(0, endIndex);
    return res;
  }
