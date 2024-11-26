import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { User } from "../entities/User.entity";
import UserInterface from "../interfaces/User.interface";
import { signJWTService } from "./SignJWT.service";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password, email } = req.body;
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const userData: UserInterface = {
    username,
    password,
    email,
  };

  const salt: string = bcryptjs.genSaltSync(10);
  userData.password = bcryptjs.hashSync(password, salt);

  const user: User = em.create(User, { ...userData });

  await em.persistAndFlush(user);

  return res.status(200).json({ message: "User successfully created." });
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password, email } = req.body;
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const userData: UserInterface = {
    username,
    password,
    email,
  };

  const user: User | null = await em.findOne(
    User,
    {
      $or: [
        { email: { $eq: userData.email } },
        { username: { $eq: userData.username } },
      ],
    },
    { populate: ["*"] },
  );

  if (!user || !bcryptjs.compareSync(userData.password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  try {
    signJWTService(user, (_error, token) => {
      if (_error) {
        return res.status(401).json({
          message: "Unable to Sign JWT",
          error: _error,
        });
      } else if (token) {
        return res.status(200).json({
          message: "Auth Successful",
          token,
          user: user,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {}
