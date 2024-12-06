import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.headers.authorization?.split(" ")[1] || "";

  if (token) {
    jwt.verify(token, config.server.secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: error.message, error });
      }

      res.locals.jwt = decoded;
      next();
    });
  }

  return res.status(401).json({ message: "Unauthorized" });
};
