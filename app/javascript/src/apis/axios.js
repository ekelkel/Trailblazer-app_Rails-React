import axios from "axios";

export const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.xsrfCookieName = "CSRF-TOKEN";
  axios.defaults.xsrfHeaderName = "X-CSRF-Token";
  axios.defaults.withCredentials = true;
  setLoading(false);
};
