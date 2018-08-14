import { makeRequest } from "../utils/fetchUtils";
import HttpMethods from "../constants/HttpMethods";

/**
 * product api proxy functions
 */
const EMPTY_OBJET = {};
const PRODUCT_PROXY_URI = "/api/products";

export const addProduct = (name, description) =>
  makeRequest(`${PRODUCT_PROXY_URI}/`, HttpMethods.POST, EMPTY_OBJET, {
    name,
    description
  });

export const getUsersProducts = () => makeRequest(`${PRODUCT_PROXY_URI}/`);

export const getAllProducts = () => makeRequest(`${PRODUCT_PROXY_URI}/all`);

export const deleteProuct = id =>
  makeRequest(`${PRODUCT_PROXY_URI}/delete/${id}`, HttpMethods.POST);

export const editProduct = (id, name, description) =>
  makeRequest(
    `${PRODUCT_PROXY_URI}/edit/${id}`,
    HttpMethods.POST,
    EMPTY_OBJET,
    {
      name,
      description
    }
  );
