const TextAreaFormElement = ({ details, value, handleChange }) => {
  return (
    <textarea
      maxLength="300"
      rows="6"
      cols="50"
      id={details.id}
      name={details.name}
      value={value}
      onChange={handleChange}
    ></textarea>
  );
};

export default TextAreaFormElement;
