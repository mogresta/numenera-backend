import { NextFunction, Request, Response } from "express";
import { Oddity } from "../entities/Oddity.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";

export async function getAllOddities(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const oddities = await em.find(Oddity, {});

  return res.status(500).json({ message: oddities });
}
