import Content from "./content";

export interface ContentRepo {

  initTransaction(): void;

  commitTransaction(): void;

  rollbackTransaction(): void;

  addContent(content: Content): void;
}
