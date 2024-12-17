import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import {
  EntityManager,
  Loaded,
  PopulatePath,
  RequestContext,
} from "@mikro-orm/core";
import { User } from "../entities/User.entity";
import UserInterface from "../interfaces/User.interface";
import { signJWT } from "./SignJWT";

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

  const user: User = em.create(User, {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await em.persistAndFlush(user);
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

  const user: User | null = await em.findOne(User, {
    $or: [
      { email: { $eq: userData.email } },
      { username: { $eq: userData.username } },
    ],
  });

  if (!user) {
    return res.status(404).json({ message: "Invalid username or email." });
  }

  if (!bcryptjs.compareSync(userData.password, user.password)) {
    return res.status(401).json({ message: "Invalid password." });
  }

  try {
    signJWT(user, (_error, token) => {
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
