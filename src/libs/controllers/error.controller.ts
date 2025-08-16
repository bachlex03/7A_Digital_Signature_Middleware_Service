import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { GlobalExceptionFilter } from '../filters/global-exception.filter';

@ApiExcludeController()
@Controller('error')
@UseFilters(GlobalExceptionFilter)
export class ErrorController {
  @Get()
  error(@Req() req: Request, @Res() res: Response): Response {
    // Get error from request context (set by exception filters)
    const error =
      req.body?.error || req.query?.error || 'Unknown error occurred';
    const statusCode = req.body?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    // Create standardized error response
    const errorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      error: {
        code: 'ErrorController.Error',
        message: error,
        serviceName: 'DigitalSignatureService',
      },
      path: req.url,
      method: req.method,
      requestId: req.headers['x-request-id'] || 'unknown',
    };

    return res.status(statusCode).json(errorResponse);
  }

  @Get('health')
  healthCheck(): { status: string; timestamp: string } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('info')
  getErrorInfo(): {
    description: string;
    endpoints: string[];
    errorCodes: string[];
  } {
    return {
      description:
        'Centralized error handling endpoint for Digital Signature Service',
      endpoints: [
        'GET /error - Handle general errors',
        'GET /error/health - Service health check',
        'GET /error/info - Error handling information',
      ],
      errorCodes: [
        'User.DoesNotExist',
        'User.AlreadyExists',
        'DigitalSignature.InvalidSignature',
        'DigitalSignature.SignatureNotFound',
        'Sample.DoesNotExist',
        'Validation.InvalidInput',
      ],
    };
  }
}
