import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Fragment, useEffect, useState } from "react";

import authService from "../../../services/authService";
import searchSetService from "../../../services/searchSetService";

const SearchSet = () => {
  // TODO: да махна празните критерии още при crate-a

  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  let { searchSetId } = useParams();

  const [searchSet, setSearchSet] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchSetService.fetchOne(token, searchSetId).then((data) => {
      setSearchSet(data);
      setIsLoading(false);
    });
  }, [token, searchSetId]);

  if (isLoading) {
    return "Loading...";
  }

  const style = {
    display: "block",
  }

  return (
    <>
      {searchSet && (
        <Fragment>
          <p>SearchSet FULL details:</p>
          <p>ID: {searchSet.id}</p>
          <p>SearchSet name: {searchSet.name}</p>
          <p>Created on: {searchSet.createdOn}</p>
          <p>Bg Properties count: {searchSet.bgPropertiesCount}</p>
          <p>Description: {searchSet.description}</p>
          <p>isInCheckingMode: {searchSet.isInCheckingMode}</p>
          <hr />
          <h3>Criterias:</h3>
          <ol>
            {searchSet.searchCriterias
              ?.filter((x) => x.value !== "")
              ?.map((x) => (
                <li key={x.name + x.value}>
                  <p>
                    <strong>{x.name}: </strong>
                    {x.value}
                  </p>
                </li>
              ))}
          </ol>
          {/* <Link to={`/searchsets/${searchSetId}/bg-properties/all/`} style={style}> */}
          <Link to={`/searchsets/${searchSetId}/bg-properties`} style={style}>
            Bg Properties
          </Link>
          <Link to={`/statistics/top-profitable/${searchSetId}`} style={style}>
            Top profitable BgProperties
          </Link>
          <Link to={`/searchsets/${searchSetId}/bg-properties/all-tracked`} style={style}>
            Tracked BgProperties
          </Link>
          <Link to={`/statistics/searchsets/${searchSetId}/bg-properties/all-newly`} style={style}>
            New BgProperties in this SearchSet
          </Link>
        </Fragment>
      )}
    </>
  );
};

export default SearchSet;
