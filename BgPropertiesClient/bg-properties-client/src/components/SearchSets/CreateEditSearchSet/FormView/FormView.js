import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import FormikControl from "../FormViewComponents/FormikControl";

import PropTypeBlockFormElement from "../FormViewComponents/PropTypeBlockFormElement";
import InputFormElement from "../FormViewComponents/InputFormElement";
import SelectFormElement from "../FormViewComponents/SelectFormElement";
import TextAreaFormElement from "../FormViewComponents/TextAreaFormElement";

import { PropTypeBlockFormElementConsts } from "../constants";
import { PropTypeInputFormElementConsts } from "../constants";
import { NameInputFormElementConst } from "../constants";
import { PriceInputFormElementConsts } from "../constants";
import { PricePerSqrMInputFormElementConsts } from "../constants";
import { SizeInputFormElementConsts } from "../constants";
import { FloorInputFormElementConsts } from "../constants";
import { FloorOptionInputFormElementConsts } from "../constants";
import { LocationInputFormElementConst } from "../constants";
import { LocationOptionInputFormElementConsts } from "../constants";
import { DescriptionInputFormElementConst } from "../constants";

const FormView = ({ form, searchSet, handleChange, handleSubmit }) => {
  // const formik = useFormik({
  //   initialValues: {
  //     test: "test1",
  //   },
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  //   // validate: (values) => {
  //   //   let errors = {};
  //   //   if (!values.test) {
  //   //     errors.test = "Required";
  //   //     console.log("errors", formik.errors);
  //   //   }

  //   //   return errors;
  //   // },

  //   validationSchema: Yup.object({
  //     test: Yup.string().required("Това трябва.")
  //   })
  // });

  // const [searchSetName, setSearchSetName] = useState("");

  // useEffect(() => {
  //   setSearchSetName(searchSet.searchSetName);
  // }, [searchSet]);

  // console.log(searchSet);

  // let obj = {
  //   searchSetName: searchSet.searchSetName.toString(),
  //   description: searchSet.description,
  //   test: "testttt",
  // };
  // let initialValues = { ...searchSet };

  return (
    <Formik
      enableReinitialize
      initialValues={searchSet}
      validationSchema={Yup.object({
        test: Yup.string().required("Това трябва."),
        searchSetName: Yup.string().required("напиши нещо"),
      })}
      // onSubmit={handleSubmit}
    >
      {/* {({ setFieldValue, onSubmit }) => ( */}
      <Form onSubmit={handleSubmit}>
        {/* <section>
          <h4>{form.searchSetName}</h4>
          <InputFormElement
            details={NameInputFormElementConst}
            // value={searchSet[NameInputFormElementConst.name]}
            handleChange={handleChange}
          />
        </section> */}

        <section>
          <FormikControl
            control={"input"}
            details={NameInputFormElementConst}
            handleChange={handleChange}
            label={form.searchSetName}
          />
        </section>

        {/* <section>
          <h4>Вид на имота:</h4>
          {PropTypeBlockFormElementConsts &&
            PropTypeBlockFormElementConsts.map((x) => (
              <PropTypeBlockFormElement
                key={x.id}
                blockDetails={x}
                searchSet={searchSet}
                handleChange={handleChange}
                
              />
            ))}
        </section> */}

        <section>
          <FormikControl
            control={"checkboxGroup"}
            checkboxBlocksDetails={PropTypeBlockFormElementConsts}
            checkboxElements={PropTypeInputFormElementConsts}
            handleChange={handleChange}
            label={"Вид на имота:"}
          />
        </section>

        <section>
          {/* <article>
            <h4>Цена на имота:</h4>
            <h4>(EUR)</h4>
            {PriceInputFormElementConsts &&
              PriceInputFormElementConsts.map((x) => (
                <InputFormElement
                  key={x.id}
                  details={x}
                  // value={searchSet[x.name]}
                  handleChange={handleChange}
                />
              ))}
          </article> */}
          <article>
            <FormikControl
              control={"inputGroup"}
              groupElements={PriceInputFormElementConsts}
              handleChange={handleChange}
              label={"Цена на имота:"}
            />
          </article>


          <article>
            <h4>Цена на кв.м площ:</h4>
            <h4>(EUR)</h4>
            {PricePerSqrMInputFormElementConsts &&
              PricePerSqrMInputFormElementConsts.map((x) => (
                <InputFormElement
                  key={x.id}
                  details={x}
                  // value={searchSet[x.name]}
                  handleChange={handleChange}
                />
              ))}
          </article>
        </section>

        <section>
          <h4>Квадратура:</h4>
          <h4>(кв.м)</h4>
          {SizeInputFormElementConsts &&
            SizeInputFormElementConsts.map((x) => (
              <InputFormElement
                key={x.id}
                details={x}
                // value={searchSet[x.name]}
                handleChange={handleChange}
              />
            ))}
        </section>

        <section>
          <h4>Етаж:</h4>
          {FloorInputFormElementConsts &&
            FloorInputFormElementConsts.map((x) => (
              <SelectFormElement
                key={x.id}
                optionsData={FloorOptionInputFormElementConsts}
                details={x}
                // value={searchSet[x.name]}
                handleChange={handleChange}
              />
            ))}
        </section>

        <section>
          <h4>Местоположение на търсения от Вас Имот:</h4>
          {LocationInputFormElementConst && (
            <SelectFormElement
              optionsData={LocationOptionInputFormElementConsts}
              details={LocationInputFormElementConst}
              // value={searchSet[LocationInputFormElementConst.name]}
              handleChange={handleChange}
            />
          )}
        </section>

        <section>
          <h4>Въведете кратко описание:</h4>
          <TextAreaFormElement
            details={DescriptionInputFormElementConst}
            // value={searchSet[DescriptionInputFormElementConst.name]}
            handleChange={handleChange}
          />
        </section>

        <input
          type="submit"
          value={form.submitButton}
          // style="width: 260px; height: 80px; font-weight: bold"
        />

        {/* <--- test ---> */}
        {/* <section>
            <h4>{form.searchSetName}</h4>
            <InputFormElement
              form={form}
              details={NameInputFormElementConst}
              // value={searchSet[NameInputFormElementConst.name]}
              handleChange={handleChange}
            />
          </section>

          <input
            type="submit"
            value={form.submitButton}
            // style="width: 260px; height: 80px; font-weight: bold"
          /> */}

        {/* <section>
            <label htmlFor="test">
              <Field type="text" name="test" id="test" />
              <ErrorMessage name={"test"} />
            </label>
          </section>


          <section>
            <label htmlFor={NameInputFormElementConst.id}>
              <Field
                type="text"
                name={NameInputFormElementConst.name}
                id={NameInputFormElementConst.id}
              />
              <ErrorMessage name={NameInputFormElementConst.name} />
            </label>
          </section>

          <section>
            <label htmlFor="description">
              <Field type="text" name="description" id="description" />
              <ErrorMessage name={"description"} />
            </label>
          </section>

          <section>
            <h4>{form.searchSetName}</h4>
            <InputFormElement
              form={form}
              details={NameInputFormElementConst}
              // value={searchSet[NameInputFormElementConst.name]}
              handleChange={handleChange}
            />
          </section> */}
      </Form>
      {/* )} */}
    </Formik>
  );
};

export default FormView;

/* {formik.touched.test && formik.errors.test && (
          <div>{formik.errors.test}</div>
        )} */

/* <form onSubmit={(event) => handleSubmit(event)}> */

/* <section>
          <h4>{form.searchSetName}</h4>
          <InputFormElement
            details={NameInputFormElementConst}
            value={searchSet[NameInputFormElementConst.name]}
            handleChange={handleChange}
          />
        </section>

        <section>
          <h4>Вид на имота:</h4>
          {PropTypeBlockFormElementConsts &&
            PropTypeBlockFormElementConsts.map((x) => (
              <PropTypeBlockFormElement
                key={x.id}
                blockDetails={x}
                searchSet={searchSet}
                handleChange={handleChange}
              />
            ))}
        </section>

        <section>
          <article>
            <h4>Цена на имота:</h4>
            <h4>(EUR)</h4>
            {PriceInputFormElementConsts &&
              PriceInputFormElementConsts.map((x) => (
                <InputFormElement
                  key={x.id}
                  details={x}
                  value={searchSet[x.name]}
                  handleChange={handleChange}
                />
              ))}
          </article>
          <article>
            <h4>Цена на кв.м площ:</h4>
            <h4>(EUR)</h4>
            {PricePerSqrMInputFormElementConsts &&
              PricePerSqrMInputFormElementConsts.map((x) => (
                <InputFormElement
                  key={x.id}
                  details={x}
                  value={searchSet[x.name]}
                  handleChange={handleChange}
                />
              ))}
          </article>
        </section>

        <section>
          <h4>Квадратура:</h4>
          <h4>(кв.м)</h4>
          {SizeInputFormElementConsts &&
            SizeInputFormElementConsts.map((x) => (
              <InputFormElement
                key={x.id}
                details={x}
                value={searchSet[x.name]}
                handleChange={handleChange}
              />
            ))}
        </section>

        <section>
          <h4>Етаж:</h4>
          {FloorInputFormElementConsts &&
            FloorInputFormElementConsts.map((x) => (
              <SelectFormElement
                key={x.id}
                optionsData={FloorOptionInputFormElementConsts}
                details={x}
                value={searchSet[x.name]}
                handleChange={handleChange}
              />
            ))}
        </section>

        <section>
          <h4>Местоположение на търсения от Вас Имот:</h4>
          {LocationInputFormElementConst && (
            <SelectFormElement
              optionsData={LocationOptionInputFormElementConsts}
              details={LocationInputFormElementConst}
              value={searchSet[LocationInputFormElementConst.name]}
              handleChange={handleChange}
            />
          )}
        </section>

        <section>
          <h4>Въведете кратко описание:</h4>
          <TextAreaFormElement
            details={DescriptionInputFormElementConst}
            value={searchSet[DescriptionInputFormElementConst.name]}
            handleChange={handleChange}
          />
        </section> */

/* <input
          type="submit"
          value={form.submitButton}
          // style="width: 260px; height: 80px; font-weight: bold"
        /> */

// </form>
