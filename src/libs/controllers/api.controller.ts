import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { isSuccess } from '../result';
import type { Result } from '../result';
import { Error as CustomError } from '../errors';

@Controller()
export abstract class ApiController {
  protected handleResult<T>(result: Result<T>, res: Response): Response {
    if (isSuccess(result)) {
      return res.json(result.value);
    }

    return this.handleFailure(result.error, res);
  }

  protected handleFailure(error: CustomError, res: Response): Response {
    // Add error to response context for logging/monitoring
    res.locals.error = error;

    // Map error codes to HTTP status codes
    const statusCode = this.mapErrorToHttpStatus(error.code);

    // Create standardized error response
    const errorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      error: {
        code: error.code,
        message: error.message,
        serviceName: error.serviceName,
      },
      path: res.req.url,
      method: res.req.method,
    };

    return res.status(statusCode).json(errorResponse);
  }

  protected handleResultWithMatch<T>(
    result: Result<T>,
    onSuccess: (value: T) => any,
    res: Response,
  ): Response {
    if (isSuccess(result)) {
      return res.json(onSuccess(result.value));
    }

    return this.handleFailure(result.error, res);
  }

  private mapErrorToHttpStatus(errorCode: string): number {
    // Map error codes to appropriate HTTP status codes
    if (errorCode.includes('NotFound')) {
      return HttpStatus.NOT_FOUND;
    }

    if (errorCode.includes('Unauthorized')) {
      return HttpStatus.UNAUTHORIZED;
    }

    if (errorCode.includes('Forbidden')) {
      return HttpStatus.FORBIDDEN;
    }

    if (errorCode.includes('Conflict')) {
      return HttpStatus.CONFLICT;
    }

    if (errorCode.includes('Validation')) {
      return HttpStatus.BAD_REQUEST;
    }

    if (errorCode.includes('InternalServerError')) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    // Default to Bad Request for most business logic errors
    return HttpStatus.BAD_REQUEST;
  }

  protected createHttpException(result: Result<any>): HttpException {
    if (isSuccess(result)) {
      throw new Error('Result is not failure');
    }

    const statusCode = this.mapErrorToHttpStatus(result.error.code);
    return new HttpException(
      {
        statusCode,
        error: {
          code: result.error.code,
          message: result.error.message,
          serviceName: result.error.serviceName,
        },
      },
      statusCode,
    );
  }
}
