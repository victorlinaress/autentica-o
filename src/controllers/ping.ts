import { RequestHandler } from "express";

export const ping: RequestHandler = (req,res) => { //verificar se o servidor está on
    res.json({pong: true})
}