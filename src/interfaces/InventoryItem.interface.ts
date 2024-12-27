import { Inventory } from "../entities/Inventory.entity";
import { GroupInventory } from "../entities/GroupInventory.entity";
import { Item } from "../entities/Item.entity";

export default interface InventoryItemInterface {
  _id?: number;
  inventory: Inventory;
  item: Item;
  groupInventory?: GroupInventory | null;
  expended?: boolean | null;
}
