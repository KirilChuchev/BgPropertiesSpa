import CheckboxBlockFormElement from "../CheckboxBlockFormElement";

const CheckboxGroupFormElement = ({
  checkboxElements,
  checkboxBlocksDetails,
  label,
  searchSet,
  errors,
}) => {
  return (
    <section
    // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
    >
      <h4>{label}</h4>
      {checkboxBlocksDetails &&
        checkboxBlocksDetails.map((x) => (
          <CheckboxBlockFormElement
            key={x.id}
            id={x.id}
            checkboxElements={checkboxElements.slice(x.from, x.to)}
            searchSet={searchSet}
          />
        ))}
      <span>{errors.checkboxes}</span>
    </section>
  );
};

export default CheckboxGroupFormElement;
