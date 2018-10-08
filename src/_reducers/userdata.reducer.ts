import { userdataConstants } from "../_constants";

const initialServiceState = {
  users: null,
  loading: false,
  error: null,
  sortFilter: "SHOW_SORTED",
  favorites: []
};
export function userdata(state = initialServiceState, action) {
  switch (action.type) {
    case userdataConstants.GET_LATEST_REQUEST:
      return { ...state };
    case userdataConstants.GET_LATEST_SUCCESS:
      return {
        ...state,
        users: action.users
      };
    case userdataConstants.GET_LATEST_ERROR:
      return { ...state, error: action.payload };
    case userdataConstants.SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };
    case userdataConstants.SET_FAVORITES:
      return { ...state, favorites: action.favorites };
    default:
      return state;
  }
}
