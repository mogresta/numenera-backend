import { NextFunction, Request, Response } from "express";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Inventory } from "../entities/Inventory.entity";

export async function getInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const character: number = parseInt(req.body.character);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const inventory: Inventory | null = await em.findOne(
    Inventory,
    { character: { $eq: character } },
    { populate: ["*"] },
  );

  return res.status(500).json({ message: inventory });
}

export async function addItemToInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {}

export async function expendItemFromInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {}
