import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./redux/reducer/reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const root = ReactDOM.createRoot(document.getElementById("root"));

//  npm i @reduxjs/toolkit
//  Redux Toolkit : giúp khỏi cần tạo thêm root và thông qua
//  configureStore : ko cần tạo rootReducer và có sẵn redux dev tool
// let store = configureStore({
//   reducer: {
//     userReducer,
//   },
// });

// cách redux thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let rootReducer = combineReducers({
  userReducer,
});
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
