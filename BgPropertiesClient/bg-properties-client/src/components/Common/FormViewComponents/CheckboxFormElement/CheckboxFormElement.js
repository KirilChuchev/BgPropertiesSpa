import { Field } from "formik";

const CheckboxFormElement = ({ element, searchSet, styles }) => {
  //searchSet -> за стилизация евент.
  return (
    <article id={element.name} className={styles.checkboxArticle}>
      <label htmlFor={element.id} className={styles.checkboxLabel}>
        <Field
          className={styles.checkboxField}
          type={element.type}
          name={element.name}
          id={element.id}
        />
        {element.text}
      </label>
    </article>
  );
};

export default CheckboxFormElement;
