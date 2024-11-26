import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { createUser, loginUser } from "../services/User.service";
import { tokenValidation } from "../validators/ValidateToken";
import { Validate } from "../decorators/Validator";
import {
  userLoginValidation,
  userPostValidation,
} from "../validators/UserValidator";

@Controller()
class UserController {
  @Route("get", "/validate")
  validateToken(req: Request, res: Response, next: NextFunction) {
    tokenValidation(req, res, next);

    return res.status(200).json({ message: "Token is valid" });
  }

  @Route("post", "/register")
  @Validate(userPostValidation)
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await createUser(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  @Route("post", "/login")
  @Validate(userLoginValidation)
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      await loginUser(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

export default UserController;
