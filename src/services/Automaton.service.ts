import { NextFunction, Request, Response } from "express";
import { Automaton } from "../entities/Automaton.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";

export async function getAllAutomatons(
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
    const automatons = await em.find(Automaton, {
      source: { $eq: source[0] },
    });
  }

  if (source.length > 1) {
    const automatons = await em.find(Automaton, {
      source: { $in: { ...source } },
    });
  }

  const automatons = await em.find(Automaton, {});

  return res.status(500).json({ message: automatons });
}
