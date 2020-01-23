import { createStore, applyMiddleware } from "redux";
import reduxMiddleware from "redux-thunk";
import rootReducer from "../reducers/index";





const store = createStore(rootReducer, applyMiddleware(reduxMiddleware));

export default store;