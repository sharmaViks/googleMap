import { combineReducers } from "redux";
import autoComplete from "./autoComplete";

const mainReducer = combineReducers({
    autoComplete
});

const rootReducer = (state, action) => {
    return mainReducer(state, action);
};

export default rootReducer;