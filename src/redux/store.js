import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./reducers";

const reducer = compose()(mainReducer);

const middlewares = applyMiddleware(thunk);
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
const store = createStore(
  reducer,
  composeEnhancers(middlewares)
);

export default store;