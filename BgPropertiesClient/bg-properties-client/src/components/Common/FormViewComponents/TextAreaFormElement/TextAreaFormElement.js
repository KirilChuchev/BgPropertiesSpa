import { Field, ErrorMessage } from "formik";

const TextAreaFormElement = ({ element, title, label, styles }) => {
  return (
    <article className={styles.textAreaArticle}>
      <h4 className={styles.textAreaTitle}>{title}</h4>
      <label htmlFor={element.id} className={styles.textAreaLabel}>
        {label}
        <Field
          as="textarea"
          maxLength="300"
          rows="4"
          cols="50"
          className={styles.textAreaField}
          id={element.id}
          name={element.name}
        />
        <ErrorMessage name={element.name} />
      </label>
    </article>
  );
};

export default TextAreaFormElement;
