import axios from "axios";
import {
  ADD_NOTIFICATION,
  GET_NOTIFICATION,
  NOTIFICATION_ERROR,
  SYNC_DATA,
} from "../constants/constants";

import { setAlert } from "./alert";

// add and update notification
export const addNotification = (formData, shop) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/live-sale-notification/api/notification_view/${shop}`,
      formData,
      config
    );

    dispatch({
      type: ADD_NOTIFICATION,
      payload: res.data,
    });
    dispatch(
      setAlert("Update the Notification Setting Successfully", "success")
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
    dispatch({
      type: NOTIFICATION_ERROR,
    });
  }
};

// get notification
export const getNotification = (shop) => async (dispatch) => {
  try {
    const res = await axios(
      `/live-sale-notification/api/notification_view/${shop}`
    );
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// sync data
export const syncData = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "/live-sale-notification/api/notification_view"
    );
    dispatch({ type: SYNC_DATA, payload: res.data });
    dispatch(setAlert("SYNC DATA SUCCESS", "success"));
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
