import { Types } from "./actionTypes";

export const ActionCreators = {
  login: (user) => ({ type: Types.LOGIN, payload: { user } }),
};
