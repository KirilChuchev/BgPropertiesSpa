import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";

import { article, labelStyle, field } from "./InputFormElement.module.css";

const InputFormElement = ({ title, label, element, styles, errors }) => {
  // console.log(errors);
  return (
    <article className={styles?.inputArticle || article}>
      <h4 className={styles.inputTitle}>{title}</h4>
      <label className={styles?.inputLabel || labelStyle} htmlFor={element.id}>
        {label}
        {element.text}
      </label>
      <Field
        className={styles?.inputField || field}
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
