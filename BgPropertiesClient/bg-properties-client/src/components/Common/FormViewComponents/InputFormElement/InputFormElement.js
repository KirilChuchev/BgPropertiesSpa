import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";

import { article, labelStyle, field } from "./InputFormElement.module.css";

const InputFormElement = ({ label, element, styles }) => {
  return (
    <article className={styles?.article || article}>
      <label className={styles?.label || labelStyle} htmlFor={element.id}>
        {label}
        {element.text}
      </label>
      <Field
        className={styles?.field || field}
        type={element.type}
        name={element.name}
        id={element.id}
        autoFocus={element.autofocus}
      />
      <ErrorMessage
        component={TextError}
        name={element.name}
        nameValue={element.name}
      />
    </article>
  );
};

export default InputFormElement;
