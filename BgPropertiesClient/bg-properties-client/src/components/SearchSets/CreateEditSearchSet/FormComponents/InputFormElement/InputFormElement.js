const InputFormElement = ({ details, value, handleChange }) => {
  return (
    <section>
      <label>
        <input
          type={details.type}
          name={details.name}
          id={details.id}
          checked={value}
          onChange={handleChange}
        />
        {details.type !== "text" ? details.text : ""}
      </label>
      <span
        // style="color: red; background-color: lightyellow"
        // class="field-validation-valid"
        validation-for={details.id}
      ></span>
    </section>
  );
};

export default InputFormElement;
