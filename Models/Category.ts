import mongoose, { Schema } from "mongoose";

const CategorySchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
