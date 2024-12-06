import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { Validate } from "../decorators/Validator";
import { tokenValidation } from "../validators/ValidateToken";
import { signJWT } from "../services/SignJWT";
import bcryptjs from "bcryptjs";

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
