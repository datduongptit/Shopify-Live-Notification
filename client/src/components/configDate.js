import Moment from "moment";
let today = new Date();
let date = (format) => {
  return Moment(today).format(format);
};
export const configDate = [
  {
    label: date("MM/DD/YY"),
    value: "m/d/y",
  },
  {
    label: date("DD/MM/YY"),
    value: "d/m/y",
  },
  {
    label: date("YY/MM/DD"),
    value: "y/m/d",
  },
  {
    label: date("YY.MM.DD"),
    value: "y.m.d",
  },
  {
    label: date("DD.MM.YY"),
    value: "d.m.y",
  },
  {
    label: date("YYYY-MM-DD"),
    value: "Y-m-d",
  },
  {
    label: date("DD-MM-YY"),
    value: "d-m-y",
  },
  {
    label: date("DD MMM, YY"),
    value: "d M, y",
  },
  {
    label: date("DD MMM, YYYY"),
    value: "d M, Y",
  },
  {
    label: date("DD MMMM, YY"),
    value: "d F, y",
  },
  {
    label: date("DD MMMM, YYYY"),
    value: "d F, Y",
  },
  {
    label: date("dddd, DD MMMM, YYYY"),
    value: "l, d F, Y",
  },
  {
    label: date("ddd, MMM DD, YYYY"),
    value: "D, M d, Y",
  },
  {
    label: date("dddd, MMM DD, YYYY"),
    value: "l, M d, Y",
  },
  {
    label: date("dddd, MMMM DD, YYYY"),
    value: "l, F d, Y",
  },
  {
    label: date("ddd, MMMM DD, YYYY"),
    value: "D, F d, Y",
  },
];
