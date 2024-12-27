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
  console.log(req.query);
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const sources: number[] = req.query.sources
    ? String(req.query.sources).split(",").map(Number)
    : [];
  const types: number[] = req.query.types
    ? String(req.query.types).split(",").map(Number)
    : [];
  const planTypes: number[] = req.query.types
    ? String(req.query.planTypes).split(",").map(Number)
    : [];

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const mappedSources: number[] = [];
  const mappedTypes: number[] = [];
  const mappedPlanTypes: number[] = [];
  const whereClause: any = {};

  if (sources.length > 0 && sources.every((source) => !isNaN(source))) {
    await Promise.all(
      sources.map((source) => {
        const sourceEnum: Sources = Number(source);
        const ref: Source = em.getReference(Source, sourceEnum);

        mappedSources.push(ref.id);
      }),
    );

    whereClause.source = { $in: [...mappedSources] };
  }

  if (types.length > 0 && types.every((type) => !isNaN(type))) {
    await Promise.all(
      types.map((type) => {
        const typeEnum: Types = Number(type);
        const ref: Type = em.getReference(Type, typeEnum);

        mappedTypes.push(ref.id);
      }),
    );

    whereClause.type = { $in: [...mappedTypes] };
  }

  if (planTypes.length > 0 && planTypes.every((planType) => !isNaN(planType))) {
    await Promise.all(
      planTypes.map((planType) => {
        const planTypeEnum: Types = Number(planType);
        const ref: Type = em.getReference(Type, planTypeEnum);

        mappedPlanTypes.push(ref.id);
      }),
    );

    whereClause.planType = { $in: [...mappedPlanTypes] };
  }

  try {
    const items = await em.find(Item, whereClause, {
      fields: ["id", "name", "type", "source", "planType"],
    });

    return res.status(200).json({ items });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error searching for items", error });
  }
}

export async function getItem(req: Request, res: Response, next: NextFunction) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = Number(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  try {
    const item: Item | null = await em.findOne(Item, { id });

    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: "Error searching for item", error });
  }
}

export async function findItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const name: string = req.body.name;

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  try {
    const items = await em.find(Item, {
      name: { $like: `%${name}%` },
    });

    return res.status(200).json({ items });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error searching for items", error });
  }
}
