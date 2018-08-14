import { makeRequest } from "../utils/fetchUtils";
import HttpMethods from "../constants/HttpMethods";

/**
 * order api proxy functions
 */
const EMPTY_OBJECT = {};
const ORDER_PROXY_URI = "/api/orders";

export const getMyOrders = () => makeRequest(`${ORDER_PROXY_URI}/my`);

export const getOrdersToMe = () => makeRequest(`${ORDER_PROXY_URI}/toMe`);

export const addOrder = (productId, ownerId, description) =>
  makeRequest(`${ORDER_PROXY_URI}/`, HttpMethods.POST, EMPTY_OBJECT, {
    product: productId,
    owner: ownerId,
    description
  });
