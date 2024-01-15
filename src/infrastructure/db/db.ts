import * as mysql from "mysql2/promise";
import dotenv from "dotenv";
import { FieldPacket, ResultSetHeader } from "mysql2/promise";

dotenv.config();

class Database {
  private connection: mysql.Connection | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      await this.connection.connect();

      await this.createContentTable();
    } catch (error: any) {
      console.error("Error initializing database connection:", error.message);
    }
  }

  private async createContentTable() {
    if (!this.connection) {
      console.error("Database connection not initialized.");
      return;
    }

    try {
      await this.connection.execute(`
        CREATE TABLE IF NOT EXISTS \`scrapper-engine\`.content (
          id int(11) auto_increment NOT NULL,
          scrapper_id VARCHAR(100) NOT NULL,
          payload VARCHAR(2000) NOT NULL,
          aggregate VARCHAR(50) NOT NULL,
          created DATETIME NOT NULL,
          PRIMARY KEY (id)
        )
        ENGINE=InnoDB
        DEFAULT CHARSET=utf8mb4
        COLLATE=utf8mb4_0900_ai_ci;
      `);

    } catch (error: any) {
      console.error("Error creating content table:", error.message);
    }
  }

  public async insert(table: string, fields: Record<string, any>) {
    try {
      const placeholders: string[] = [];
      const values: any[] = Object.values(fields);
      const fieldNames: string[] = Object.keys(fields);

      for (const name of fieldNames) {
        placeholders.push("?");
      }

      const namesString = fieldNames.join(', ');
      const placeholdersString = placeholders.join(', ');

      const query = `INSERT INTO ${table} (${namesString}) VALUES (${placeholdersString})`;
      const [result] = await this.connection?.execute(query, values) as [ResultSetHeader, FieldPacket[]];

      if (result) {
        console.log(`Inserted ${result.affectedRows} row(s).`);
      }
    } catch (error: any) {
      console.error("Error inserting:", error.message);
    }
  }

  public async initTransaction() {
    try {
      if (this.connection) {
        await this.connection.beginTransaction();
        console.log("Transaction started.");
      } else {
        console.error("Database connection not initialized.");
      }
    } catch (error: any) {
      console.error("Error initiating transaction:", error.message);
    }
  }

  public async commit() {
    try {
      if (this.connection) {
        await this.connection.commit();
        console.log("Transaction committed.");
      } else {
        console.error("Database connection not initialized.");
      }
    } catch (error: any) {
      console.error("Error committing transaction:", error.message);
    }
  }

  public async rollback() {
    try {
      if (this.connection) {
        await this.connection.rollback();
        console.log("Transaction rolled back.");
      } else {
        console.error("Database connection not initialized.");
      }
    } catch (error: any) {
      console.error("Error rolling back transaction:", error.message);
    }
  }
}

export default Database;
