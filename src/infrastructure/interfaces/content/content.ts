class Content {
  public id;
  public scrapper_id;
  public payload;
  public aggregate;
  public created;

  constructor(id: string, scrapper_id: string, payload: string, aggregate: string, created: Date) {
    this.id = id;
    this.scrapper_id = scrapper_id;
    this.payload = payload;
    this.aggregate = aggregate;
    this.created = created;
  }

  public toRecord(): Record<string, any> {
    return {
      id: this.id,
      scrapper_id: this.scrapper_id,
      payload: this.payload,
      aggregate: this.aggregate,
      created: this.created,
    };
  }
}

export default Content;