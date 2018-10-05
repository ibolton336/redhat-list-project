import { userdataConstants } from "../_constants";

const initialServiceState = {
  articles: null,
  loading: false,
  error: null
};
export function userdata(state = initialServiceState, action) {
  switch (action.type) {
    case userdataConstants.GET_LATEST_REQUEST:
      return { ...state };
    case userdataConstants.GET_LATEST_SUCCESS:
      return { ...state, users: action.users };
    case userdataConstants.GET_LATEST_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}