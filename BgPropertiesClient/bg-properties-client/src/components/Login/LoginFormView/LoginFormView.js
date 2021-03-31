import { Formik, Form } from "formik";

import FormikControl from "../../Common/FormViewComponents/FormikControl";

import { LoginFormViewConstants } from "./LoginFormViewConstants";
import {
  validateRegisterLoginForm,
  validationSchemaLoginForm,
} from "../../../utils/formValidations";

const LoginFormView = ({ userInitialValues, handleSubmit }) => {
  return (
    <Formik
      initialValues={userInitialValues}
      validate={validateRegisterLoginForm}
      validationSchema={validationSchemaLoginForm}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="inputGroup"
              groupElements={LoginFormViewConstants}
            />
            <input
              type="submit"
              value={"Login"}
              disabled={!formik.isValid}
              // style="width: 260px; height: 80px; font-weight: bold"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginFormView;
