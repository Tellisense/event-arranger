import axios from "axios";

import { toast } from "react-toastify";

import logger from "./logService";

// this will set the default base URL from the .env file depending on development env or production
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // if unexpected error occurs log the error and show message to use
    logger.log(error);
    toast.error(error.message);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
