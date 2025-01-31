import { NextFunction, Request, Response } from "express";
import { Inventory } from "../entities/Inventory.entity";
import { InventoryItem } from "../entities/InventoryItem.entity";
import { GroupInventory } from "../entities/GroupInventory.entity";
import { Character } from "../entities/Character.entity";
import InventoryItemInterface from "../interfaces/InventoryItem.interface";
import { Item } from "../entities/Item.entity";
import { BaseService } from "./Base.service";
import { NotFoundError } from "../utils/NotFound.error";
import { ServiceError } from "../utils/Service.error";

export class InventoryService extends BaseService {
  async getInventory(characterId: number) {
    const em = this.getEntityManager();

    const character = em.getReference(Character, characterId);

    try {
      const inventory: Inventory | null = await em.findOne(
        Inventory,
        { character: character },
        { populate: ["*"] },
      );

      return inventory;
    } catch (error) {
      throw new NotFoundError("Inventory not found.");
    }
  }

  async addItemToInventory(
    character: number,
    item: number,
    groupInventory: number | null = null,
  ) {
    const em = this.getEntityManager();

    try {
      const inventory: Inventory | null = await em.findOne(Inventory, {
        character: character,
      });

      if (!inventory) {
        throw new NotFoundError("Inventory not found.");
      }

      const inventoryItemData: InventoryItemInterface = {
        inventory: inventory,
        item: em.getReference(Item, item),
        groupInventory: groupInventory
          ? em.getReference(GroupInventory, groupInventory)
          : null,
        expended: false,
      };

      const inventoryItem: InventoryItem = em.create(InventoryItem, {
        ...inventoryItemData,
      });
      await em.persistAndFlush(inventoryItem);
    } catch (error: any) {
      throw new ServiceError("Failed adding item to inventory.", error.message);
    }
  }

  async expendItemFromInventory(id: number) {
    const em = this.getEntityManager();

    const inventoryItem: InventoryItem | null = await em.findOne(
      InventoryItem,
      { id: id },
    );

    if (!inventoryItem) {
      throw new NotFoundError("Inventory not found.");
    }

    try {
      inventoryItem.assign({ expended: true });

      await em.persistAndFlush(inventoryItem);

      if (inventoryItem.groupInventory) {
        const groupInventoryItem: GroupInventory | null = await em.findOne(
          GroupInventory,
          { id: inventoryItem.groupInventory.id },
        );

        if (groupInventoryItem) {
          groupInventoryItem.assign({ expended: true });

          await em.persistAndFlush(groupInventoryItem);
        }
      }
    } catch (error) {
      throw new ServiceError("Item update unsuccessful.", error);
    }
  }

  // Items are only deleted from inventory if they were returned to group,
  // otherwise they are "soft-deleted" aka. expended
  async deleteItemFromInventory(groupInventoryItemId: number) {
    const em = this.getEntityManager();

    const inventoryItem: InventoryItem | null = await em.findOne(
      InventoryItem,
      { groupInventory: groupInventoryItemId },
    );

    if (!inventoryItem) {
      throw new NotFoundError("Inventory not found.");
    }

    try {
      await em.removeAndFlush(inventoryItem);
    } catch (error) {
      throw new ServiceError("Deleting item unsuccessful.", error);
    }
  }
}
