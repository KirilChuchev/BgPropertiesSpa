import { error } from "./TextError.module.css";

function TextError(props, styles) {
  // , nameValue
  // console.log(props);
  // console.log(nameValue);

  return <span className={styles?.error || error}>{props.children}</span>;
}

export default TextError;
