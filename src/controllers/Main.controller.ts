import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/Controller";
import { Route } from "../decorators/Route";
import { Validate } from "../decorators/Validator";
import { postHealthCheckValidation } from "../validators/HealthCheckValidator";

@Controller()
class MainController {
  @Route("get", "/healthcheck")
  getHealthCheck(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ health: "success!" });
  }

  @Route("post", "/healthcheck")
  @Validate(postHealthCheckValidation)
  postHealthCheck(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ ...req.body });
  }
}

export default MainController;
