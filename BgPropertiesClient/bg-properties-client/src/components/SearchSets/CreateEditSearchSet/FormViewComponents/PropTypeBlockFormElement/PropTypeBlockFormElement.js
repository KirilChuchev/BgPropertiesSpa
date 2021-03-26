import InputFormElement from "../InputFormElement";

import { PropTypeInputFormElementConsts } from "../../constants";

const PropTypeBlockFormElement = ({
  blockDetails,
  searchSet,
  handleChange,
}) => {
  return (
    <section
      id={blockDetails.id}
      // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
    >
      {PropTypeInputFormElementConsts &&
        PropTypeInputFormElementConsts.slice(
          blockDetails.from,
          blockDetails.to
        ).map((x) => (
          <InputFormElement
            key={x.id}
            details={x}
            value={searchSet[x.name]}
            handleChange={handleChange}
          />
        ))}
    </section>
  );
};

export default PropTypeBlockFormElement;
