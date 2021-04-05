export const extractSearchSetCriteriasByType = (searchCriterias, predicate) => {
  return searchCriterias.filter((x) => x.value !== "").filter(predicate);
};
