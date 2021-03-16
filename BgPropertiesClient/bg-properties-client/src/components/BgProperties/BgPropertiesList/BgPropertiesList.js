import { Link } from "react-router-dom";
import BgPropertyShortDetails from "../BgPropertyShortDetails";

const BgPropertiesList = ({ bgProperties, searchSetName, onBgPropertyClick }) => {
  return (
    <>
      <Link to="/">Go Home.</Link>
      <h2>
        All BgProperties for{" "}
        <span style={{ color: "red" }}>{searchSetName}</span> -{" "}
        <span style={{ color: "green" }}>{bgProperties.length}</span> items.
      </h2>
      <ol>
        {bgProperties.map((x) => (
          <li key={x.id} onClick={() => onBgPropertyClick(x.id)}>
            {<BgPropertyShortDetails bgProperty={x} />}
          </li>
        ))}
      </ol>
    </>
  );
};

export default BgPropertiesList;
