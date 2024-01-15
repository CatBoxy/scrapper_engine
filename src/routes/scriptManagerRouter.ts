import { Router, Request, Response } from "express";
import ScriptManagerControllerImpl from "../controllers/scriptManagerController";

const router = Router();
const scriptManagerController = new ScriptManagerControllerImpl();

router.get("/scriptManager/:filename", async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;

    await scriptManagerController.run(filename);
    res.json({ message: "Script executed successfully" });
  } catch (error) {
    console.error("Error executing script:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
