import { userdataConstants } from "../_constants";

const initialServiceState = {
  users: null,
  loading: false,
  error: null,
  sortFilter: "SHOW_SORTED"
  // sortFilter: "SHOW_UNSORTED"
};
export function userdata(state = initialServiceState, action) {
  switch (action.type) {
    case userdataConstants.GET_LATEST_REQUEST:
      return { ...state };
    case userdataConstants.GET_LATEST_SUCCESS:
      return { ...state, users: action.users };
    case userdataConstants.GET_LATEST_ERROR:
      return { ...state, error: action.payload };
    case userdataConstants.SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };
    default:
      return state;
  }
}
