import { ServiceError } from "./Service.error";

export class NotFoundError extends ServiceError {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
