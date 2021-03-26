const SelectFormElement = ({ optionsData, details, value, handleChange }) => {
  return (
    <article>
      <label htmlFor={details.id}>
        {details.type === "text" && <p>{details.text}</p>}
        <select
          id={details.id}
          name={details.name}
          value={value}
          onChange={handleChange}
        >
          {optionsData &&
            optionsData.map((x) => (
              <option key={x.value} value={x.value}>
                {x.text}
              </option>
            ))}
        </select>
      </label>
    </article>
  );
};

export default SelectFormElement;
