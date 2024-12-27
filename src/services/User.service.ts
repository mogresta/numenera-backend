import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { EntityManager, RequestContext } from "@mikro-orm/core";
import { User } from "../entities/User.entity";
import UserLoginInterface from "../interfaces/UserLogin.interface";
import UserInterface from "../interfaces/User.interface";
import { JWTService, passwordRecoveryEmail } from "./JWT.service";

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

  const existingUser: User | null = await em.findOne(User, {
    $or: [
      { email: { $eq: userData.email } },
      { username: { $eq: userData.username } },
    ],
  });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Username or email already exists." });
  }

  try {
    const salt: string = bcryptjs.genSaltSync(10);
    userData.password = bcryptjs.hashSync(password, salt);

    const user: User = em.create(User, { ...userData });

    await em.persistAndFlush(user);

    return res.status(200).json({ message: "User successfully created." });
  } catch (error) {
    console.error("Error creating user:", error);

    return res.status(500).json({ message: "Error creating user" });
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { identifier, password } = req.body;
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const isEmail: boolean = identifier.includes("@");

  const queryCondition = isEmail
    ? { email: { $eq: identifier } }
    : { username: { $eq: identifier } };

  const userData: UserLoginInterface = {
    identifier,
    password,
  };

  const user: User | null = await em.findOne(User, queryCondition);

  if (!user || !bcryptjs.compareSync(userData.password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  try {
    JWTService(user, (_error, token) => {
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

export async function getUserData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.body.id;
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  try {
    const user: User | null = await em.findOne(
      User,
      { id: { $eq: id } },
      { populate: ["*"] },
    );

    return res.status(200).json({ ...user });
  } catch (error) {
    console.error("Error finding user:", error);

    return res.status(401).json({ message: "Error loading user data." });
  }
}

export async function updateUsername(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username: string = req.body.username;
  const id: number = Number(req.body.id);
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const user: User | null = await em.findOne(User, { id: { $eq: id } });

  if (!user) {
    return res.status(401).json({ message: "User not found." });
  }

  try {
    user.assign({ username: username });

    await em.persistAndFlush(user);

    JWTService(user, (_error, token) => {
      if (_error) {
        return res.status(401).json({
          message: "Unable to Sign JWT",
          error: _error,
        });
      } else if (token) {
        return res.status(200).json({
          message: "Username updated",
          token,
          user: user,
        });
      }
    });
  } catch (error) {
    console.error("Error updating username:", error);

    return res.status(500).json({ message: "Error updating username" });
  }
}

export async function recoverPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.body;
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  try {
    const user: User | null = await em.findOne(User, { email });

    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists with this email, a password reset link will be sent",
      });
    }

    //if (user.deleted) {
    //  return res.status(200).json({
    //    message: "If an account exists with this email, a password reset link will be sent"
    //  });
    //}

    await passwordRecoveryEmail(user);

    return res.status(200).json({
      message:
        "If an account exists with this email, a password reset link will be sent",
    });
  } catch (error) {
    console.error("Password recovery error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred processing your request" });
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { password } = req.body;
  const email = res.locals.jwt.email;
  const em: EntityManager | undefined = RequestContext.getEntityManager();

  if (!em) {
    return res.status(500).json({ message: "Entity manager not available" });
  }

  const user: User | null = await em.findOne(User, { email: { $eq: email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  try {
    const salt: string = bcryptjs.genSaltSync(10);
    user.assign({ password: bcryptjs.hashSync(password, salt) });

    await em.persistAndFlush(user);

    return res.status(200).json({ message: "Password successfully updated." });
  } catch (error) {
    console.error("Password recovery error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred processing your request." });
  }
}
