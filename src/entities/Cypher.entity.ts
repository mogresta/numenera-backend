import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Source } from "./Source.entity";

@Entity()
export class Cypher {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: "text" })
  description = "";

  @Property()
  level!: number;

  @Property({ type: "text" })
  forms = "";

  @ManyToOne()
  source!: Source;
}
