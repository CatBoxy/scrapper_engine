import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

import scriptManagerRouter from "./routes/scriptManagerRouter"; 

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("/api", scriptManagerRouter);
