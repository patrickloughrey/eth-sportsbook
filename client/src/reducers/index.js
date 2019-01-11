import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

/* Combine our reducers into one reducer */
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
