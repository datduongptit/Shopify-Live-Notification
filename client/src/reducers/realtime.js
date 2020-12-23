import {
  ADD_REALTIME,
  GET_REALTIME,
  REALTIME_ERROR,
} from "../constants/constants";

const initialState = {
  realtimeSetting: null,
  error: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REALTIME:
      return {
        ...state,
        realtimeSetting: payload,
        loading: false,
      };
    case ADD_REALTIME:
      return {
        ...state,
        realtimeSetting: [payload],
        loading: false,
      };
    case REALTIME_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
