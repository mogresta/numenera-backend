import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller";
import { Route } from "../decorators/route";
import { Validate } from "../decorators/validator";
import { tokenValidation } from "../validators/validateToken";
import { signJWT } from "../services/signJWT";
import bcryptjs from "bcryptjs";
import IUser from "../interfaces/user";
import Orm from "../db/connection";

const NAMESPACE = "User";

@Controller()
class UserController {
  @Route("get", "/validate")
  validateToken(req: Request, res: Response, next: NextFunction) {
    tokenValidation(req, res, next);
    return res.status(200).json({ message: "Token is valid" });
  }

  @Route("post", "/register")
  register(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
      if (hashError) {
        console.error(hashError);
        return res.status(500).json({ error: hashError });
      }

      return res.status(200).json({ username, password: hash });
    });
  }

  @Route("post", "/login")
  login(req: Request, res: Response, next: NextFunction) {}
}

export default UserController;
