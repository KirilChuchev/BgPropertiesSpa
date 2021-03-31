import CheckboxFormElement from "../CheckboxFormElement";

const CheckboxGroupFormElement = ({
  id,
  checkboxElements,
  searchSet,
  handleChange,
}) => {
  return (
    <section id={id}>
      {checkboxElements &&
        checkboxElements.map((x) => (
          <CheckboxFormElement
            key={x.id}
            element={x}
            searchSet={searchSet}
            handleChange={handleChange}
          />
        ))}
      <hr />
    </section>
  );
};

export default CheckboxGroupFormElement;
