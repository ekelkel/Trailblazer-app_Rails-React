import { Types } from "./actionTypes";

export const ActionCreators = {
  login: (user) => ({ type: Types.LOGIN, payload: { user } }),
  update: (user) => ({ type: Types.UPDATE, payload: { user } }),
};
