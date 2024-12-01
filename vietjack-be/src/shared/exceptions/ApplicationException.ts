import { HttpException } from '@nestjs/common';

import { StatusCode } from '@/shared/response/HttpStatusCode';

export type ApplicationExceptionCreator = {
  statusCode: StatusCode;
  description?: string;
  data?: object;
};

export class ApplicationException extends HttpException {
  private readonly description: string;
  private readonly statusCode: StatusCode;
  private readonly data?: any;

  constructor(status: StatusCode, description?: string, data?: object) {
    super(
      status.getMessage() ||
        StatusCode.getMessageByCode(status.getStatusCode()) ||
        '',
      status.getStatusCode(),
    );
    this.statusCode = status;
    this.description = description ?? '';
    this.data = data;
  }

  static create({
    statusCode,
    description,
    data,
  }: ApplicationExceptionCreator) {
    return new ApplicationException(statusCode, description, data);
  }

  static fromHttpException(exception: HttpException): ApplicationException {
    const responseObj = exception.getResponse() as {
      message: string[] | string;
    };
    const message =
      typeof responseObj === 'object' && Array.isArray(responseObj.message)
        ? responseObj.message.join(',')
        : undefined;
    return ApplicationException.create({
      statusCode: new StatusCode(
        exception.getStatus(),
        message || StatusCode.getMessageByCode(exception.getStatus()),
      ),
      description: exception.message,
    });
  }

  getDescription() {
    return this.description;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getData() {
    return this.data;
  }
}
