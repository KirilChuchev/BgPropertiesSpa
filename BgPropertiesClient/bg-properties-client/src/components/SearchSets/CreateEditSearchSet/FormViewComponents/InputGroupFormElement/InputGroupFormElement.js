import InputFormElement from "../InputFormElement";

const InputGroupFormElement = ({ label, groupElements, validate }) => {
  return (
    <section>
      <h4>{label}</h4>
      <section
      // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
      >
        {groupElements &&
          groupElements.map((x) => (
            <InputFormElement
              key={x.id}
              element={x}
              validate={validate}
            />
          ))}
      </section>
    </section>
  );
};

export default InputGroupFormElement;
