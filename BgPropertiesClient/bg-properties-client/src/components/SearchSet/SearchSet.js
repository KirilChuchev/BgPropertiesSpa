import { Link } from "react-router-dom";

const SearchSet = ({ searchSet }) => {
  console.log(searchSet);
  // TODO: да махна празните критерии още при crate-a
  return (
    <>
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
      <button href="">BgProperties</button>
      <Link to={`/bg-properties/all/${searchSet.id}`} >Bg Properties</Link>
    </>
  );
};

export default SearchSet;
