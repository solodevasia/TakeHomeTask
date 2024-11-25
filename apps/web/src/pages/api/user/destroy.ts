import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetch(
    `http://localhost:4000/api/v1/user/${JSON.parse(req.body).id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => await res.json());

  console.log(result);
  res.status(200).json("OK");
}
