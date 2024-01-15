import { v4 as uuidv4 } from 'uuid';

import Content from "../infrastructure/interfaces/content/content";
import { ContentRepo } from "../infrastructure/interfaces/content/contentRepo";
import ScriptManagerImpl from "../infrastructure/scriptManagerImpl";

interface ContentController {
  run(filename: string): Promise<void>;
}

class ContentControllerImpl implements ContentController {
  private manager = new ScriptManagerImpl();
  private contentRepo: ContentRepo;

  constructor(contentRepo: ContentRepo) {
    this.contentRepo = contentRepo;
  }

  public async run(fileName: string): Promise<void> {
    const results = await this.manager.runScript(fileName);
    if (results) {
      const data = JSON.parse(results);
      const content = new Content(
        uuidv4(),
        data.scrapper_id,
        data.payload,
        data.aggregate,
        data.created
      )
      try {
        this.contentRepo.initTransaction;
        this.contentRepo.addContent(content)
        this.contentRepo.commitTransaction();
      } catch (error: any) {
        console.error("Error saving content:", error.message);
        this.contentRepo.rollbackTransaction();
      }
    } else {
      console.log("Failed to get script results");
    }
  }
}

export default ContentControllerImpl;
