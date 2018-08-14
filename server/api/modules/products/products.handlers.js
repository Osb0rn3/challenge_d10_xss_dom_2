import mongoose from "mongoose";

const Product = mongoose.model("Product");
const Order = mongoose.model("Order");
const populateUserConfig = {
  path: "user",
  select: "-password"
};

export const addProduct = (req, res, next) => {
  const { userId: user } = req.session;
  const { name, description } = req.body;
  const product = new Product({
    name,
    description,
    user
  });
  product
    .save()
    .then(newProduct => res.status(200).json({ product: newProduct }))
    .catch(error => next(error));
};

export const editProduct = (req, res, next) => {
  const { userId: user } = req.session;
  const { id } = req.params;
  const { name, description } = req.body;
  Product.findById(id).then(product => {
    if (product.user.toString() !== user) {
      return res.sendStatus(403);
    }
    const productUpdateQuery = {
      $set: {
        name,
        description,
        date: Date.now()
      }
    };
    Product.findByIdAndUpdate(id, productUpdateQuery, { new: true })
      .then(newProduct => res.status(200).json({ product: newProduct }))
      .catch(error => next(error));
  });
};

export const getUsersProducts = (req, res, next) => {
  const { userId: user } = req.session;
  Product.find({ user })
    .populate(populateUserConfig)
    .sort({ date: -1 })
    .then(products => res.status(200).json({ products }))
    .catch(error => next(error));
};

export const getProducts = (req, res, next) => {
  const { userId: user } = req.session;
  Product.find({ user: { $ne: user } })
    .populate(populateUserConfig)
    .sort({ date: -1 })
    .then(products => res.status(200).json({ products }))
    .catch(error => next(error));
};

export const deleteProduct = (req, res, next) => {
  const { userId: user } = req.session;
  const { id } = req.params;
  Product.findById(id).then(product => {
    if (product.user.toString() !== user) {
      return res.status(403);
    }
    Product.findByIdAndRemove(id)
      .then(() => Order.setExpiredOrders(id))
      .then(() => res.sendStatus(200))
      .catch(error => next(error));
  });
};
