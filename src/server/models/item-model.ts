/**
 * The base model for Jobs, Stories, Comments, Polls and Poll Options in the HN API
 */
export class ItemModel {
  public readonly id: number;

  public readonly by?: string;

  public readonly dead?: boolean;

  public readonly deleted?: boolean;

  public readonly kids?: number[];

  public readonly time?: number;

  public readonly type: string;

  public readonly upvotes: Set<string>;

  constructor(fields: any) {
    if (!fields.id) {
      throw new Error(`Error instantiating item, id invalid: ${fields.id}`);
    } else if (!fields.type) {
      throw new Error(`Error instantiating item, type invalid: ${fields.parent}`);
    }

    this.id = fields.id;
    this.by = fields.by;
    this.dead = fields.dead;
    this.deleted = fields.deleted;
    this.kids = fields.kids;
    this.time = fields.time;
    this.type = fields.type;
    this.upvotes = new Set();
  }
}
