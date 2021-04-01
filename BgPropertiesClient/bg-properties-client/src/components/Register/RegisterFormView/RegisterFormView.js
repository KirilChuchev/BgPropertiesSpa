import { Formik, Form } from "formik";

import FormikControl from "../../Common/FormViewComponents/FormikControl";

import { RegisterFormViewConstants } from "./RegisterFormViewConstants";
import {
  validateRegisterLoginForm,
  validationSchemaRegisterForm,
} from "../../../utils/formValidations";

const RegisterFormView = ({ userInitialValues, handleSubmit }) => {
  return (
    <Formik
      initialValues={userInitialValues}
      validationSchema={validationSchemaRegisterForm}
      validate={validateRegisterLoginForm}
      onSubmit={handleSubmit}
      validateOnBlur={false}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="inputGroup"
              groupElements={RegisterFormViewConstants}
              //   label="Email"
            />
            <input
              type="submit"
              value={"Register"}
              disabled={!formik.isValid}
              // style="width: 260px; height: 80px; font-weight: bold"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterFormView;
