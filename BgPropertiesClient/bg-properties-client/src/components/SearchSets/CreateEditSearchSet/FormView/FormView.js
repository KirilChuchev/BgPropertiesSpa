import { Fragment } from "react";
import PropTypeBlockFormElement from "../FormComponents/PropTypeBlockFormElement";
import InputFormElement from "../FormComponents/InputFormElement";
import SelectFormElement from "../FormComponents/SelectFormElement";
import TextAreaFormElement from "../FormComponents/TextAreaFormElement";

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
  searchSet,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Fragment>
      <form onSubmit={(event) => handleSubmit(event)}>
        <table
          width="460"
          // style="margin-left: 20px"
        >
          <tbody>
            <tr>
              <td width="510">
                <b>Име на вашия нов SearchSet:</b>
              </td>
            </tr>
            <tr>
              <td>
                <InputFormElement
                  details={NameInputFormElementConst}
                  value={searchSet[NameInputFormElementConst.name]}
                  handleChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table
          width="460"
          //style="border-color: red"
          cellSpacing="0"
          cellPadding="0"
        >
          <tbody>
            <tr>
              <td
                colSpan="6"
                valign="top"
                //style="padding-bottom: 5px; font-weight: bold"
              >
                Вид на имота:
              </td>
            </tr>
            <tr>
              {PropTypeBlockFormElementConsts &&
                PropTypeBlockFormElementConsts.map((x) => (
                  <PropTypeBlockFormElement
                    key={x.id}
                    blockDetails={x}
                    searchSet={searchSet}
                    handleChange={handleChange}
                  />
                ))}
            </tr>
          </tbody>
        </table>

        <table width="460" cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <td width="185" colSpan="2">
                <b>Цена на имота:</b> (EUR)
              </td>

              <td width="185" colSpan="2">
                <b>Цена на кв.м площ:</b> (EUR)
              </td>
            </tr>
            <tr>
              {PriceInputFormElementConsts &&
                PriceInputFormElementConsts.map((x) => (
                  <td key={x.id}>
                    {x.text}
                    <InputFormElement
                      details={x}
                      value={searchSet[x.name]}
                      handleChange={handleChange}
                    />
                  </td>
                ))}

              {PricePerSqrMInputFormElementConsts &&
                PricePerSqrMInputFormElementConsts.map((x) => (
                  <td key={x.id}>
                    {x.text}
                    <InputFormElement
                      details={x}
                      value={searchSet[x.name]}
                      handleChange={handleChange}
                    />
                  </td>
                ))}
            </tr>
          </tbody>
        </table>

        <table width="460" cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <td
                width="185"
                colSpan="3"
                // style="padding-top: 20px"
              >
                <b>Квадратура:</b> (кв.м)
              </td>
            </tr>
            <tr>
              {SizeInputFormElementConsts &&
                SizeInputFormElementConsts.map((x) => (
                  <td key={x.id}>
                    {x.text}
                    <InputFormElement
                      details={x}
                      value={searchSet[x.name]}
                      handleChange={handleChange}
                    />
                  </td>
                ))}
            </tr>

            <tr>
              <td
                width="185"
                // style="padding-top: 20px"
                colSpan="3"
              >
                <b>Етаж:</b>
              </td>

              <td
                width="260"
                // style="padding-top: 20px"
                colSpan="5"
                rowSpan="2"
              ></td>
            </tr>
            <tr>
              {FloorInputFormElementConsts &&
                FloorInputFormElementConsts.map((x) => (
                  <td key={x.id}>
                    {x.text}
                    <SelectFormElement
                      optionsData={FloorOptionInputFormElementConsts}
                      details={x}
                      value={searchSet[x.name]}
                      handleChange={handleChange}
                    />
                  </td>
                ))}
            </tr>
          </tbody>
        </table>

        <table
          width="510"
          cellSpacing="0"
          cellPadding="0"
          border="0"
          // style="margin-bottom: 20px"
        >
          <tbody>
            <tr>
              <td width="510">
                <b>Местоположение на търсения от Вас Имот:</b>
              </td>
            </tr>
            <tr>
              {LocationInputFormElementConst && (
                <td key={LocationInputFormElementConst.id}>
                  <SelectFormElement
                    optionsData={LocationOptionInputFormElementConsts}
                    details={LocationInputFormElementConst}
                    value={searchSet[LocationInputFormElementConst.name]}
                    handleChange={handleChange}
                  />
                  <span
                    // style="color: red; background-color: lightyellow"
                    // class="field-validation-valid"
                    data-valmsg-for="CityRegion"
                    data-valmsg-replace="true"
                  ></span>
                </td>
              )}
            </tr>
          </tbody>
        </table>

        <table
        // style="margin-bottom: 5px"
        >
          <tbody>
            <tr>
              <td>
                <b>Въведете кратко описание:</b>
              </td>
            </tr>
            <tr>
              <td>
                <TextAreaFormElement
                  details={DescriptionInputFormElementConst}
                  value={searchSet[DescriptionInputFormElementConst.name]}
                  handleChange={handleChange}
                />
                <span
                  // style="color: red; background-color: lightyellow"
                  // class="field-validation-valid"
                  data-valmsg-for="Description"
                  data-valmsg-replace="true"
                ></span>
              </td>
            </tr>
          </tbody>
        </table>

        <input
          type="submit"
          value="С Ъ З Д А Й!"
          // style="width: 260px; height: 80px; font-weight: bold"
        />
      </form>
    </Fragment>
  );
};

export default CreateEditSearchSetFormView;
