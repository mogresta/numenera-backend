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
export class Source extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany({ mappedBy: "source", eager: true, orphanRemoval: true })
  artefacts = new Collection<Item>(this);
}
