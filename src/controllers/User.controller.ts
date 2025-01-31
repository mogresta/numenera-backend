import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { UserService } from "../services/User.service";
import {
  emailTokenValidation,
  tokenValidation,
} from "../validators/ValidateToken";
import { Validate } from "../decorators/Validator";
import {
  userLoginValidation,
  userPostValidation,
} from "../validators/UserValidator";
import { ServiceError } from "../utils/Service.error";
import { ValidationError } from "../utils/Validation.error";
import { NotFoundError } from "../utils/NotFound.error";

@Controller()
class UserController {
  constructor(private userService: UserService) {}

  @Route("get", "/validate", tokenValidation)
  validateToken(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: "Token is valid" });
  }

  @Route("post", "/register")
  @Validate(userPostValidation)
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, email } = req.body;

      await this.userService.createUser(username, password, email);

      return res.status(200).json({ message: "User successfully created." });
    } catch (error) {
      if (error instanceof ServiceError) {
        console.error("Error creating user: ", error.originalError);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("post", "/login")
  @Validate(userLoginValidation)
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier, password } = req.body;

      const { token, user } = await this.userService.loginUser(
        identifier,
        password,
      );

      return res.status(200).json({
        message: "Auth Successful",
        token,
        user: user,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(401).json({ message: error.message });
      }

      if (error instanceof ServiceError) {
        return res.status(500).json({
          message: "Authentication failed",
          error: error.message,
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("post", "/update-username", tokenValidation)
  async updateUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const username: string = req.body.username;
      const id: number = Number(req.body.id);

      const { token, user } = await this.userService.updateUsername(
        username,
        id,
      );

      return res.status(200).json({
        message: "Username Update Successful",
        token,
        user: user,
      });
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("post", "/password-recovery")
  async recoverPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const email: string = req.body.email;

      await this.userService.recoverPassword(email);

      return res.status(200).json({
        message:
          "If an account exists with this email, a password reset link will be sent",
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(200).json({
          message:
            "If an account exists with this email, a password reset link will be sent",
        });
      }

      if (error instanceof ServiceError) {
        console.error("Password recovery error:", error.originalError);
        return res.status(500).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("post", "/reset-password", emailTokenValidation)
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const password = req.body.password;
      const email = res.locals.jwt.email;

      await this.userService.resetPassword(password, email);

      return res
        .status(200)
        .json({ message: "Password successfully updated." });
    } catch (error) {
      if (error instanceof ServiceError) {
        console.error("Password recovery error:", error.originalError);
        return res.status(500).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  @Route("post", "/user/profile", tokenValidation)
  @Validate(userLoginValidation)
  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.body.id);

      const user = await this.userService.getUserData(id);

      return res.status(200).json({ ...user });
    } catch (error) {
      if (error instanceof ServiceError) {
        console.error("Error finding user:", error.originalError);
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
