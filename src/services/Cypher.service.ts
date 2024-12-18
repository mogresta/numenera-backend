import { NextFunction, Request, Response } from "express";
import { Cypher } from "../entities/Cypher.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Automaton } from "../entities/Automaton.entity";

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

    return res.status(500).json({ message: cyphers });
  }

  if (source.length > 1) {
    const cyphers = await em.find(Cypher, {
      source: { $in: { ...source } },
    });

    return res.status(500).json({ message: cyphers });
  }

  const cyphers = await em.findAll(Cypher);

  return res.status(500).json({ message: cyphers });
}

export async function getCypher(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = parseInt(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const cypher: Cypher | null = await em.findOne(Cypher, { id });

  return res.status(500).json({ message: cypher });
}
