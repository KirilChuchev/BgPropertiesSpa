import { Field, ErrorMessage } from "formik";
import TextError from '../TextError';

const SelectFormElement = ({ options, element, label }) => {
  return (
    <article>
      <label htmlFor={element.id}>
        {label}
        {element.text}
        <Field
          as="select"
          id={element.id}
          name={element.name}
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            );
          })}
        </Field>
      </label>
      <ErrorMessage component={TextError} name={element.name} nameValue={element.name} />
    </article>
  );
};

export default SelectFormElement;
