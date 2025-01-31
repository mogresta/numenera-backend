export class ServiceError extends Error {
  public originalError?: any;

  constructor(message: string, error?: any) {
    super(message);
    this.name = "ServiceError";
    this.originalError = error;
  }
}
