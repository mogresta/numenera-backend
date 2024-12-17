import { NextFunction, Request, Response } from "express";
import { Installation } from "../entities/Installation.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";

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
  }

  if (source.length > 1) {
    const installations = await em.find(Installation, {
      source: { $in: { ...source } },
    });
  }

  const installations = await em.find(Installation, {});

  return res.status(500).json({ message: installations });
}
