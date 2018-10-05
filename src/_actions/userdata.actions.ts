import { userdataConstants } from "../_constants";
import { newsService } from "../_services/news.service";

export const userdataActions = {
  getLatest
};

function getLatest() {
  return dispatch => {
    dispatch(request());
    let payload;
    newsService.getLatest(payload).then(
      data => {
        dispatch(success(data.data));
      },

      error => {
        dispatch(failure(error));
        // dispatch(alertActions.error(error))
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
