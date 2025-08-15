import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const message = exception.getResponse();
    const timestamp = new Date().toISOString();

    // Log the exception details
    this.logger.error(
      `HTTP Exception: ${status} - ${JSON.stringify(message)}`,
      {
        path: request.url,
        method: request.method,
        timestamp,
        statusCode: status,
        message:
          typeof message === 'string' ? message : JSON.stringify(message),
        userAgent: request.get('User-Agent'),
        ip: request.ip || request.connection.remoteAddress,
      },
    );

    // Determine the error response structure
    let errorResponse: any;

    if (typeof message === 'string') {
      errorResponse = {
        statusCode: status,
        message: message,
        error: this.getErrorType(status),
        timestamp,
        path: request.url,
      };
    } else if (typeof message === 'object' && message !== null) {
      // Handle cases where message is an object (e.g., ValidationPipe errors)
      errorResponse = {
        statusCode: status,
        message: (message as any).message || 'Internal server error',
        error: (message as any).error || this.getErrorType(status),
        timestamp,
        path: request.url,
        ...(message as any),
      };
    } else {
      errorResponse = {
        statusCode: status,
        message: 'Internal server error',
        error: this.getErrorType(status),
        timestamp,
        path: request.url,
      };
    }

    // Send the error response
    response.status(status).json(errorResponse);
  }

  private getErrorType(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad Request';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case HttpStatus.NOT_FOUND:
        return 'Not Found';
      case HttpStatus.METHOD_NOT_ALLOWED:
        return 'Method Not Allowed';
      case HttpStatus.CONFLICT:
        return 'Conflict';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'Unprocessable Entity';
      case HttpStatus.TOO_MANY_REQUESTS:
        return 'Too Many Requests';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error';
      case HttpStatus.NOT_IMPLEMENTED:
        return 'Not Implemented';
      case HttpStatus.BAD_GATEWAY:
        return 'Bad Gateway';
      case HttpStatus.SERVICE_UNAVAILABLE:
        return 'Service Unavailable';
      case HttpStatus.GATEWAY_TIMEOUT:
        return 'Gateway Timeout';
      default:
        return 'Error';
    }
  }
}
