import { NextFunction, Request, Response } from "express";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Inventory } from "../entities/Inventory.entity";
import { InventoryItem } from "../entities/InventoryItem.entity";
import { GroupInventory } from "../entities/GroupInventory.entity";
import { Character } from "../entities/Character.entity";
import InventoryItemInterface from "../interfaces/InventoryItem.interface";

export async function getInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const id: number = Number(req.body.id);
  const character = em.getReference(Character, Number(req.body.character));

  const inventory: Inventory | null = await em.findOne(
    Inventory,
    { character: character, id: id },
    { populate: ["*"] },
  );

  return res.status(200).json({ message: inventory });
}

export async function addItemToInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const inventory: number = Number(req.body.inventory);
  const item: number = Number(req.body.item);
  const groupInventory: number | null = req.body.groupInventory
    ? Number(req.body.groupInventory)
    : null;

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const inventoryItemData: InventoryItemInterface = {
    inventory,
    item,
    groupInventory,
    expended: false,
  };

  const inventoryItem: InventoryItem = em.create(InventoryItem, {
    ...inventoryItemData,
  });
  await em.persistAndFlush(inventoryItem);

  return res.status(200).json({ message: inventoryItem });
}

export async function expendItemFromInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = Number(req.body.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const inventoryItem: InventoryItem | null = await em.findOne(InventoryItem, {
    id: id,
  });

  if (!inventoryItem) {
    return res.status(500).json({ message: "Item not found" });
  }

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

  return res.status(200).json({ message: "Item expended." });
}

export async function deleteItemFromInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = Number(req.body.groupInventory);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const inventoryItem: GroupInventory | null = await em.findOne(
    GroupInventory,
    {
      id: id,
    },
  );

  if (!inventoryItem) {
    return res.status(500).json({ message: "Item not found" });
  }

  await em.removeAndFlush(inventoryItem);
}
