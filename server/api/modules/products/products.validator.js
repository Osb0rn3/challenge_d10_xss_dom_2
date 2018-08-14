import { check } from "express-validator/check";

export const validateProductAdd = [
  check("name")
    .exists()
    .isLength({ min: 1 })
    .withMessage("Please provide name."),
  check("description")
    .exists()
    .isLength({ min: 1 })
    .withMessage("Please provide description.")
];

export const validateProductEdit = [...validateProductAdd];
