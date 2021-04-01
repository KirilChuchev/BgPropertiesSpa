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

import { validateCreateEditSearchSetForm } from "../../../../utils/formValidations";

import styles from './FormView.module.css'

const FormView = ({ form, searchSet, handleSubmit }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={searchSet}
      validate={validateCreateEditSearchSetForm}
      onSubmit={handleSubmit}
    >
      {({ errors, values, touched, isSubmitting, setFieldValue }) => {
        console.log("errors", errors);
        console.log("values", values);
        return (
          <Form className={styles.form}>
            <section className={styles.searchSetNameWrapper}>
              <FormikControl
                control={"input"}
                element={NameInputFormElementConst}
                label={form.searchSetName}
                styles={styles}
              />
            </section>

            <section>
              <FormikControl
                control={"checkboxGroup"}
                checkboxBlocksDetails={PropTypeBlockFormElementConsts}
                checkboxElements={PropTypeInputFormElementConsts}
                searchSet={searchSet}
                label={"Вид на имота:"}
                errors={errors}
              />
            </section>

            <section>
              <article>
                <FormikControl
                  control={"inputGroup"}
                  groupElements={PriceInputFormElementConsts}
                  label={"Цена на имота:"}
                  styles={styles}
                />
              </article>

              <article>
                <FormikControl
                  control={"inputGroup"}
                  groupElements={PricePerSqrMInputFormElementConsts}
                  label={"Цена на кв.м площ:"}
                  styles={styles}
                />
              </article>
            </section>

            <section>
              <FormikControl
                control={"inputGroup"}
                groupElements={SizeInputFormElementConsts}
                label={"Квадратура (кв.м):"}
                styles={styles}
              />
            </section>

            <section>
              <FormikControl
                control={"selectGroup"}
                groupElements={FloorInputFormElementConsts}
                options={FloorOptionInputFormElementConsts}
                label={"Етаж:"}
              />
            </section>

            <section>
              <FormikControl
                control={"select"}
                element={LocationInputFormElementConst}
                options={LocationOptionInputFormElementConsts}
                // handleChange={handleChange}
                label={"Местоположение на търсения от Вас Имот:"}
              />
            </section>

            <section>
              <FormikControl
                control={"textarea"}
                element={DescriptionInputFormElementConst}
                label={"Въведете кратко описание:"}
              />
            </section>

            <input
              type="submit"
              value={form.submitButton}
              // style="width: 260px; height: 80px; font-weight: bold"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormView;
