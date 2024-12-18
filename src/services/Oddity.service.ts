import { NextFunction, Request, Response } from "express";
import { Oddity } from "../entities/Oddity.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Installation } from "../entities/Installation.entity";

export async function getAllOddities(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const oddities = await em.findAll(Oddity);

  return res.status(500).json({ message: oddities });
}

export async function getOddity(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = parseInt(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const oddity: Oddity | null = await em.findOne(Oddity, { id });

  return res.status(500).json({ message: oddity });
}
