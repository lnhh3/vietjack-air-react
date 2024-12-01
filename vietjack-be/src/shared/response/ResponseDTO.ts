import { ApiProperty } from '@nestjs/swagger';

import { ApplicationException } from '@/shared/exceptions/ApplicationException';
import { HttpStatusCode, StatusCode } from '@/shared/response/HttpStatusCode';
import {
  HttpStatusMessage,
  HttpStatusMessageType,
} from '@/shared/response/HttpStatusMessage';

class ResponseDTO<T = any> {
  @ApiProperty()
  private status: number;
  @ApiProperty()
  private message: string;
  @ApiProperty()
  private description: HttpStatusMessageType;
  @ApiProperty()
  private data?: T;

  constructor(
    data: T | undefined,
    status: StatusCode,
    message?: string,
    description?: HttpStatusMessage | string,
  ) {
    this.status = status.getStatusCode();
    this.message = message ?? status.getMessage();
    this.description = description ?? '';
    this.data = data;
  }

  getStatus(): number {
    return this.status;
  }

  getMessage(): string {
    return this.message || '';
  }

  getDescription(): HttpStatusMessageType {
    return this.description;
  }

  getData(): T | undefined {
    return this.data;
  }

  setStatus(status: number) {
    this.status = status;
  }

  setStatusCode(statusCode: StatusCode) {
    this.status = statusCode.getStatusCode();
    this.message = statusCode.getMessage();
  }

  setDescription(description: HttpStatusMessageType) {
    this.description = description;
  }

  setData(data: T | undefined) {
    this.data = data;
  }

  setMessage(message: string) {
    this.message = message;
  }

  static create<T>(
    data: T | undefined,
    status: StatusCode,
    message?: string,
    description?: HttpStatusMessageType,
  ) {
    return new ResponseDTO(data, status, message, description);
  }

  static success<T>(data: T) {
    return ResponseDTO.create(data, HttpStatusCode.OK);
  }

  static toObject<T = any>(data: ResponseDTO<T>) {
    return {
      status: data.status,
      message: data.message,
      description: data.description,
      data: data.data,
    };
  }

  static fromApplicationException(applicationException: ApplicationException) {
    return ResponseDTO.create(
      applicationException.getData(),
      applicationException.getStatusCode(),
      applicationException.message,
      applicationException.getDescription(),
    );
  }
}

export default ResponseDTO;
