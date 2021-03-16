import { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import searchSetService from "../../../services/searchSetService";

const SearchSetCreate = () => {
  const history = useHistory();
  const [searchSet, setSearchSet] = useState({
    searchSetName: "",
    description: "",
    oneRoomPropType: "",
    twoRoomsPropType: "",
    threeRoomsPropType: "",
    fourRoomsPropType: "",
    multiRoomsPropType: "",
    maisonettePropType: "",
    studioPropType: "",
    officePropType: "",
    storePropType: "",
    restaurantPropType: "",
    warehousePropType: "",
    hotelPropType: "",
    industrialPropType: "",
    businessPropType: "",
    houseFloorPropType: "",
    housePropType: "",
    villagePropType: "",
    plotPropType: "",
    garagePropType: "",
    landPropType: "",
    priceFrom: "",
    priceTo: "",
    pricePerSqrMFrom: "",
    pricePerSqrMTo: "",
    sizeFrom: "",
    sizeTo: "",
    floorFrom: "",
    floorTo: "",
    cityRegion: "",
  });

  function handleChange(event) {
    // console.log(event.target.name);
    var obj = {};
    if (event.target.name.endsWith("PropType")) {
      obj[`${event.target.name}`] = event.target.checked ? "on" : "";
    } else {
      obj[`${event.target.name}`] = event.target.value;
    }
    setSearchSet(() => ({ ...searchSet, ...obj }));
  }

  async function handleSubmit(event) {
    alert("Моля потвърдете, че желаете създаването на нов SearchSet!");
    event.preventDefault();
    await searchSetService.create({ ...searchSet });
    history.push("/searchsets");
    return null;
  }

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
                <input
                  // class="sw510"
                  type="text"
                  maxLength="20"
                  id="SearchSetName"
                  name="searchSetName"
                  value={searchSet.searchSetName}
                  onChange={handleChange}
                />
                <span
                  // style="color: red; background-color: lightyellow"
                  // class="field-validation-valid"
                  data-valmsg-for="SearchSetName"
                  data-valmsg-replace="true"
                ></span>
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
              <td width="153" valign="top">
                <div
                  id="gr1"
                  // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
                >
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="oneRoomPropType"
                        id="vi1"
                        value={searchSet.oneRoomPropType}
                        onChange={handleChange}
                      />
                      1-СТАЕН
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="twoRoomsPropType"
                        id="vi2"
                        value={searchSet.twoRoomsPropType}
                        onChange={handleChange}
                      />
                      2-СТАЕН
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="threeRoomsPropType"
                        id="vi3"
                        value={searchSet.threeRoomsPropType}
                        onChange={handleChange}
                      />
                      3-СТАЕН
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="fourRoomsPropType"
                        id="vi4"
                        value={searchSet.fourRoomsPropType}
                        onChange={handleChange}
                      />
                      4-СТАЕН
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="multiRoomsPropType"
                        id="vi5"
                        value={searchSet.multiRoomsPropType}
                        onChange={handleChange}
                      />
                      МНОГОСТАЕН
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="maisonettePropType"
                        id="vi6"
                        value={searchSet.maisonettePropType}
                        onChange={handleChange}
                      />
                      МЕЗОНЕТ
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="studioPropType"
                        id="vi8"
                        value={searchSet.studioPropType}
                        onChange={handleChange}
                      />
                      АТЕЛИЕ, ТАВАН
                    </label>
                  </div>
                </div>
              </td>
              <td width="154" valign="top">
                <div
                  id="gr2"
                  //           style="
                  //   width: 146px;
                  //   height: 214px;
                  //   background-color: lightblue;
                  //   border-color: red;
                  //   padding: 3px;
                  // "
                >
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="officePropType"
                        id="vi7"
                        value={searchSet.officePropType}
                        onChange={handleChange}
                      />
                      ОФИС
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="storePropType"
                        id="vi12"
                        value={searchSet.storePropType}
                        onChange={handleChange}
                      />
                      МАГАЗИН
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="restaurantPropType"
                        id="vi13"
                        value={searchSet.restaurantPropType}
                        onChange={handleChange}
                      />
                      ЗАВЕДЕНИЕ
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="warehousePropType"
                        id="vi14"
                      />
                      СКЛАД
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="hotelPropType"
                        id="vi17"
                        value={searchSet.hotelPropType}
                        onChange={handleChange}
                      />
                      ХОТЕЛ
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="industrialPropType"
                        id="vi16"
                      />
                      ПРОМ. ПОМЕЩЕНИЕ
                    </label>
                  </div>
                </div>

                <div
                //           style="
                //   width: 146px;
                //   height: 27px;
                //   background-color: darkkhaki;
                //   border-color: red;
                //   padding: 3px;
                //   margin-top: 3px;
                // "
                >
                  <label>
                    <input type="checkbox" name="businessPropType" id="vi20" />
                    БИЗНЕС ИМОТ
                  </label>
                </div>
              </td>

              <td width="153" valign="top">
                <div
                  id="gr3"
                  //           style="
                  //   width: 145px;
                  //   height: 92px;
                  //   background-color: lightgoldenrodyellow;
                  //   border-color: red;
                  //   padding: 3px;
                  // "
                >
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="houseFloorPropType"
                        id="vi9"
                      />
                      ЕТАЖ ОТ КЪЩА
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="housePropType"
                        id="vi10"
                        value={searchSet.housePropType}
                        onChange={handleChange}
                      />
                      КЪЩА
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="villagePropType"
                        id="vi11"
                        value={searchSet.villagePropType}
                        onChange={handleChange}
                      />
                      ВИЛА
                    </label>
                  </div>
                </div>

                <div
                  id="gr3-1"
                  //           style="
                  //   width: 145px;
                  //   height: 29px;
                  //   background-color: aqua;
                  //   margin-bottom: 3px;
                  //   border-color: red;
                  //   padding: 3px;
                  // "
                >
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="plotPropType"
                        id="vi18"
                        value={searchSet.plotPropType}
                        onChange={handleChange}
                      />
                      ПАРЦЕЛ
                    </label>
                  </div>
                </div>

                <div
                  id="gr3-2"
                  //           style="
                  //   width: 145px;
                  //   height: 29px;
                  //   background-color: cadetblue;
                  //   margin-bottom: 3px;
                  //   border-color: red;
                  //   padding: 3px;
                  // "
                >
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="garagePropType"
                        id="vi15"
                        value={searchSet.garagePropType}
                        onChange={handleChange}
                      />
                      ГАРАЖ
                    </label>
                  </div>
                </div>

                <div
                  id="gr3-3"
                  //           style="
                  //   width: 145px;
                  //   height: 50px;
                  //   background-color: green;
                  //   margin-bottom: 3px;
                  //   border-color: red;
                  //   padding: 3px;
                  // "
                >
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="landPropType"
                        id="vi19"
                        value={searchSet.landPropType}
                        onChange={handleChange}
                      />
                      ЗЕМЕДЕЛСКА ЗЕМЯ
                    </label>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table width="460" cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <td width="185" colSpan="3">
                <b>Цена на имота:</b> (EUR)
              </td>
              <td width="15">
                {/* <img src="../images/picturess/no.gif" width="15" height="1" /> */}
              </td>
              <td width="185" colSpan="3">
                <b>Цена на кв.м площ:</b> (EUR)
              </td>
              <td width="5">
                {/* <img src="../images/picturess/no.gif" width="5" height="1" /> */}
              </td>
            </tr>
            <tr>
              <td
                width="90"
                //  style="padding-top: 5px"
              >
                от
                <input
                  type="text"
                  name="priceFrom"
                  className="sw70"
                  size="4"
                  maxLength="8"
                  value={searchSet.priceFrom}
                  onChange={handleChange}
                />
              </td>
              <td width="5">
                {/* <img src="../images/picturess/no.gif" width="5" height="1" /> */}
              </td>
              <td
                width="90"
                // style="padding-top: 5px"
              >
                до
                <input
                  type="text"
                  name="priceTo"
                  className="sw70"
                  size="4"
                  maxLength="8"
                  value={searchSet.priceTo}
                  onChange={handleChange}
                />
              </td>
              <td width="15">
                {/* <img src="../images/picturess/no.gif" width="15" height="1" /> */}
              </td>
              <td
                width="90"
                //  style="padding-top: 5px"
              >
                от
                <input
                  // class="sw510"
                  type="text"
                  name="pricePerSqrMFrom"
                  size="4"
                  maxLength="8"
                  value={searchSet.pricePerSqrMFrom}
                  onChange={handleChange}
                />
              </td>
              <td width="5">
                {/* <img src="../images/picturess/no.gif" width="5" height="1" /> */}
              </td>
              <td
                width="90"
                //  style="padding-top: 5px"
              >
                до
                <input
                  className="sw510"
                  type="text"
                  name="pricePerSqrMTo"
                  size="4"
                  maxLength="8"
                  value={searchSet.pricePerSqrMTo}
                  onChange={handleChange}
                />
              </td>
              <td width="5">
                {/* <img src="../images/picturess/no.gif" width="5" height="1" /> */}
              </td>
              {/* <td width="70" style="padding-top:5px;">
                                  <select name="currency" class="sw70">
                                      <option selected="" value="EUR">
                                          EUR
                                      </option>
      </select>
                              </td> */}
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
              <td width="15">
                {/* <img src="../images/picturess/no.gif" width="15" height="1" /> */}
              </td>
            </tr>
            <tr>
              <td
                width="90"
                // style="padding-top: 5px"
              >
                от
                <input
                  type="text"
                  name="sizeFrom"
                  // class="sw70"
                  size="4"
                  maxLength="8"
                  value={searchSet.sizeFrom}
                  onChange={handleChange}
                />
              </td>
              <td width="5">
                {/* <img src="../images/picturess/no.gif" width="5" height="1" /> */}
              </td>
              <td
                width="90"
                // style="padding-top: 5px"
              >
                до
                <input
                  type="text"
                  name="sizeTo"
                  className="sw70"
                  size="4"
                  maxLength="8"
                  value={searchSet.sizeTo}
                  onChange={handleChange}
                />
              </td>
              <td width="15">
                {/* <img src="../images/picturess/no.gif" width="15" height="1" /> */}
              </td>
            </tr>

            <tr>
              <td
                width="185"
                // style="padding-top: 20px"
                colSpan="3"
              >
                <b>Етаж:</b>
              </td>
              <td width="15" rowSpan="2">
                {/* <img src="../images/picturess/no.gif" width="15" height="1" /> */}
              </td>
              <td
                width="260"
                // style="padding-top: 20px"
                colSpan="5"
                rowSpan="2"
              >
                <input
                  type="submit"
                  value="С Ъ З Д А Й!"
                  // style="width: 260px; height: 80px; font-weight: bold"
                />
              </td>
            </tr>
            <tr>
              <td
                width="90"
                // style="padding-top: 5px"
              >
                от
                <select
                  name="floorFrom"
                  // class="sw70"
                  // onchange="changeFromFloor()"
                  id="floorFrom"
                  // value={this.state.floorFrom}
                  onChange={handleChange}
                >
                  {/* selected="selected" */}
                  <option value=""></option>
                  <option value="0">Партер</option>
                  <option value="999">Без последен</option>

                  <option value="1">1-ви</option>

                  <option value="2">2-ри</option>
                  <option value="3">3-ти</option>
                  <option value="4">4-ти</option>
                  <option value="5">5-ти</option>
                  <option value="6">6-ти</option>
                  <option value="7">7-ми</option>
                  <option value="8">8-ми</option>
                  <option value="9">9-ти</option>
                  <option value="10">10-ти</option>
                  <option value="11">11-ти</option>
                  <option value="12">12-ти</option>
                  <option value="13">13-ти</option>
                  <option value="14">14-ти</option>
                  <option value="15">15-ти</option>
                  <option value="16">16-ти</option>
                  <option value="17">17-ти</option>
                  <option value="18">18-ти</option>
                  <option value="19">19-ти</option>
                  <option value="20">20-ти</option>
                  <option value="21">21-ви</option>
                  <option value="22">22-ри</option>
                  <option value="23">23-ти</option>
                  <option value="24">24-ти</option>
                  <option value="25">25-ти</option>
                  <option value="26">26-ти</option>
                  <option value="27">27-ми</option>
                  <option value="28">28-ми</option>
                  <option value="29">29-ти</option>
                  <option value="30">30-ти</option>
                  <option value="31">31-ви</option>
                  <option value="32">32-ри</option>
                  <option value="33">33-ти</option>
                  <option value="34">34-ти</option>
                  <option value="35">35-ти</option>
                  <option value="36">36-ти</option>
                  <option value="37">37-ми</option>
                  <option value="38">38-ми</option>
                  <option value="39">39-ти</option>
                  <option value="40">40-ти</option>
                  <option value="41">41-ви</option>
                  <option value="42">42-ри</option>
                  <option value="43">43-ти</option>
                  <option value="44">44-ти</option>
                  <option value="45">45-ти</option>
                  <option value="46">46-ти</option>
                  <option value="47">47-ми</option>
                  <option value="48">48-ми</option>
                  <option value="49">49-ти</option>
                  <option value="50">50-ти</option>
                  <option value="51">51-ви</option>
                  <option value="52">52-ри</option>
                  <option value="53">53-ти</option>
                  <option value="54">54-ти</option>
                  <option value="55">55-ти</option>
                  <option value="56">56-ти</option>
                  <option value="57">57-ми</option>
                  <option value="58">58-ми</option>
                  <option value="59">59-ти</option>
                  <option value="60">60-ти</option>
                </select>
              </td>
              <td width="5">
                {/* <img src="../images/picturess/no.gif" width="5" height="1" /> */}
              </td>
              <td
                width="90"
                // style="padding-top: 5px"
              >
                до
                <select
                  name="floorTo"
                  // class="sw70"
                  // onchange="changeToFloor()"
                  id="floorTo"
                  onChange={handleChange}
                >
                  {/* selected="selected" */}
                  <option value=""></option>
                  <option value="0">Партер</option>
                  <option value="999">Без последен</option>
                  <option value="1">1-ви</option>
                  <option value="2">2-ри</option>
                  <option value="3">3-ти</option>
                  <option value="4">4-ти</option>
                  <option value="5">5-ти</option>
                  <option value="6">6-ти</option>
                  <option value="7">7-ми</option>
                  <option value="8">8-ми</option>
                  <option value="9">9-ти</option>
                  <option value="10">10-ти</option>
                  <option value="11">11-ти</option>
                  <option value="12">12-ти</option>
                  <option value="13">13-ти</option>
                  <option value="14">14-ти</option>
                  <option value="15">15-ти</option>
                  <option value="16">16-ти</option>
                  <option value="17">17-ти</option>
                  <option value="18">18-ти</option>
                  <option value="19">19-ти</option>
                  <option value="20">20-ти</option>
                  <option value="21">21-ви</option>
                  <option value="22">22-ри</option>
                  <option value="23">23-ти</option>
                  <option value="24">24-ти</option>
                  <option value="25">25-ти</option>
                  <option value="26">26-ти</option>
                  <option value="27">27-ми</option>
                  <option value="28">28-ми</option>
                  <option value="29">29-ти</option>
                  <option value="30">30-ти</option>
                  <option value="31">31-ви</option>
                  <option value="32">32-ри</option>
                  <option value="33">33-ти</option>
                  <option value="34">34-ти</option>
                  <option value="35">35-ти</option>
                  <option value="36">36-ти</option>
                  <option value="37">37-ми</option>
                  <option value="38">38-ми</option>
                  <option value="39">39-ти</option>
                  <option value="40">40-ти</option>
                  <option value="41">41-ви</option>
                  <option value="42">42-ри</option>
                  <option value="43">43-ти</option>
                  <option value="44">44-ти</option>
                  <option value="45">45-ти</option>
                  <option value="46">46-ти</option>
                  <option value="47">47-ми</option>
                  <option value="48">48-ми</option>
                  <option value="49">49-ти</option>
                  <option value="50">50-ти</option>
                  <option value="51">51-ви</option>
                  <option value="52">52-ри</option>
                  <option value="53">53-ти</option>
                  <option value="54">54-ти</option>
                  <option value="55">55-ти</option>
                  <option value="56">56-ти</option>
                  <option value="57">57-ми</option>
                  <option value="58">58-ми</option>
                  <option value="59">59-ти</option>
                  <option value="60">60-ти</option>
                </select>
              </td>
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
              <td
                width="510"
                // style="padding-top: 5px"
              >
                <select
                  // class="sw510"
                  // style="background-color: "
                  name="cityRegion"
                  // onchange="ChangeImotDropDown(this)"
                  onChange={handleChange}
                >
                  {/* selected="selected" */}
                  <option value=""></option>
                  <option value="град Благоевград">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Благоевград
                  </option>
                  <option value="област Благоевград">област Благоевград</option>
                  <option value="град Бургас">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Бургас
                  </option>
                  <option value="област Бургас">област Бургас</option>
                  <option value="град Варна">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Варна
                  </option>
                  <option value="област Варна">област Варна</option>
                  <option value="град Велико Търново">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Велико Търново
                  </option>
                  <option value="област Велико Търново">
                    област Велико Търново
                  </option>
                  <option value="град Видин">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Видин
                  </option>
                  <option value="област Видин">област Видин</option>
                  <option value="град Враца">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Враца
                  </option>
                  <option value="област Враца">област Враца</option>
                  <option value="град Габрово">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Габрово
                  </option>
                  <option value="област Габрово">област Габрово</option>
                  <option value="град Добрич">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Добрич
                  </option>
                  <option value="област Добрич">област Добрич</option>
                  <option value="град Кърджали">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Кърджали
                  </option>
                  <option value="област Кърджали">област Кърджали</option>
                  <option value="град Кюстендил">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Кюстендил
                  </option>
                  <option value="област Кюстендил">област Кюстендил</option>
                  <option value="град Ловеч">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Ловеч
                  </option>
                  <option value="област Ловеч">област Ловеч</option>
                  <option value="град Монтана">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Монтана
                  </option>
                  <option value="област Монтана">област Монтана</option>
                  <option value="град Пазарджик">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Пазарджик
                  </option>
                  <option value="област Пазарджик">област Пазарджик</option>
                  <option value="град Перник">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Перник
                  </option>
                  <option value="област Перник">област Перник</option>
                  <option value="град Плевен">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Плевен
                  </option>
                  <option value="област Плевен">област Плевен</option>
                  <option value="град Пловдив">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Пловдив
                  </option>
                  <option value="област Пловдив">област Пловдив</option>
                  <option value="град Разград">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Разград
                  </option>
                  <option value="област Разград">област Разград</option>
                  <option value="град Русе">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Русе
                  </option>
                  <option value="област Русе">област Русе</option>
                  <option value="град Силистра">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Силистра
                  </option>
                  <option value="област Силистра">област Силистра</option>
                  <option value="град Сливен">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Сливен
                  </option>
                  <option value="област Сливен">област Сливен</option>
                  <option value="град Смолян">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Смолян
                  </option>
                  <option value="област Смолян">област Смолян</option>
                  <option value="град София">
                    град&nbsp;&nbsp;&nbsp;&nbsp;София
                  </option>
                  <option value="област София">област София</option>
                  <option value="град Стара Загора">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Стара Загора
                  </option>
                  <option value="област Стара Загора">
                    област Стара Загора
                  </option>
                  <option value="град Търговище">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Търговище
                  </option>
                  <option value="област Търговище">област Търговище</option>
                  <option value="град Хасково">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Хасково
                  </option>
                  <option value="област Хасково">област Хасково</option>
                  <option value="град Шумен">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Шумен
                  </option>
                  <option value="област Шумен">област Шумен</option>
                  <option value="град Ямбол">
                    град&nbsp;&nbsp;&nbsp;&nbsp;Ямбол
                  </option>
                  <option value="област Ямбол">област Ямбол</option>
                </select>

                <span
                  // style="color: red; background-color: lightyellow"
                  // class="field-validation-valid"
                  data-valmsg-for="CityRegion"
                  data-valmsg-replace="true"
                ></span>
              </td>
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
                <textarea
                  // style="background-color: "
                  maxLength="300"
                  rows="6"
                  cols="50"
                  id="Description"
                  name="description"
                  value={searchSet.description}
                  onChange={handleChange}
                ></textarea>
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
      </form>
    </Fragment>
  );
};

export default SearchSetCreate;
