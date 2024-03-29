import { PythonShell, Options } from "python-shell";

interface ScriptManager {
  runScript(scriptFileName: string, args?: string[]): Promise<string>;
}

class ScriptManagerImpl implements ScriptManager {
  private options: Options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: "./src/scrapper",
  };

  public async runScript(scriptFileName: string, args?: string[]): Promise<string> {
    const optionsWithArgs: Options = { ...this.options, args };

    return new Promise<string>((resolve, reject) => {
      PythonShell.run(scriptFileName, optionsWithArgs)
        .then((results: any) => {
          console.log("results: %j", results);
          resolve(results);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export default ScriptManagerImpl;
