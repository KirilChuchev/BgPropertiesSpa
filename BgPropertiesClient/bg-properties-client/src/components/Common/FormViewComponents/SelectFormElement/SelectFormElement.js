import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";

import {
  selectArticle,
  selectLabel,
  selectField,
} from "./SelectFormElement.module.css";

const SelectFormElement = ({ options, element, title, label, onClick, styles }) => {
  console.log(options);
  console.log(element);
  return (
    <article className={styles?.selectArticle || selectArticle}>
      <h4 className={styles.selectTitle}>{title}</h4>
      <label
        htmlFor={element.id}
        className={styles?.selectLabel || selectLabel}
      >
        {label}
        {element.text}
      </label>
      <Field
        as="select"
        id={element.id}
        name={element.name}
        className={styles?.selectField || selectField}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value} onClick={onClick}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage
        component={TextError}
        name={element.name}
        nameValue={element.name}
        styles={styles}
      />
    </article>
  );
};

export default SelectFormElement;
