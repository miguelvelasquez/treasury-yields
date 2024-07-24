import { Collection, ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

type Users = {
  _id: ObjectId;
  username: string;
  orders: { date: string; maturity: string; interestRate: string }[];
  //...
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body);
    const client = await clientPromise;
    const db = client.db("treasury-yields");
    const users: Collection<Users> = await db.collection("users");
    const result = users.findOneAndUpdate(
      { _id: new ObjectId(body.userId) },
      {
        $push: {
          orders: {
            date: body.date,
            maturity: body.maturity,
            interestRate: body.interestRate,
          },
        },
      }
    );

    res.json(result);
  } catch (e) {
    console.error(e);
  }
};
