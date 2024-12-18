import { NextFunction, Request, Response } from "express";
import { Artefact } from "../entities/Artefact.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";

export async function getAllArtefacts(
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
    const artefacts = await em.find(
      Artefact,
      { source: { $eq: source[0] } },
      { populate: ["*"] },
    );

    return res.status(500).json({ message: artefacts });
  }

  if (source.length > 1) {
    const artefacts = await em.find(
      Artefact,
      { source: { $eq: source[0] } },
      { populate: ["*"] },
    );

    return res.status(500).json({ message: artefacts });
  }

  const artefacts = await em.findAll(Artefact, { populate: ["*"] });

  return res.status(500).json({ message: artefacts });
}

export async function getArtefact(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = parseInt(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const artefact: Artefact | null = await em.findOne(Artefact, { id });

  return res.status(500).json({ message: artefact });
}
