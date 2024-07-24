import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;
    const client = await clientPromise;
    const db = client.db("treasury-yields");
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId as string) });
    res.json(user);
  } catch (e) {
    console.error(e);
  }
};
