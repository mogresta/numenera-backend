export default interface GroupInventoryItemInterface {
  _id?: number;
  item: number;
  character?: number | null;
  expended?: boolean | null;
  loaned?: boolean | null;
}
