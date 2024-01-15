import Database from "../db/db";
import Content from "../interfaces/content/content";
import { ContentRepo } from "../interfaces/content/contentRepo";

class MysqlContentRepoImpl implements ContentRepo {
  private db: Database;
  private table: string = "content";

  constructor(db: Database) {
    this.db = db;
  }

  public initTransaction(): void {
    this.db.initTransaction();
  };

  public commitTransaction(): void {
    this.db.commit();
  };

  public rollbackTransaction(): void {
    this.db.rollback();
  };

  public addContent(content: Content): void {
    this.db.insert(this.table, content.toRecord());
  };

}

export default MysqlContentRepoImpl;