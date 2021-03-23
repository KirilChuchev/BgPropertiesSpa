import './BgPropertyShortDetails.css';

const BgPropertyShortDetails = ({ bgProperty }) => {

    return (
    <article className={bgProperty.isNewly ? 'newly' : null}>
    <p>Type: {bgProperty.propertyType}</p>
    <p>Area: {bgProperty.area}</p>
    <p>Location: {bgProperty.location}</p>
    <p>Floor: {bgProperty.floor}</p>
    <p>Building Type: {bgProperty.buildingType}</p>
    <p>Building Year: {bgProperty.buildingYear}</p>
    <p>Price: {bgProperty.price}</p>
    <p>IsNewly: {bgProperty.isNewly ? "new" : "not new"}</p>
    <p>IsTracked: {bgProperty.isTracked ? "Tracked" : "No"}</p>
    <hr />
    </article>
    )
}

export default BgPropertyShortDetails;