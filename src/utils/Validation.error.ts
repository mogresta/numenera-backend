import { ServiceError } from "./Service.error";

export class ValidationError extends ServiceError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
