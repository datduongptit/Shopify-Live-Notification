import { 
    ADD_NOTIFICATION,
    GET_NOTIFICATION, 
    NOTIFICATION_ERROR,
    SYNC_DATA
 } from '../constants/constants';


 const initialState = {
     notification: null,
     error: {},
     loading: true
 }


export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                notification: [payload],
                loading: false
            }
        case GET_NOTIFICATION:
            return{ 
                ...state,
                notification: payload,
                loading: false
            }
        case NOTIFICATION_ERROR: 
            return {
                ...state,
                error: payload,
                loading: false
            }
        case SYNC_DATA:
            return {
                ...state,
                notification: payload
            }
        default:
            return state
    }
}