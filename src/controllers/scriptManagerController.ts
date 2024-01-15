import ScriptManagerImpl from "../infrastructure/scriptManager";

interface ScriptManagerController {
  run(filename: string): Promise<void>;
}

class ScriptManagerControllerImpl implements ScriptManagerController {
  private manager = new ScriptManagerImpl();

  public async run(fileName: string): Promise<void> {
    await this.manager.runScript(fileName);
  }
}

export default ScriptManagerControllerImpl;
