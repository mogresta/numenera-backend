import { NextFunction, Request, Response } from "express";
import { Plan } from "../entities/Plan.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";

export async function getAllPlans(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const source: number[] = req.body.source;

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  if (source.length == 1) {
    const plans = await em.find(Plan, {
      source: { $eq: source[0] },
    });
  }

  if (source.length > 1) {
    const plans = await em.find(Plan, {
      source: { $in: { ...source } },
    });
  }

  const plans = await em.find(Plan, {});

  return res.status(500).json({ message: plans });
}
