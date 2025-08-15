import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class TimeExecutingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeExecutingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();
    const method = request.method;
    const url = request.url;
    const userAgent = request.get('User-Agent') || 'Unknown';

    // Log request start
    this.logger.debug(
      `🚀 Request started: ${method} ${url}`,
      'TimeExecutingInterceptor',
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const endTime = Date.now();
          const executionTime = endTime - startTime;
          const statusCode = response.statusCode;

          // Log successful response with execution time
          this.logger.log(
            `✅ Request completed: ${method} ${url} - ${statusCode} (${executionTime}ms)`,
            'TimeExecutingInterceptor',
          );

          // Log detailed performance metrics
          this.logger.debug(
            `📊 Performance: ${method} ${url} - ${executionTime}ms - User-Agent: ${userAgent}`,
            'TimeExecutingInterceptor',
          );

          // Add execution time to response headers for client monitoring
          response.setHeader('X-Execution-Time', `${executionTime}ms`);
          response.setHeader('X-Request-Id', this.generateRequestId());
        },
        error: (error) => {
          const endTime = Date.now();
          const executionTime = endTime - startTime;
          const statusCode = response.statusCode || 500;

          // Log error with execution time
          this.logger.error(
            `❌ Request failed: ${method} ${url} - ${statusCode} (${executionTime}ms)`,
            error.stack,
            'TimeExecutingInterceptor',
          );

          // Add execution time to error response headers
          response.setHeader('X-Execution-Time', `${executionTime}ms`);
          response.setHeader('X-Request-Id', this.generateRequestId());
        },
      }),
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
