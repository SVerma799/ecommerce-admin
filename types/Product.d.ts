import { Category } from "./Category";

export type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
};
