import SelectFormElement from "../SelectFormElement";

const SelectGroupFormElement = ({ label, groupElements, options }) => {
  return (
    <section>
      <h4>{label}</h4>
      <section
      // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
      >
        {groupElements &&
          groupElements.map((x) => (
            <SelectFormElement
              key={x.id}
              element={x}
              options={options}
            />
          ))}
      </section>
    </section>
  );
};

export default SelectGroupFormElement;
