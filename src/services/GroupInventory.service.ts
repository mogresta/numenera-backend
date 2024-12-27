import { NextFunction, Request, Response } from "express";
import { EntityManager, Loaded, RequestContext } from "@mikro-orm/core";
import { GroupInventory } from "../entities/GroupInventory.entity";
import GroupInventoryItemInterface from "../interfaces/GroupInventoryItem.interface";
import { Character } from "../entities/Character.entity";
import {
  addItemToInventory,
  deleteItemFromInventory,
} from "./Inventory.service";
import { Item } from "../entities/Item.entity";

export async function getGroupInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  try {
    const inventory = await em.findAll(GroupInventory);

    return res.status(200).json({ inventory: [...inventory] });
  } catch (error) {
    return res.status(500).json({ message: "Group Inventory error:", error });
  }
}

export async function loanItemFromGroupInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const groupInventory: number = Number(req.body.groupInventory);
  const character: number = Number(req.body.character);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const inventoryItem: GroupInventory | null = await em.findOne(
    GroupInventory,
    { id: groupInventory },
  );

  if (!inventoryItem) {
    return res.status(500).json({ message: "Item not found" });
  }

  try {
    inventoryItem.assign({
      character: em.getReference(Character, character),
      loaned: true,
    });

    await em.persistAndFlush(inventoryItem);

    req.body.item = inventoryItem.item.id;
    await addItemToInventory(req, res, next);

    return res.status(200).json({ ...inventoryItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Group Item update unsuccessful:", error });
  }
}

export async function addItemToGroupInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const item: number = Number(req.body.item);
  const inventoryItemId: number | undefined = Number(req.body.groupInventory);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  if (inventoryItemId) {
    return await returnItemToGroupInventory(
      inventoryItemId,
      req,
      res,
      next,
      em,
    );
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

    return res.status(200).json({ ...inventoryItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Add item to group inventory error:", error });
  }
}

async function returnItemToGroupInventory(
  inventoryItemId: number,
  req: Request,
  res: Response,
  next: NextFunction,
  em: EntityManager,
) {
  const inventoryItem: GroupInventory | null = await em.findOne(
    GroupInventory,
    { id: inventoryItemId },
  );

  if (!inventoryItem) {
    return res.status(500).json({ message: "Item not found" });
  }

  try {
    inventoryItem.assign({ character: null, loaned: false });
    await em.persistAndFlush(inventoryItem);

    await deleteItemFromInventory(req, res, next);

    return res.status(200).json({ ...inventoryItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Group Item update unsuccessful:", error });
  }
}
