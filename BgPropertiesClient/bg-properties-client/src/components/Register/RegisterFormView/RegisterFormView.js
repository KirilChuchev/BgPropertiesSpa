import { Formik, Form } from "formik";

import FormikControl from "../../Common/FormViewComponents/FormikControl";

import { RegisterFormViewConstants } from "./RegisterFormViewConstants";
import {
  validateRegisterLoginForm,
  validationSchemaRegisterForm,
} from "../../../utils/formValidations";

import styles from "./RegisterFormView.module.css";

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
          <section className={styles.formWrapper}>
            <Form className={styles.form}>
              <FormikControl
                control="inputGroup"
                label="Register"
                groupElements={RegisterFormViewConstants}
                styles={styles}
                //   label="Email"
              />
              <input
                className={styles.submitButton}
                type="submit"
                value={"Register"}
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

export default RegisterFormView;
