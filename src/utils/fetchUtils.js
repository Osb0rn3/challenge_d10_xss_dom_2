import { STATUS_OK } from "../constants/ResponseStatuses";

const BASE_URL = "https://localhost:4000";

/**
 * api fetching helper functions
 * */

/**
 * Checking response status
 * */
const checkStatus = response => {
  const { status } = response;
  if ((status >= 200 && status < 300) || (status >= 400 && status < 500)) {
    return response;
  }

  let error = new Error(response.statusText);
  error.response = response;
  throw error;
};

/**
 * parsing response json
 * */
export const parseJSON = response =>
  response.json().then(data => {
    return {
      data,
      status: response.status
    };
  });

/**
 * parsing object to query string
 * */
export const objectToQueryString = queryObject => {
  return Object.keys(queryObject)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`
    )
    .join("&");
};

/**
 * making api request
 * */
export const makeRequest = (url, method = "GET", query = {}, body = {}) => {
  const queryString = objectToQueryString(query)
    ? "?" + objectToQueryString(query)
    : "";
  const fetchUrl = `${BASE_URL}${url}${queryString}`;
  const fetchParams = { method, credentials: "include" };

  if (method === "POST") {
    fetchParams.body = JSON.stringify(body);
    fetchParams.headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }

  return fetch(fetchUrl, fetchParams)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      console.error("request failed - ", error);
    });
};

const defaultFailCallback = function(error) {
  console.log("something went wrong", error);
};

/**
 * Global request handler methods,
 * @param {Promise} request Promise
 * @param {Object}  callbackMap 'map with status keys and appropriate callback values'
 * @param {Function} failCallBack 'callback for handling request fail status'
 * */
export const requestHandler = (
  request,
  callbackMap,
  failCallBack = defaultFailCallback
) => {
  request
    .then(({ data, status }) => {
      if (status >= 200 && status < 305) {
        callbackMap[STATUS_OK](data);
      } else
        Object.keys(callbackMap).forEach(item => {
          if (+item === status) {
            callbackMap[item](data);
          }
        });
    })
    .catch(failCallBack);
};
