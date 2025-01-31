import { NextFunction, Request, Response } from "express";
import { EntityManager } from "@mikro-orm/core";
import { GroupInventory } from "../entities/GroupInventory.entity";
import GroupInventoryItemInterface from "../interfaces/GroupInventoryItem.interface";
import { Character } from "../entities/Character.entity";
import { InventoryService } from "./Inventory.service";
import { Item } from "../entities/Item.entity";
import { BaseService } from "./Base.service";
import { NotFoundError } from "../utils/NotFound.error";
import { ServiceError } from "../utils/Service.error";

export class GroupInventoryService extends BaseService {
  constructor(private inventoryService: InventoryService) {
    super();
  }

  async getGroupInventory() {
    const em = this.getEntityManager();

    try {
      const inventory = await em.findAll(GroupInventory);

      return inventory;
    } catch (error) {
      throw new NotFoundError("Group Inventory error.");
    }
  }

  async addItemToGroupInventory(item: number, inventoryItemId: number) {
    const em = this.getEntityManager();

    if (inventoryItemId) {
      return await this.returnItemToGroupInventory(inventoryItemId, em);
    }

    try {
      const inventoryItemData: GroupInventoryItemInterface = {
        item: em.getReference(Item, item),
        character: null,
        expended: false,
        loaned: false,
      };

      const inventoryItem: GroupInventory = em.create(GroupInventory, {
        ...inventoryItemData,
      });
      await em.persistAndFlush(inventoryItem);
    } catch (error: any) {
      throw new ServiceError(
        "Add Item to Group Inventory Error." + error.message,
      );
    }
  }

  async loanItemFromGroupInventory(groupInventory: number, character: number) {
    const em = this.getEntityManager();

    const inventoryItem: GroupInventory | null = await em.findOne(
      GroupInventory,
      { id: groupInventory },
    );

    if (!inventoryItem) {
      throw new NotFoundError("Item not found.");
    }

    try {
      inventoryItem.assign({
        character: em.getReference(Character, character),
        loaned: true,
      });

      await em.persistAndFlush(inventoryItem);

      await this.inventoryService.addItemToInventory(
        character,
        inventoryItem.item.id,
        groupInventory,
      );
    } catch (error: any) {
      throw new ServiceError(
        "Loaning Items from Group Inventory Error: " + error.message,
      );
    }
  }

  async returnItemToGroupInventory(
    groupInventoryItemId: number,
    em: EntityManager,
  ) {
    const groupInventoryItem: GroupInventory | null = await em.findOne(
      GroupInventory,
      { id: groupInventoryItemId },
    );

    if (!groupInventoryItem) {
      throw new NotFoundError("Item not found.");
    }

    try {
      groupInventoryItem.assign({ character: null, loaned: false });

      await em.persistAndFlush(groupInventoryItem);

      await this.inventoryService.deleteItemFromInventory(
        groupInventoryItem.id,
      );
    } catch (error: any) {
      throw new ServiceError(
        "Group Item update unsuccessful: " + error.message,
      );
    }
  }
}
