import InputFormElement from "../InputFormElement";

import {
  wrapper,
  title,
  content,
} from "./InputGroupFormElement.module.css";

const InputGroupFormElement = ({ label, groupElements, styles, errors }) => {
  return (
    <section className={styles?.wrapper || wrapper}>
      <h4 className={styles?.title || title}>{label}</h4>
      <section
        className={styles?.content || content}
        // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
      >
        {groupElements &&
          groupElements.map((x) => <InputFormElement key={x.id} element={x} styles={styles} errors={errors} />)}
      </section>
    </section>
  );
};

export default InputGroupFormElement;
