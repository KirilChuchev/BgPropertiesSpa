import { Fragment } from "react";

const SearchSetShortDetails = ({ searchSet }) => {
  function parseTime(str) {
    let date = new Date();
    return date.toString(str);
  }
  return (
    <Fragment>
      <p>{searchSet.name}</p>
      <p>{searchSet.bgPropertiesCount}</p>
      <p>{parseTime(searchSet.createdOn)}</p>
    </ Fragment>
  );
};

export default SearchSetShortDetails;
