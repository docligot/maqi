import { combineReducers } from "redux";
import dataRegionReducer from "./dataRegionReducer";
import selectedDateReducer from "./selectedDateReducer";

const reducers = combineReducers({
    selectedDate : selectedDateReducer,
    data:  dataRegionReducer
});

export default reducers;
