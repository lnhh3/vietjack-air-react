import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

import { ApplicationException } from '@/shared/exceptions/ApplicationException';
import { LoggerService } from '@/shared/logger/logger.service';
import { HttpStatusCode } from '@/shared/response/HttpStatusCode';
import { HttpStatusMessage } from '@/shared/response/HttpStatusMessage';
import ResponseDTO from '@/shared/response/ResponseDTO';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let responseDTO = ResponseDTO.create(
      undefined,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      HttpStatusMessage.INTERNAL_SERVER_ERROR,
    );

    if (exception instanceof ApplicationException) {
      this.logger.error(
        { message: exception.message, response: exception.getDescription() },
        'HttpExceptionFilter',
      );
      responseDTO = ResponseDTO.fromApplicationException(exception);
    } else if (exception instanceof HttpException) {
      this.logger.error(
        { message: exception.message, response: exception.getResponse() },
        'HttpExceptionFilter',
      );
      responseDTO = ResponseDTO.fromApplicationException(
        ApplicationException.fromHttpException(exception),
      );
    }
    response.status(responseDTO.getStatus()).json(responseDTO);
    // httpAdapter.reply(ctx.getResponse(), responseDTO, responseDTO.getStatus());
  }
}
