import { NextFunction, Request, Response } from "express";
import { Plan } from "../entities/Plan.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Oddity } from "../entities/Oddity.entity";

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

    return res.status(500).json({ message: plans });
  }

  if (source.length > 1) {
    const plans = await em.find(Plan, {
      source: { $in: { ...source } },
    });

    return res.status(500).json({ message: plans });
  }

  const plans = await em.findAll(Plan);

  return res.status(500).json({ message: plans });
}

export async function getPlan(req: Request, res: Response, next: NextFunction) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = parseInt(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const plan: Plan | null = await em.findOne(Plan, { id });

  return res.status(500).json({ message: plan });
}
