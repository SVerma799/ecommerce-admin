import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../../Models/Product";
import { connectMongoose } from "../../../../database/mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await connectMongoose();

  switch (method) {
    case "GET":
      try {
        let products: typeof Product | (typeof Product)[] | null;
        if (req.query?.id) {
          products = await Product.findOne({ _id: req.query.id });
        } else {
          products = await Product.find({}).populate("category");
        }
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    case "POST":
      try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
