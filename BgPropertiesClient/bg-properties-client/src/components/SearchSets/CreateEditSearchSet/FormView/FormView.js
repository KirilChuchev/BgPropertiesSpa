import { Formik, Form } from "formik";

import FormikControl from "../../../Common/FormViewComponents/FormikControl";

import { NameInputFormElementConst } from "./FormViewConstants";
import { SizeInputFormElementConsts } from "./FormViewConstants";
import { FloorInputFormElementConsts } from "./FormViewConstants";
import { PriceInputFormElementConsts } from "./FormViewConstants";
import { LocationInputFormElementConst } from "./FormViewConstants";
import { PropTypeBlockFormElementConsts } from "./FormViewConstants";
import { PropTypeInputFormElementConsts } from "./FormViewConstants";
import { DescriptionInputFormElementConst } from "./FormViewConstants";
import { FloorOptionInputFormElementConsts } from "./FormViewConstants";
import { PricePerSqrMInputFormElementConsts } from "./FormViewConstants";
import { LocationOptionInputFormElementConsts } from "./FormViewConstants";

import { themeStyleSelector } from "../../../../utils/themeStyleSelector";
import { validateCreateEditSearchSetForm } from "../../../../utils/formValidations";

import styles from "./FormView.module.css";

const FormView = ({ form, searchSet, theme, handleSubmit }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={searchSet}
      validate={validateCreateEditSearchSetForm}
      onSubmit={handleSubmit}
    >
      {({ errors, values, touched, isSubmitting, setFieldValue }) => {
        return (
          <section className={themeStyleSelector(theme, styles, styles.lightThemeFormWrapper)}>
            <Form className={styles.form}>
              <section className={styles.inputGroupWrapper}>
              <FormikControl
                control={"input"}
                element={NameInputFormElementConst}
                title={form.searchSetName}
                styles={styles}
              />
              </section>

              <FormikControl
                control={"checkboxGroup"}
                checkboxBlocksDetails={PropTypeBlockFormElementConsts}
                checkboxElements={PropTypeInputFormElementConsts}
                searchSet={searchSet}
                title={"Вид на имота:"}
                errors={errors}
                styles={styles}
              />

              <FormikControl
                control={"inputGroup"}
                groupElements={PriceInputFormElementConsts}
                title={"Цена на имота:"}
                styles={styles}
              />

              <FormikControl
                control={"inputGroup"}
                groupElements={PricePerSqrMInputFormElementConsts}
                title={"Цена на кв.м площ:"}
                styles={styles}
              />

              <FormikControl
                control={"inputGroup"}
                groupElements={SizeInputFormElementConsts}
                title={"Квадратура (кв.м):"}
                styles={styles}
              />

              <FormikControl
                control={"selectGroup"}
                groupElements={FloorInputFormElementConsts}
                options={FloorOptionInputFormElementConsts}
                title={"Етаж:"}
                styles={styles}
              />

              <section className={styles.selectGroupWrapper}>
              <FormikControl
                control={"select"}
                element={LocationInputFormElementConst}
                options={LocationOptionInputFormElementConsts}
                // handleChange={handleChange}
                title={"Местоположение на търсения имот:"}
                styles={styles}
              />
              </section>

              <FormikControl
                control={"textarea"}
                element={DescriptionInputFormElementConst}
                title={"Въведете кратко описание:"}
                styles={styles}
              />

              {/* <input
                className={styles.submitButton}
                type="submit"
                value={form.submitButton}
                // style="width: 260px; height: 80px; font-weight: bold"
              /> */}
              <button type='submit' className={styles.submitButton}>{form.submitButton}</button>
            </Form>
          </section>
        );
      }}
    </Formik>
  );
};

export default FormView;
