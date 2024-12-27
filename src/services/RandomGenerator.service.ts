import { NextFunction, Request, Response } from "express";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Item } from "../entities/Item.entity";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getRandomItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const type: number = Number(req.body.type);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const allItems = await em.find(Item, { type: { $eq: type } });

  if (!allItems) {
    return res.status(500).json({ message: "No items found" });
  }

  try {
    const randomItems: Item[] = [];
    for (let i = 1; i <= 10; ) {
      const randomIndex: number = getRandomInt(0, allItems.length - 1);
      if (randomItems.includes(allItems[randomIndex])) {
        continue;
      }

      randomItems.push(allItems[randomIndex]);
      i++;
    }

    return res.status(200).json([...randomItems]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error generating random item", error });
  }
}
