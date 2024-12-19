import { NextFunction, Request, Response } from "express";
import { Item } from "../entities/Item.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Source } from "../entities/Source.entity";
import { Type } from "../entities/Type.entity";
import { Types } from "../enums/Type.enum";
import { Sources } from "../enums/Source.enum";

export async function getAllItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const sources: number[] = req.body.source;
  const types: number[] = req.body.type;

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  sources.forEach((source) => {
    const sourceEnum: Sources = source;
    const ref: Source = em.getReference(Source, sourceEnum);

    return ref.id;
  });

  types.forEach((type) => {
    const typeEnum: Types = type;
    const ref: Type = em.getReference(Type, typeEnum);

    return ref.id;
  });

  const items = await em.find(
    Item,
    { source: { $in: [...sources] }, type: { $in: [...types] } },
    { populate: ["*"] },
  );

  return res.status(500).json({ message: items });
}

export async function getItem(req: Request, res: Response, next: NextFunction) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = Number(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const item: Item | null = await em.findOne(Item, { id });

  return res.status(500).json({ message: item });
}
