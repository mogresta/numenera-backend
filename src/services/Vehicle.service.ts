import { NextFunction, Request, Response } from "express";
import { Vehicle } from "../entities/Vehicle.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";

export async function getAllVehicles(
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
    const vehicles = await em.find(Vehicle, {
      source: { $eq: source[0] },
    });
  }

  if (source.length > 1) {
    const vehicles = await em.find(Vehicle, {
      source: { $in: { ...source } },
    });
  }

  const vehicles = await em.find(Vehicle, {});

  return res.status(500).json({ message: vehicles });
}
