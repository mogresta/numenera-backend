import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Source } from "./Source.entity";

@Entity()
export class Artefact extends BaseEntity {
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

  @Property()
  depletion!: string;

  @ManyToOne(() => Source, { ref: true })
  source!: Source;
}
