import { RequestHandler, Response } from "express"; // Importando Response corretamente
import { ExtendedRequest } from "../types/extended-request";
import { getUserById } from "../services/user";

export const test: RequestHandler = async (req: ExtendedRequest, res: Response) => {
    if (!req.userId) {
        res.status(401).json({ error: "acesso negado" });
        return;
    }

    const user = await getUserById(req.userId);
    if (!user) {
        res.status(401).json({ error: "acesso negado" });
        return;
    }

    res.json({ user });
};
