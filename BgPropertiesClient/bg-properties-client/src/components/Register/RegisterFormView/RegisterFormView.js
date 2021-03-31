import * as Yup from "yup";
import { Formik, Form } from "formik";

import FormikControl from "../../Common/FormViewComponents/FormikControl";

import { RegisterFormViewConstants } from './RegisterFormViewConstants';

const RegisterFormView = ({ userInitialValues, handleSubmit }) => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
    // phone: Yup.string().when("modeOfContact", {
    //   is: "telephonemoc",
    //   then: Yup.string().required("Required"),
    // }),
  });

  return (
    <Formik
      initialValues={userInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
              // style="width: 260px; height: 80px; font-weight: bold"
            />
            {/* <button type="submit" disabled={!formik.isValid}>
              Register
            </button> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterFormView;
