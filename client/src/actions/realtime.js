import axios from "axios";
import {
  ADD_REALTIME,
  GET_REALTIME,
  REALTIME_ERROR,
} from "../constants/constants";
import { setAlert } from "./alert";

// Create and update
export const addRealtimeSetting = (formData, shop) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/live-sale-notification/api/notification_visit/${shop}`,
      formData,
      config
    );

    dispatch({
      type: ADD_REALTIME,
      payload: res.data,
    });
    dispatch(setAlert("Save Realtime Setting successful", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
    dispatch({
      type: REALTIME_ERROR,
    });
  }
};

export const getRealtimeSetting = (shop) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/live-sale-notification/api/notification_visit/${shop}`
    );
    dispatch({
      type: GET_REALTIME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REALTIME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
