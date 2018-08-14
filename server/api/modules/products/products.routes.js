import { Router } from "express";
import {
  requiresToBeLoggedIn,
  requiresNotToBeLoggedIn
} from "../../../middleware/auth";
import { checkExpressValidator } from "../../../middleware/validator";
import * as productHandlers from "./products.handlers";
import * as productValidator from "./products.validator";

export const init = api => {
  const router = new Router();

  router.get("/", requiresToBeLoggedIn, productHandlers.getUsersProducts);

  router.get("/all", productHandlers.getProducts);

  router.post(
    "/",
    requiresToBeLoggedIn,
    productValidator.validateProductAdd,
    checkExpressValidator,
    productHandlers.addProduct
  );

  router.post(
    "/edit/:id",
    requiresToBeLoggedIn,
    productValidator.validateProductEdit,
    checkExpressValidator,
    productHandlers.editProduct
  );

  router.post(
    "/delete/:id",
    requiresToBeLoggedIn,
    productHandlers.deleteProduct
  );

  api.use("/products", router);
};
