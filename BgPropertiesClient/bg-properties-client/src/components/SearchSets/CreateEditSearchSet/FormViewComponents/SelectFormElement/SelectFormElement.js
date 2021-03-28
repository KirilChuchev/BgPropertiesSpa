import { Field, ErrorMessage } from "formik";

const SelectFormElement = ({ options, element, label, handleChange }) => {
  return (
    // <article>
    //   <label htmlFor={element.id}>
    //     {element.type === "text" && <p>{element.text}</p>}
    //     <select
    //       id={element.id}
    //       name={element.name}
    //       value={value}
    //       onChange={handleChange}
    //     >
    //       {options &&
    //         options.map((x) => (
    //           <option key={x.value} value={x.value}>
    //             {x.text}
    //           </option>
    //         ))}
    //     </select>
    //   </label>
    // </article>
    <article>
      <label htmlFor={element.id}>
        {label}
        <Field
          as="select"
          id={element.id}
          name={element.name}
          onChange={handleChange}
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
      <ErrorMessage name={element.name} />
    </article>
  );
};

export default SelectFormElement;
