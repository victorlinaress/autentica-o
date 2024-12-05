import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./routers/main";
import * as dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.use(express.json());

server.use(mainRouter);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`servidor rodando em http://localhost:${port}/`);
});
