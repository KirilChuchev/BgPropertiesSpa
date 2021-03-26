const SelectFormElement = ({ optionsData, details, value, handleChange }) => {
  return (
    <section>
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
    </section>
  );
};

export default SelectFormElement;
