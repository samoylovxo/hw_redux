import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";

import { notesReducer } from "./reducers/notesReducer";

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION();

const configureStore = () =>
  createStore(
    combineReducers({
      notes: notesReducer,
    }),
    undefined,
    compose(ReactReduxDevTools)
  );

export { configureStore };
