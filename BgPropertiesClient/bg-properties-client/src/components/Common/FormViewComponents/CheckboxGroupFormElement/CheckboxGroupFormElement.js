import CheckboxBlockFormElement from "../CheckboxBlockFormElement";

const CheckboxGroupFormElement = ({
  checkboxElements,
  checkboxBlocksDetails,
  title,
  searchSet,
  errors,
  styles
}) => {
  return (
    <section className={styles.checkboxGroup}
    // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
    >
      <h4 className={styles.checkboxGroupTitle}>{title}</h4>
      <section className={styles.checkboxBlocksWrapper}>
      {checkboxBlocksDetails &&
        checkboxBlocksDetails.map((x) => (
          <CheckboxBlockFormElement
            key={x.id}
            id={x.id}
            checkboxElements={checkboxElements.slice(x.from, x.to)}
            searchSet={searchSet}
            styles={styles}
          />
        ))}
      </section>
      
      <span className={styles.error}>{errors.checkboxes}</span>
    </section>
  );
};

export default CheckboxGroupFormElement;
