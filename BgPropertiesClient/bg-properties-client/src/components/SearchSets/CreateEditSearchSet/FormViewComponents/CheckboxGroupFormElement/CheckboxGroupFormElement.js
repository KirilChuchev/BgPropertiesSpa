import PropTypeBlockFormElement from "../PropTypeBlockFormElement";

const CheckboxGroupFormElement = ({
  checkboxBlocksDetails,
  checkboxElements,
  label,
  searchSet,
  handleChange,
}) => {
  return (
    <section>
      <h4>{label}</h4>
      {checkboxBlocksDetails &&
        checkboxBlocksDetails.map((x) => (
          <PropTypeBlockFormElement
            key={x.id}
            blockDetails={x}
            checkboxElements={checkboxElements}
            searchSet={searchSet}
            handleChange={handleChange}
          />
        ))}
    </section>
  );
};

export default CheckboxGroupFormElement;
