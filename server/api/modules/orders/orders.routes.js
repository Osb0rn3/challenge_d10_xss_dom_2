import { Router } from "express";
import {
  requiresToBeLoggedIn,
  requiresNotToBeLoggedIn
} from "../../../middleware/auth";
import { checkExpressValidator } from "../../../middleware/validator";
import * as ordersHandlers from "./orders.handlers";
import * as ordersValidator from "./orders.validator";

export const init = api => {
  const router = new Router();

  router.get("/my", requiresToBeLoggedIn, ordersHandlers.getDoneOrders);

  router.get("/toMe", requiresToBeLoggedIn, ordersHandlers.getUsersOrders);

  router.post(
    "/",
    requiresToBeLoggedIn,
    ordersValidator.validateOrderAdd,
    checkExpressValidator,
    ordersHandlers.addOrder
  );

  api.use("/orders", router);
};
