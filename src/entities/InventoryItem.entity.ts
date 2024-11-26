import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Item } from "./Item.entity";
import { Inventory } from "./Inventory.entity";
import { GroupInventory } from "./GroupInventory.entity";

@Entity()
export class InventoryItem extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Inventory, { ref: true })
  inventory!: Inventory;

  @ManyToOne(() => Item, { ref: true })
  item!: Item;

  @OneToOne(() => GroupInventory, { ref: true, nullable: true, default: null })
  groupInventory?: GroupInventory;

  @Property({ default: false, nullable: true })
  expended?: boolean;
}
