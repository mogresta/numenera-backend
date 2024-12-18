import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";

@Entity()
export class Oddity extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ type: "text" })
  description = "";
}
