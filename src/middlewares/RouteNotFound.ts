import { Request, Response } from "express";

export function routeNotFound(req: Request, res: Response) {
  const error = new Error("Route Not Found");

  return res.status(404).json({ error: error.message });
}
