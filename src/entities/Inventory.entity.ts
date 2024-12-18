import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Character } from "./Character.entity";
import { InventoryItem } from "./InventoryItem.entity";

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  slots?: number;

  @OneToOne(() => Character, { ref: true })
  character!: Character;

  @OneToMany({ mappedBy: "inventory", eager: true, orphanRemoval: true })
  items = new Collection<InventoryItem>(this);
}
