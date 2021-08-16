import { Types } from "./actionTypes";

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      console.log("login", action.payload.user);
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.UPDATE:
      console.log("update", action.payload.user);
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default reducer;
