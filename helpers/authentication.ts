import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Helper function to check the session before handling the request
async function checkSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: "Unauthorized Access. Kindly Login First." });
    return false;
  }
  return true;
}

export default checkSession;
