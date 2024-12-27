import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import {
  createUser,
  loginUser,
  updateUsername,
  recoverPassword,
  resetPassword,
  getUserData,
} from "../services/User.service";
import {
  emailTokenValidation,
  tokenValidation,
} from "../validators/ValidateToken";
import { Validate } from "../decorators/Validator";
import {
  userLoginValidation,
  userPostValidation,
} from "../validators/UserValidator";

@Controller()
class UserController {
  @Route("get", "/validate", tokenValidation)
  validateToken(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: "Token is valid" });
  }

  @Route("post", "/register")
  @Validate(userPostValidation)
  async register(req: Request, res: Response, next: NextFunction) {
    await createUser(req, res, next);
  }

  @Route("post", "/login")
  @Validate(userLoginValidation)
  async login(req: Request, res: Response, next: NextFunction) {
    await loginUser(req, res, next);
  }

  @Route("post", "/update-username", tokenValidation)
  async updateUsername(req: Request, res: Response, next: NextFunction) {
    await updateUsername(req, res, next);
  }

  @Route("post", "/password-recovery")
  async recoverPassword(req: Request, res: Response, next: NextFunction) {
    await recoverPassword(req, res, next);
  }

  @Route("post", "/reset-password", emailTokenValidation)
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    await resetPassword(req, res, next);
  }

  @Route("post", "/user/profile", tokenValidation)
  @Validate(userLoginValidation)
  async getUserData(req: Request, res: Response, next: NextFunction) {
    await getUserData(req, res, next);
  }
}

export default UserController;
