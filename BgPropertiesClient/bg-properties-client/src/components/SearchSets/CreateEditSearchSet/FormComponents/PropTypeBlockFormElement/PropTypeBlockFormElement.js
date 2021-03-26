import InputFormElement from "../InputFormElement";

const PropTypeInputFormElementConsts = [
  {
    id: "vi1",
    name: "oneRoomPropType",
    type: "checkbox",
    text: "1-СТАЕН",
  },
  {
    id: "vi2",
    name: "twoRoomsPropType",
    type: "checkbox",
    text: "2-СТАЕН",
  },
  {
    id: "vi3",
    name: "threeRoomsPropType",
    type: "checkbox",
    text: "3-СТАЕН",
  },
  {
    id: "vi4",
    name: "fourRoomsPropType",
    type: "checkbox",
    text: "4-СТАЕН",
  },
  {
    id: "vi5",
    name: "multiRoomsPropType",
    type: "checkbox",
    text: "МНОГОСТАЕН",
  },
  {
    id: "vi6",
    name: "maisonettePropType",
    type: "checkbox",
    text: "МЕЗОНЕТ",
  },
  {
    id: "vi8",
    name: "studioPropType",
    type: "checkbox",
    text: "АТЕЛИЕ, ТАВАН",
  },
  {
    id: "vi7",
    name: "officePropType",
    type: "checkbox",
    text: "ОФИС",
  },
  {
    id: "vi12",
    name: "storePropType",
    type: "checkbox",
    text: "МАГАЗИН",
  },
  {
    id: "vi13",
    name: "restaurantPropType",
    type: "checkbox",
    text: "ЗАВЕДЕНИЕ",
  },
  {
    id: "vi14",
    name: "warehousePropType",
    type: "checkbox",
    text: "СКЛАД",
  },
  {
    id: "vi17",
    name: "hotelPropType",
    type: "checkbox",
    text: "ХОТЕЛ",
  },
  {
    id: "vi16",
    name: "industrialPropType",
    type: "checkbox",
    text: " ПРОМ. ПОМЕЩЕНИЕ",
  },
  {
    id: "vi20",
    name: "businessPropType",
    type: "checkbox",
    text: "БИЗНЕС ИМОТ",
  },
  {
    id: "vi9",
    name: "houseFloorPropType",
    type: "checkbox",
    text: "ЕТАЖ ОТ КЪЩА",
  },
  {
    id: "vi10",
    name: "housePropType",
    type: "checkbox",
    text: "КЪЩА",
  },
  {
    id: "vi11",
    name: "villagePropType",
    type: "checkbox",
    text: "ВИЛА",
  },
  {
    id: "vi18",
    name: "plotPropType",
    type: "checkbox",
    text: "ПАРЦЕЛ",
  },
  {
    id: "vi15",
    name: "garagePropType",
    type: "checkbox",
    text: "ГАРАЖ",
  },
  {
    id: "vi19",
    name: "landPropType",
    type: "checkbox",
    text: "ЗЕМЕДЕЛСКА ЗЕМЯ",
  },
];

const PropTypeBlockFormElement = ({ blockDetails, searchSet, handleChange }) => {
  return (
      <td width="153" valign="top">
        <div
          id={blockDetails.id}
          // style="width: 145px;height: 243px;background-color: bisque; border-color: red;  padding: 3px;"
        >
          {PropTypeInputFormElementConsts &&
            PropTypeInputFormElementConsts.slice(blockDetails.from, blockDetails.to).map((x) => (
              <InputFormElement
                key={x.id}
                details={x}
                checked={searchSet[x.name]}
                handleChange={handleChange}
              />
            ))}
        </div>
      </td>
  );
};

export default PropTypeBlockFormElement;
