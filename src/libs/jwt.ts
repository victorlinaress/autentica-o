import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ExtendedRequest } from '../types/extended-request'
import { Response } from 'express'

export const createJWT = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string) //criar um jwt com o usuario logado


}

export const verifyJWT  = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ error: "acesso negado" });
        return;
    }

    const token = authHeader.split(' ')[1]; // bearer token

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err, decoded: any) => {
            if (err) {
                res.status(500).json({ error: "acesso negado" });
                return;
            }
            req.userId = decoded.id;
            next();
        }
    );
};
