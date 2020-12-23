import { GET_CHARGE, CHARGE_ERROR } from "../constants/constants";

const initialState = {
  charge: null,
  error: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHARGE:
      return {
        ...state,
        charge: payload,
        loading: false,
      };
    case CHARGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
