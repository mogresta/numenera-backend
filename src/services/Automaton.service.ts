import { NextFunction, Request, Response } from "express";
import { Automaton } from "../entities/Automaton.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Artefact } from "../entities/Artefact.entity";

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
    const automatons = await em.find(
      Automaton,
      { source: { $eq: source[0] } },
      { populate: ["*"] },
    );

    return res.status(500).json({ message: automatons });
  }

  if (source.length > 1) {
    const automatons = await em.find(
      Automaton,
      { source: { $eq: source[0] } },
      { populate: ["*"] },
    );

    return res.status(500).json({ message: automatons });
  }

  const automatons = await em.findAll(Automaton, { populate: ["*"] });

  return res.status(500).json({ message: automatons });
}

export async function getAutomaton(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = parseInt(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const automaton: Automaton | null = await em.findOne(Automaton, { id });

  return res.status(500).json({ message: automaton });
}
