// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Users } from "../../data/users";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const body = JSON.parse(JSON.stringify(req.body));
    const user = Users.find(
      (user) =>
        user.email === body.email && user.password === parseInt(body.password)
    );
    if (!user) {
      res.status(404).send({ message: "User does not exit!" });
      return;
    }

    res.status(200).json(user as any);
  } catch (error) {
    res.status(405).send({ message: `{error.message}` });
    return;
  }
}
