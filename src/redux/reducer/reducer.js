import { SET_INFO } from "../constant/user";

let initialState = {
  user: null,
};

export let userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO: {
      state.user = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
