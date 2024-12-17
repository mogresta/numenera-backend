import { NextFunction, Request, Response } from "express";
import { Cypher } from "../entities/Cypher.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";

export async function getAllCyphers(
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
    const cyphers = await em.find(Cypher, {
      source: { $eq: source[0] },
    });
  }

  if (source.length > 1) {
    const cyphers = await em.find(Cypher, {
      source: { $in: { ...source } },
    });
  }

  const cyphers = await em.find(Cypher, {});

  return res.status(500).json({ message: cyphers });
}
