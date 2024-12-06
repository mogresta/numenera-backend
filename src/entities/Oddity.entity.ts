import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Oddity {
  @PrimaryKey()
  id!: number;

  @Property({ type: "text" })
  description = "";
}
