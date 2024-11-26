import { NextFunction, Request, Response } from "express";
import { EntityManager, Loaded, RequestContext } from "@mikro-orm/core";
import { GroupInventory } from "../entities/GroupInventory.entity";
import GroupInventoryItemInterface from "../interfaces/GroupInventoryItem.interface";
import { Character } from "../entities/Character.entity";
import {
  addItemToInventory,
  deleteItemFromInventory,
} from "./Inventory.service";

export async function getGroupInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const inventory = await em.findAll(GroupInventory, { populate: ["*"] });

  return res.status(500).json({ message: inventory });
}

export async function addItemToGroupInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const item: number = Number(req.body.item);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const inventoryItemData: GroupInventoryItemInterface = {
    item,
    character: null,
    expended: false,
    loaned: false,
  };

  const inventoryItem: GroupInventory = em.create(GroupInventory, {
    ...inventoryItemData,
  });
  await em.persistAndFlush(inventoryItem);

  return res.status(200).json({ message: inventoryItem });
}

export async function loanItemFromGroupInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = Number(req.body.id);
  const character: number = Number(req.body.character);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const inventoryItem: GroupInventory | null = await em.findOne(
    GroupInventory,
    { id },
  );

  if (!inventoryItem) {
    return res.status(500).json({ message: "Item not found" });
  }

  inventoryItem.assign({
    character: em.getReference(Character, character),
    loaned: true,
  });

  await em.persistAndFlush(inventoryItem);

  await addItemToInventory(req, res, next);

  return res.status(200).json({ message: inventoryItem });
}

export async function returnItemToGroupInventory(
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
    { id },
  );

  if (!inventoryItem) {
    return res.status(500).json({ message: "Item not found" });
  }

  inventoryItem.assign({ character: null, loaned: false });
  await em.persistAndFlush(inventoryItem);

  await deleteItemFromInventory(req, res, next);

  return res.status(200).json({ message: inventoryItem });
}
