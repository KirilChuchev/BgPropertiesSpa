import { Field, ErrorMessage } from "formik";

const TextAreaFormElement = ({ element, label }) => {
  return (
    <article className="form-control">
      <label htmlFor={element.id}>
        {label}
        <Field
          as="textarea"
          maxLength="300"
          rows="6"
          cols="50"
          id={element.id}
          name={element.name}
        />
        <ErrorMessage name={element.name} />
      </label>
    </article>
  );
};

export default TextAreaFormElement;