import mongoose from "mongoose";

const Order = mongoose.model("Order");
const populateOwnerConfig = {
  path: "owner",
  select: "-password"
};
const populateUserConfig = {
  path: "user",
  select: "-password"
};
const populateProductConfig = {
  path: "product"
};

export const addOrder = (req, res, next) => {
  const { userId: user } = req.session;
  const { product, owner, description } = req.body;
  const order = new Order({
    user,
    owner,
    product,
    description
  });
  order
    .save()
    .then(order => res.status(200).json({ order }))
    .catch(error => next(error));
};

export const getUsersOrders = (req, res, next) => {
  const { userId: owner } = req.session;
  Order.find({ owner })
    .populate(populateOwnerConfig)
    .populate(populateUserConfig)
    .populate(populateProductConfig)
    .sort({ date: -1 })
    .then(orders => res.status(200).json({ orders }))
    .catch(error => next(error));
};

export const getDoneOrders = (req, res, next) => {
  const { userId: user } = req.session;
  Order.find({ user })
    .populate(populateOwnerConfig)
    .populate(populateUserConfig)
    .populate(populateProductConfig)
    .sort({ date: -1 })
    .then(orders => res.status(200).json({ orders }))
    .catch(error => next(error));
};
