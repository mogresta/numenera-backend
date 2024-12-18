import { NextFunction, Request, Response } from "express";
import { Installation } from "../entities/Installation.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Cypher } from "../entities/Cypher.entity";

export async function getAllInstallations(
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
    const installations = await em.find(Installation, {
      source: { $eq: source[0] },
    });

    return res.status(500).json({ message: installations });
  }

  if (source.length > 1) {
    const installations = await em.find(Installation, {
      source: { $in: { ...source } },
    });

    return res.status(500).json({ message: installations });
  }

  const installations = await em.findAll(Installation);

  return res.status(500).json({ message: installations });
}

export async function getInstallation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = parseInt(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const installation: Installation | null = await em.findOne(Installation, {
    id,
  });

  return res.status(500).json({ message: installation });
}
