import { createStore ,combineReducers} from "redux";
import {reducer} from "./Cashier_reducer.js";
import { Admin_reducer } from "./Admin_reducer.js";
const rootReducer= combineReducers({
    cashier_reducer:reducer,
    admin_reducer:Admin_reducer
})
const Store= createStore(rootReducer);
console.log(Store.getState());
export default Store;