import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller";
import { Route } from "../decorators/route";
import { Validate } from "../decorators/validator";
import { postHealthCheckValidation } from "../validators/healthCheckValidator";

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
