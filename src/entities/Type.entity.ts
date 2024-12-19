import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Item } from "./Item.entity";

@Entity()
export class Type extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany({ mappedBy: "type", eager: true, orphanRemoval: true })
  items = new Collection<Item>(this);
}
