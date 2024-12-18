import { NextFunction, Request, Response } from "express";
import { Vehicle } from "../entities/Vehicle.entity";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { Plan } from "../entities/Plan.entity";

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

    return res.status(500).json({ message: vehicles });
  }

  if (source.length > 1) {
    const vehicles = await em.find(Vehicle, {
      source: { $in: { ...source } },
    });

    return res.status(500).json({ message: vehicles });
  }

  const vehicles = await em.findAll(Vehicle);

  return res.status(500).json({ message: vehicles });
}

export async function getVehicle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const em: EntityManager | undefined = RequestContext.getEntityManager();
  const id: number = parseInt(req.params.id);

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const vehicle: Vehicle | null = await em.findOne(Vehicle, { id });

  return res.status(500).json({ message: vehicle });
}
