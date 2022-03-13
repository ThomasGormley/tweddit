import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type TAuthToken = {
    name: string;
};

export default async function authToken(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    // console.log(req, res);
    const token: any = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    try {
        return res.status(200).json({
            ...token,
        });
    } catch (e: any) {
        return res.status(400).json({
            status: e?.message,
        });
    }
}
