import { Field, ErrorMessage } from "formik";

const InputFormElement = ({ form, label, details, value, handleChange }) => {
  // console.log(details);
  return (
    // <article>
    //   <label htmlFor={details.id}>
    //     {details.type === "text" && <p>{details.text}</p>}
    //     <input
    //       type={details.type}
    //       name={details.name}
    //       id={details.id}
    //       checked={value}
    //       value={value}
    //       onChange={handleChange}
    //     />
    //     {details.type === "checkbox" && details.text}
    //   </label>
    //   <span
    //     // style="color: red; background-color: lightyellow"
    //     // class="field-validation-valid"
    //     validation-for={details.id}
    //   ></span>
    // </article>
    <article>
      <label htmlFor={details.id}>
        {label}
        <Field
          type={details.type}
          name={details.name}
          id={details.id}
          onChange={handleChange}
        />
        <ErrorMessage name={details.name} />
        {details.type === "checkbox" && details.text}
      </label>
    </article>
  );
};

export default InputFormElement;
