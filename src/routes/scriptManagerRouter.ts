import { Router, Request, Response } from "express";
import ContentControllerImpl from "../controllers/contentController";
import Database from "../infrastructure/db/db";
import MysqlContentRepoImpl from "../infrastructure/repositories/mysqlContentRepoImpl";

const router = Router();

router.get("/scriptManager/:filename", async (req: Request, res: Response) => {
  const db = new Database();
  const contentRepo = new MysqlContentRepoImpl(db)
  const contentController = new ContentControllerImpl(contentRepo);
  try {
    const { filename } = req.params;

    await contentController.run(filename);
    res.json({ message: "Script executed successfully" });
  } catch (error) {
    console.error("Error executing script:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
