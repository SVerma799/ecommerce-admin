import { NextApiRequest, NextApiResponse } from "next";
import { Category } from "../../../../../Models/Category";
import { connectMongoose } from "../../../../../database/mongoose";
import checkSession from "../../../../../helpers/authentication";

/**
 * Handles the requests to the /api/admin/category route
 *
 * @export
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (!(await checkSession(req, res))) return;
  await connectMongoose();

  switch (method) {
    case "GET":
      handleGetRequest(req, res);
      break;
    case "POST":
      handlePostRequest(req, res);
      break;
    case "DELETE":
      handleDeleteRequest(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

/**
 * Handles the GET requests to the /api/admin/category route
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @return {*}
 */
async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query?.id) {
      const category = await Category.findOne({ _id: req.query.id });
      return res.status(200).json(category);
    }
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

/**
 * Handles the POST requests to the /api/admin/category route
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @return {*}
 */
async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const category = await Category.create(req.body);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

/**
 * Handles the DELETE requests to the /api/admin/category route
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @return {*}
 */
async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const category = await Category.deleteOne(req.body);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
