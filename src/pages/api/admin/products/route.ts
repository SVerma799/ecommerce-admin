import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../../../Models/Product";
import { connectMongoose } from "../../../../../database/mongoose";
import { Category } from "../../../../../Models/Category";
import checkSession from "../../../../../helpers/authentication";

/**
 * Handles the requests to the /api/admin/products route
 *
 * @export
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(await checkSession(req, res))) return;
  const { method } = req;
  await connectMongoose();

  switch (method) {
    case "GET":
      await HandleGetRequest(req, res);
      break;
    case "POST":
      await HandlePostRequest(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

/**
 * Handles the POST requests to the /api/admin/products route
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
async function HandlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
}

/**
 * Handles the GET requests to the /api/admin/products route
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
async function HandleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    let products: typeof Product | (typeof Product)[] | null;
    await Category.find({});
    if (req.query?.id) {
      products = await Product.findOne({ _id: req.query.id }).populate(
        "category"
      );
    } else {
      products = await Product.find({}).populate("category");
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};
