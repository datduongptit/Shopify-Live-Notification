import { combineReducers } from "redux";
import manualSale from ".//manualSale";
import alert from "./alert";
import realtime from "./realtime";
import notification from "./notification";
import checkCharge from "./checkCharge";
import checkUrl from "./checkUrl";
export default combineReducers({
  manualSale,
  alert,
  realtime,
  notification,
  checkCharge,
  checkUrl,
});
