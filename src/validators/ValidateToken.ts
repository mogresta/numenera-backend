import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.headers.authorization?.split(" ")[1] || "";

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, config.server.secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: error.message, error });
    }

    res.locals.jwt = decoded;
    next();
  });
};

export const emailTokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string | undefined = req.query.token as string;

  if (!token) {
    return res.status(401).json({ message: "Invalid token." });
  }

  jwt.verify(token, config.server.secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: error.message, error });
    }

    res.locals.jwt = decoded;
    next();
  });
};
