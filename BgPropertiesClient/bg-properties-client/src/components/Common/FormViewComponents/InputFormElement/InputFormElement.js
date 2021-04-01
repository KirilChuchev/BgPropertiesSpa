import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";

const InputFormElement = ({ label, element }) => {
  return (
   
    <article>
      <label htmlFor={element.id}>
        {label}
        {element.text}
        <Field
          type={element.type}
          name={element.name}
          id={element.id}
          autoFocus={element.autofocus}
        />
      </label>
      <ErrorMessage component={TextError} name={element.name} nameValue={element.name} /> 
    </article>
  );
};

export default InputFormElement;
