import CheckboxFormElement from "../CheckboxFormElement";

const CheckboxGroupFormElement = ({ id, checkboxElements, handleChange }) => {
  return (
    <section id={id}>
      {checkboxElements &&
        checkboxElements.map((x) => (
          <CheckboxFormElement
            key={x.id}
            element={x}
            handleChange={handleChange}
          />
        ))}
    </section>
  );
};

export default CheckboxGroupFormElement;
