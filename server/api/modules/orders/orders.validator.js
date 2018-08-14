import { check } from "express-validator/check";

export const validateOrderAdd = [
  check("product")
    .exists()
    .isLength({ min: 1 })
    .withMessage("Please provide productId"),
  check("owner")
    .exists()
    .isLength({ min: 1 })
    .withMessage("Please provide ownerId."),
  check("description")
    .exists()
    .isLength({ min: 1 })
    .withMessage("Please provide description.")
];
