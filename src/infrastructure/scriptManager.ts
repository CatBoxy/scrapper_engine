import { PythonShell, Options } from "python-shell";

interface ScriptManager {
  runScript(scriptFileName: string, args?: string[]): Promise<void>;
}

class ScriptManagerImpl implements ScriptManager {
  private options: Options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: "./src/scrapper",
  };

  public async runScript(scriptFileName: string, args?: string[]): Promise<void> {
    const optionsWithArgs: Options = { ...this.options, args };

    return new Promise<void>((resolve, reject) => {
      PythonShell.run(scriptFileName, optionsWithArgs)
        .then((results: any) => {
          console.log("results: %j", results);
          resolve();
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export default ScriptManagerImpl;
