import { Fragment } from "react";
import PropTypeBlockFormElement from "../FormViewComponents/PropTypeBlockFormElement";
import InputFormElement from "../FormViewComponents/InputFormElement";
import SelectFormElement from "../FormViewComponents/SelectFormElement";
import TextAreaFormElement from "../FormViewComponents/TextAreaFormElement";

import { PropTypeBlockFormElementConsts } from "../constants";
import { NameInputFormElementConst } from "../constants";
import { PriceInputFormElementConsts } from "../constants";
import { PricePerSqrMInputFormElementConsts } from "../constants";
import { SizeInputFormElementConsts } from "../constants";
import { FloorInputFormElementConsts } from "../constants";
import { FloorOptionInputFormElementConsts } from "../constants";
import { LocationInputFormElementConst } from "../constants";
import { LocationOptionInputFormElementConsts } from "../constants";
import { DescriptionInputFormElementConst } from "../constants";

const CreateEditSearchSetFormView = ({
  form,
  searchSet,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Fragment>
      <form onSubmit={(event) => handleSubmit(event)}>
        <section>
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
        </section>

        <input
          type="submit"
          value={form.submitButton}
          // style="width: 260px; height: 80px; font-weight: bold"
        />
      </form>
    </Fragment>
  );
};

export default CreateEditSearchSetFormView;
