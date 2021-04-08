import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

import FormikControl from "../../Common/FormViewComponents/FormikControl";

import { RegisterFormViewConstants } from "./RegisterFormViewConstants";
import {
  validateRegisterLoginForm,
  validationSchemaRegisterForm,
} from "../../../utils/formValidations";

import styles from "./RegisterFormView.module.css";

const RegisterFormView = ({
  userInitialValues,
  handleSubmit,
  serverErrors,
}) => {
  return (
    <Formik
      initialValues={userInitialValues}
      validationSchema={validationSchemaRegisterForm}
      validate={validateRegisterLoginForm}
      onSubmit={handleSubmit}
      validateOnBlur={false}
    >
      {(formik) => {
        if (serverErrors) {
          formik.errors = { ...formik.errors, serverErrors };
        } else {
          formik.errors = { ...formik.errors };
        }

        return (
          <section className={styles.formWrapper}>
            <Form className={styles.form}>
              <FormikControl
                control="inputGroup"
                title="Register"
                groupElements={RegisterFormViewConstants}
                styles={styles}
                errors={formik.errors}
              />
              <input
                className={styles.submitButton}
                type="submit"
                value={"Register"}
                disabled={!formik.isValid}
              />
              {formik.errors?.serverErrors?.somethingWrong && (
                <span className={styles.error}>
                  {formik.errors.serverErrors.somethingWrong}
                </span>
              )}
              <span className={styles.newRegisterLogin}>
                Имате регистрация?{" "}
                <Link to="/login">Влезте оттук.</Link>
              </span>
            </Form>
          </section>
        );
      }}
    </Formik>
  );
};

export default RegisterFormView;
