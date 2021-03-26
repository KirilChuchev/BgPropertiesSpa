const InputFormElement = ({ details, value, handleChange }) => {
  return (
    <article>
      <label>
        {details.type === "text" && <p>{details.text}</p>}
        <input
          type={details.type}
          name={details.name}
          id={details.id}
          checked={value}
          value={value}
          onChange={handleChange}
        />
        {details.type === "checkbox" && details.text}
      </label>
      <span
        // style="color: red; background-color: lightyellow"
        // class="field-validation-valid"
        validation-for={details.id}
      ></span>
    </article>
  );
};

export default InputFormElement;
