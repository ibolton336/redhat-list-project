import { userdataConstants } from "../_constants";
import { usersService } from "../_services/users.service";
import { zipcodeService } from "../_services/zipcode.service";

export const userdataActions = {
  getLatest,
  setSortFilter,
  setFavorites
};

function getLatest() {
  return dispatch => {
    dispatch(request());
    let payload;
    usersService.getLatest(payload).then(data => {
      dispatch(mapZipcodes(data));
    });

    error => {
      dispatch(failure(error));
    };
  };

  function request() {
    return { type: userdataConstants.GET_LATEST_REQUEST };
  }
  function mapZipcodes(users) {
    return dispatch => {
      dispatch(request());
      let payload;
      var promises = [];
      users.data.forEach((user, i) => {
        console.log("user", user);
        promises.push(
          zipcodeService
            .getStateFromZip(user.address.zipcode.slice(0, 5), payload)
            .then(stateData => {
              console.log("statedata", stateData);
              user.address.state = stateData.data.state;
              return user;
            })
            .catch(err => {
              return user;
            })
        );
      });
      Promise.all(promises).then(() => dispatch(success(users.data)));
    };
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
