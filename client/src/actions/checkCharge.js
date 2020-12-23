import axios from "axios";

import { GET_CHARGE, CHARGE_ERROR } from "../constants/constants";

export const getCharge = (shop) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/live-sale-notification/api/check-charge/check-active/${shop}`
    );
    dispatch({ type: GET_CHARGE, payload: res.data });
  } catch (err) {
    dispatch({
      type: CHARGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
