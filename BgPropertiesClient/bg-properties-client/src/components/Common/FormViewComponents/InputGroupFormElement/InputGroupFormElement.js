import InputFormElement from "../InputFormElement";

import {
  wrapper,
  inputGroupTitle,
  content,
} from "./InputGroupFormElement.module.css";

const InputGroupFormElement = ({ title, groupElements, styles, errors }) => {
  return (
    <section className={styles?.inputGroupWrapper || wrapper}>
      <h4 className={styles?.inputGroupTitle || inputGroupTitle}>{title}</h4>
      <section
        className={styles?.inputGroupContent || content}
      >
        {groupElements &&
          groupElements.map((x) => <InputFormElement key={x.id} element={x} styles={styles} errors={errors} />)}
      </section>
    </section>
  );
};

export default InputGroupFormElement;
