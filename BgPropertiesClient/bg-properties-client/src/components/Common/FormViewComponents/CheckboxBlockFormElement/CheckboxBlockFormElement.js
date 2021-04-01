import CheckboxFormElement from "../CheckboxFormElement";

const CheckboxGroupFormElement = ({
  id,
  checkboxElements,
  searchSet,
}) => {
  return (
    <section id={id}>
      {checkboxElements &&
        checkboxElements.map((x) => (
          <CheckboxFormElement
            key={x.id}
            element={x}
            searchSet={searchSet}
          />
        ))}
      <hr />
    </section>
  );
};

export default CheckboxGroupFormElement;
