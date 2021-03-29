import { Field, ErrorMessage } from "formik";

const CheckboxFormElement = ({ element, handleChange }) => {
  return (
    <article>
      <label htmlFor={element.id}>
        <Field
          type={element.type}
          name={element.name}
          id={element.id}
          onChange={handleChange}
        />
        <ErrorMessage name={element.name} />
        {element.text}
      </label>
    </article>
  );
};

export default CheckboxFormElement;
