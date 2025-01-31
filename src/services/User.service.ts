import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { User } from "../entities/User.entity";
import UserLoginInterface from "../interfaces/UserLogin.interface";
import UserInterface from "../interfaces/User.interface";
import { JWTService, passwordRecoveryEmail } from "./JWT.service";
import { BaseService } from "./Base.service";
import { ServiceError } from "../utils/Service.error";
import { NotFoundError } from "../utils/NotFound.error";

export class UserService extends BaseService {
  async createUser(username: string, password: string, email: string) {
    const em = this.getEntityManager();

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
      throw new ServiceError("Username or email already exists.");
    }

    try {
      const salt: string = bcryptjs.genSaltSync(10);
      userData.password = bcryptjs.hashSync(password, salt);

      const user: User = em.create(User, { ...userData });

      await em.persistAndFlush(user);
    } catch (error) {
      throw new ServiceError("Error creating user", error);
    }
  }

  async loginUser(identifier: string, password: string) {
    const em = this.getEntityManager();

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
      throw new ServiceError("Invalid credentials.");
    }

    try {
      const token = await this.generateToken(user);

      return { token, user };
    } catch (error) {
      throw new ServiceError("Unable to generate authentication token", error);
    }
  }

  async updateUsername(username: string, id: number) {
    const em = this.getEntityManager();

    const user: User | null = await em.findOne(User, { id: { $eq: id } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    try {
      user.assign({ username: username });

      await em.persistAndFlush(user);

      const token = await this.generateToken(user);

      return { token, user };
    } catch (error) {
      console.error("Error updating username:", error);

      throw new ServiceError("Error updating username", error);
    }
  }

  async recoverPassword(email: string) {
    const em = this.getEntityManager();

    const user: User | null = await em.findOne(User, { email });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    try {
      //if (user.deleted) {
      //  throw new NotFoundError("User deleted");

      await passwordRecoveryEmail(user);
    } catch (error) {
      throw new ServiceError(
        "An error occurred processing your request",
        error,
      );
    }
  }

  async resetPassword(password: string, email: string) {
    const em = this.getEntityManager();

    const user: User | null = await em.findOne(User, { email: { $eq: email } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    try {
      const salt: string = bcryptjs.genSaltSync(10);
      user.assign({ password: bcryptjs.hashSync(password, salt) });

      await em.persistAndFlush(user);
    } catch (error) {
      throw new ServiceError(
        "An error occurred processing your request",
        error,
      );
    }
  }

  async getUserData(id: number) {
    const em = this.getEntityManager();

    try {
      const user: User | null = await em.findOne(
        User,
        { id: { $eq: id } },
        { populate: ["*"] },
      );

      return user;
    } catch (error) {
      throw new ServiceError("Error loading user data.", error);
    }
  }

  private async generateToken(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      JWTService(user, (error, token) => {
        if (error) reject(new ServiceError("Unable to Sign JWT", error));
        if (token) resolve(token);
        reject(new ServiceError("Token generation failed"));
      });
    });
  }
}
