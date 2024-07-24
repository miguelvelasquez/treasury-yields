import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body);
    const client = await clientPromise;
    const db = client.db("treasury-yields");
    const user = await db
      .collection("users")
      .findOne({ username: body.username });
    res.json(user);
  } catch (e) {
    console.error(e);
  }
};
