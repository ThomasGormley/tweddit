import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type TAuthToken = {
    name: string;
};

export default async function authToken(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const token: any = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("token api", token);

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
