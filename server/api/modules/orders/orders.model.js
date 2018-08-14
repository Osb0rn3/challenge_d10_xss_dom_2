import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: String,
    required: true,
    ref: "User"
  },
  owner: {
    type: String,
    required: true,
    ref: "User"
  },
  product: {
    type: String,
    required: true,
    ref: "Product"
  },
  description: {
    type: String,
    required: true
  },
  expired: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Number,
    required: true,
    default: Date.now()
  }
});

orderSchema.statics.setExpiredOrders = function(productId) {
  const ordersUpdateQuery = { $set: { expired: true } };
  return this.update({ productId }, ordersUpdateQuery, { multi: true });
};

mongoose.model("Order", orderSchema);
