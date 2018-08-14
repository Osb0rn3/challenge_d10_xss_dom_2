import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true,
    default: Date.now()
  }
});

mongoose.model("Product", productSchema);
