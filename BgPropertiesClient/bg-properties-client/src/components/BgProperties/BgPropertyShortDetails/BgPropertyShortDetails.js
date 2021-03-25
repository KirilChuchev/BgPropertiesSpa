import "./BgPropertyShortDetails.css";

const BgPropertyShortDetails = ({ resource, bgProperty }) => {
  return (
    <article className={bgProperty.isNewly ? "newly" : null}>
      <p>Type: {bgProperty.propertyType}</p>
      <p>Area: {bgProperty.area}</p>
      <p>Location: {bgProperty.location}</p>
      <p>Floor: {bgProperty.floor}</p>
      <p>Building Type: {bgProperty.buildingType}</p>
      <p>Building Year: {bgProperty.buildingYear}</p>
      <p>Price: {bgProperty.price}</p>
      {resource !== "user-tracked" && (
        <p>IsNewly: {bgProperty.isNewly ? "new" : "Not new"}</p>
      )}
      <p>IsTracked: {bgProperty.isTracked ? "Tracked" : "No"}</p>
      <hr />
    </article>
  );
};

export default BgPropertyShortDetails;
