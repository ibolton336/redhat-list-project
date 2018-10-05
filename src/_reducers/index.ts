import { combineReducers, createStore } from "redux";
import { userdata } from "./userdata.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  userdata,
  alert
});

export default rootReducer;
