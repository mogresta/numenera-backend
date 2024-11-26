export default interface InventoryItemInterface {
  _id?: number;
  inventory: number;
  item: number;
  groupInventory?: number | null;
  expended?: boolean | null;
}
