const TextAreaFormElement = ({ details, value, handleChange }) => {
  return (
    //   <section>
    //     <label>
    //       <input
    //         type={details.type}
    //         name={details.name}
    //         id={details.id}
    //         checked={checked}
    //         onChange={handleChange}
    //       />
    //       {details.type != "text" ? details.text : ""}
    //     </label>
    //   </section>
    <textarea
      // style="background-color: "
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
