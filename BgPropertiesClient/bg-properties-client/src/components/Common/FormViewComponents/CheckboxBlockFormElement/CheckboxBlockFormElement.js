import CheckboxFormElement from "../CheckboxFormElement";

const CheckboxBlockFormElement = ({
  id,
  checkboxElements,
  searchSet,
  styles,
}) => {
  return (
    <section id={id} className={styles.checkboxBlock}>
      {checkboxElements &&
        checkboxElements.map((x) => (
          <CheckboxFormElement
            key={x.id}
            element={x}
            searchSet={searchSet}
            styles={styles}
          />
        ))}
    </section>
  );
};

export default CheckboxBlockFormElement;
