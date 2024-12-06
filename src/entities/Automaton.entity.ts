import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Source } from "./Source.entity";

@Entity()
export class Automaton {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: "text" })
  description = "";

  @Property()
  level!: number;

  @Property({ type: "text" })
  material = "";

  @Property()
  depletion!: string;

  @Property({ type: "text" })
  modification = "";

  @Property({ type: "text" })
  reproduction = "";

  @ManyToOne()
  source!: Source;
}
