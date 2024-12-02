import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Constants } from '@/shared/constants/common';
import { ApplicationException } from '@/shared/exceptions/ApplicationException';
import { SnakeCaseInterceptor } from '@/shared/interceptors/SnakeCaseInterceptor';
import { LoggerService } from '@/shared/logger/logger.service';
import { HttpStatusCode } from '@/shared/response/HttpStatusCode';
import { HttpStatusMessage } from '@/shared/response/HttpStatusMessage';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? '3001';

  const corsOptions: CorsOptions = {
    origin: ['*'], // or the front-end domain
    credentials: true, // if you're using cookies
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  app.enableCors();

  app.useGlobalInterceptors(new SnakeCaseInterceptor());
  app.useLogger(new LoggerService());

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Strip out unwanted properties
      forbidNonWhitelisted: true, // Throw error for unexpected properties
      exceptionFactory: (errors) => {
        const data = errors.map((err) => ({
          field: err.property,
          message: err.constraints?.[Object.keys(err.constraints)[0]] ?? '',
        }));
        return new ApplicationException(
          HttpStatusCode.BAD_REQUEST,
          HttpStatusMessage.BAD_REQUEST_VALIDATOR_PAYLOAD,
          data,
        );
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('VietjackAir API')
    .setDescription('Document API for VietjackAir')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: Constants.AUTH_TOKEN, in: 'header' },
      Constants.AUTH_TOKEN,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(parseInt(PORT));
}

bootstrap();
