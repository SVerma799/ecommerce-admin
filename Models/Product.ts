import mongoose, { model, models, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  image: { type: Object },
});

export const Product = models.Product || model("Product", ProductSchema);
