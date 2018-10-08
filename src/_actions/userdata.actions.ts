import { userdataConstants } from "../_constants";
import { usersService } from "../_services/users.service";

export const userdataActions = {
  getLatest,
  setSortFilter,
  setFavorites
};

function getLatest() {
  return dispatch => {
    dispatch(request());
    let payload;
    usersService.getLatest(payload).then(
      data => {
        dispatch(success(data.data));
      },

      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userdataConstants.GET_LATEST_REQUEST };
  }
  function success(users) {
    return { type: userdataConstants.GET_LATEST_SUCCESS, users };
  }
  function failure(error) {
    return { type: userdataConstants.GET_LATEST_ERROR, error };
  }
}

function setSortFilter(filter) {
  return { type: userdataConstants.SET_SORT_FILTER, filter };
}
function setFavorites(favorites) {
  return { type: userdataConstants.SET_FAVORITES, favorites };
}
