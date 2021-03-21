const BgPropertyShortDetails = ({ bgProperty }) => {

    return (
    <>
    <p>Type: {bgProperty.propertyType}</p>
    <p>Area: {bgProperty.area}</p>
    <p>Location: {bgProperty.location}</p>
    <p>Floor: {bgProperty.floor}</p>
    <p>Building Type: {bgProperty.buildingType}</p>
    <p>Building Year: {bgProperty.buildingYear}</p>
    <p>Price: {bgProperty.price}</p>
    <p>IsTracked: {bgProperty.isTracked ? "Tracked" : "No"}</p>
    <hr />
    </>
    )
}

export default BgPropertyShortDetails;