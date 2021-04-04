import { Formik, Form } from "formik";

import FormikControl from "../../Common/FormViewComponents/FormikControl";

import { LoginFormViewConstants } from "./LoginFormViewConstants";
import {
  validateRegisterLoginForm,
  validationSchemaLoginForm,
} from "../../../utils/formValidations";

import styles from "./LoginFormView.module.css";

const LoginFormView = ({ userInitialValues, handleSubmit, serverErrors }) => {
  return (
    <Formik
      initialValues={userInitialValues}
      validate={validateRegisterLoginForm}
      validationSchema={validationSchemaLoginForm}
      // validateOnBlur={false}
      onSubmit={handleSubmit}
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
                groupElements={LoginFormViewConstants}
                title={"Login"}
                styles={styles}
                errors={formik.errors}
              />
              <input
                className={styles.submitButton}
                type="submit"
                value={"Login"}
                disabled={!formik.isValid}
              />
              {formik.errors?.serverErrors?.somethingWrong && (
                <span className={styles.error}>
                  {formik.errors.serverErrors.somethingWrong}
                </span>
              )}
            </Form>
          </section>
        );
      }}
    </Formik>
  );
};

export default LoginFormView;
