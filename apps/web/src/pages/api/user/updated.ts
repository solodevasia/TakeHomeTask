import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(JSON.parse(req.body));
    
    const result = await fetch(`http://localhost:4000/api/v1/user/${JSON.parse(req.body).id}`, {
        method: 'PUT',
        headers: {
            "Authorization":`Bearer ${req.headers.cookie?.split('token=')?.join('')}`,
            'Content-Type': 'application/json'
        },
        body: req.body
    }).then(async(res) => await res.json())
    console.log(result,'<<<<');
    res.status(200).json("OK")
}