export class Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly serviceName: string,
  ) {}

  static get NoneError(): Error {
    return new Error('NoneError', 'None error', this.getServiceName());
  }

  static get ValidationError(): Error {
    return new Error(
      'ValidationError',
      'Validation error',
      this.getServiceName(),
    );
  }

  static BadRequest(code: string, message: string, serviceName: string): Error {
    return new Error(code, message, serviceName);
  }

  static NotFound(code: string, message: string, serviceName: string): Error {
    return new Error(code, message, serviceName);
  }

  static Unauthorized(
    code: string,
    message: string,
    serviceName: string,
  ): Error {
    return new Error(code, message, serviceName);
  }

  static Forbidden(code: string, message: string, serviceName: string): Error {
    return new Error(code, message, serviceName);
  }

  static Conflict(code: string, message: string, serviceName: string): Error {
    return new Error(code, message, serviceName);
  }

  static InternalServerError(
    code: string,
    message: string,
    serviceName: string,
  ): Error {
    return new Error(code, message, serviceName);
  }

  private static getServiceName(): string {
    return 'DigitalSignatureService';
  }
}
