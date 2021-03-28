import InputFormElement from "../InputFormElement";
import TextAreaFormElement from "../TextAreaFormElement";
import SelectFormElement from "../SelectFormElement";
import CheckboxGroupFormElement from '../CheckboxGroupFormElement';
import InputGroupFormElement from '../InputGroupFormElement';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputFormElement {...rest} />;
      case "inputGroup":
      return <InputGroupFormElement {...rest} />;
    case "textarea":
      return <TextAreaFormElement {...rest} />;
    case "select":
      return <SelectFormElement {...rest} />;
    case "checkboxGroup":
      return <CheckboxGroupFormElement {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
