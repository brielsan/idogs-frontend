import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import dogReducer from "./Dog/dogs.reducer";

const store = createStore(
  dogReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
