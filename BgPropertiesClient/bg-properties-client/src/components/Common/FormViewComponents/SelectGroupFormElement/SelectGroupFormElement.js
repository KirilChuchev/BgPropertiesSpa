import SelectFormElement from "../SelectFormElement";

const SelectGroupFormElement = ({ title, groupElements, options, styles }) => {
  return (
    <section className={styles.selectGroupWrapper}>
      <h4 className={styles.selectGroupTitle}>{title}</h4>
      <section
        className={styles.selectGroup}
        // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
      >
        {groupElements &&
          groupElements.map((x) => (
            <SelectFormElement
              key={x.id}
              element={x}
              options={options}
              styles={styles}
            />
          ))}
      </section>
    </section>
  );
};

export default SelectGroupFormElement;
