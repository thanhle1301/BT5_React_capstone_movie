import { SET_INFO, SET_REGISTOR } from "../constant/user";

let initialState = {
  user: JSON.parse(localStorage.getItem("USER_INFO")),
  registor: null,
};

export let userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO: {
      state.user = { ...action.payload };
      return { ...state };
    }
    case SET_REGISTOR: {
      state.registor = { ...action.payload };
      return { ...state };
    }

    default:
      return state;
  }
};
