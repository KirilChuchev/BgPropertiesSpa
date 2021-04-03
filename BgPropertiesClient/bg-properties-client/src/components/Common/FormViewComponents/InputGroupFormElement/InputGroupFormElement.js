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
        // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
      >
        {groupElements &&
          groupElements.map((x) => <InputFormElement key={x.id} element={x} styles={styles} errors={errors} />)}
      </section>
    </section>
  );
};

export default InputGroupFormElement;
