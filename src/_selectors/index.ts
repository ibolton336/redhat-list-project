import { createSelector } from "reselect";

const getSortFilter = state => state.userdata.sortFilter;
const getUsers = state => state.userdata.users;
function compare(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

export const getSortedUsers = createSelector(
  [getSortFilter, getUsers],
  (sortFilter, users) => {
    switch (sortFilter) {
      case "SHOW_UNSORTED":
        return users;
      case "SHOW_SORTED":
        if (users !== null) {
          return users.sort(compare).reverse();
        } else return null;
    }
  }
);
