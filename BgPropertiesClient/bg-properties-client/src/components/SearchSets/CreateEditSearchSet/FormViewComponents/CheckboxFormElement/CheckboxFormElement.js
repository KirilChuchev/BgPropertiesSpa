import { Field, ErrorMessage } from "formik";

import TextError from "../TextError";

const CheckboxFormElement = ({ element, searchSet }) => { //searchSet -> за стилизация евент.
  return (
    <article>
      <label htmlFor={element.id}>
        <Field
          type={element.type}
          name={element.name}
          id={element.id}
        />
        <ErrorMessage
          component={TextError}
          name={element.name}
          nameValue={element.name}
        />
        {element.text}
        {/* <ErrorMessage name={element.name} /> */}
      </label>
    </article>
  );
};

export default CheckboxFormElement;
