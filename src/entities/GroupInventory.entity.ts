import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Character } from "./Character.entity";
import { Item } from "./Item.entity";

@Entity()
export class GroupInventory extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ nullable: true, default: null })
  character?: Character;

  @ManyToOne(() => Item, { ref: true })
  item!: Item;

  @Property({ default: false, nullable: true })
  expended?: boolean;

  @Property({ default: false, nullable: true })
  loaned?: boolean;
}
