import { Formik, Form } from "formik";

import FormikControl from "../../Common/FormViewComponents/FormikControl";

import { LoginFormViewConstants } from "./LoginFormViewConstants";
import {
  validateRegisterLoginForm,
  validationSchemaLoginForm,
} from "../../../utils/formValidations";

import styles from "./LoginFormView.module.css";

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
          <section className={styles.loginFormWrapper}>
            <Form className={styles.loginForm}>
              <FormikControl
                control="inputGroup"
                groupElements={LoginFormViewConstants}
                label={"Login"}
                styles={styles}
              />
              <input
                className={styles.button}
                type="submit"
                value={"Login"}
                disabled={!formik.isValid}
                // style="width: 260px; height: 80px; font-weight: bold"
              />
            </Form>
          </section>
        );
      }}
    </Formik>
  );
};

export default LoginFormView;
