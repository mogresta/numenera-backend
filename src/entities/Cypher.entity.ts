import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Source } from "./Source.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity()
export class Cypher extends BaseEntity {
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

  @ManyToOne(() => Source, { ref: true })
  source!: Source;
}
