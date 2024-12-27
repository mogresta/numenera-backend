import { Item } from "../entities/Item.entity";
import { Character } from "../entities/Character.entity";

export default interface GroupInventoryItemInterface {
  _id?: number;
  item: Item;
  character?: Character | null;
  expended?: boolean | null;
  loaned?: boolean | null;
}
