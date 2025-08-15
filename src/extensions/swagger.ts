import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Digital Signature Middleware Service')
    .setDescription(
      'A server-to-server middleware service for digital signature operations including creation, verification, and management of digital signatures for enterprise integration.',
    )
    .setVersion('1.0.0')
    .addTag('health', 'Health check and service monitoring endpoints')
    .addTag(
      'signatures',
      'Digital signature creation and verification operations',
    )
    .addTag('keys', 'Digital signature key management and administration')
    .addTag('audit', 'Audit trail and compliance logging endpoints')
    .addTag(
      'webhooks',
      'Asynchronous webhook notifications for signature events',
    )
    .addServer('http://localhost:3001', 'Local Development')
    .addServer('https://api.example.com', 'Production Environment')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-Key',
        in: 'header',
        description: 'API key for service-to-service authentication',
      },
      'api-key',
    )
    .addSecurityRequirements('JWT-auth')
    .addSecurityRequirements('api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Customize Swagger UI options
  const customOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showRequestHeaders: true,
      showExtensions: true,
      docExpansion: 'none',
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      tryItOutEnabled: true,
      requestInterceptor: (req: any) => {
        // Add default headers for testing
        if (req.headers) {
          req.headers['X-Request-ID'] = `swagger_${Date.now()}`;
        }
        return req;
      },
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2c3e50; font-size: 36px; }
      .swagger-ui .info .description { font-size: 16px; line-height: 1.6; }
      .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
    `,
    customSiteTitle: 'Digital Signature API Documentation',
    customfavIcon: '/favicon.ico',
  };

  SwaggerModule.setup('api-docs', app, document, customOptions);
}
