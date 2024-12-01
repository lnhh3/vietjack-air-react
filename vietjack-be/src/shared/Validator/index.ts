import { ApplicationException } from '@/shared/exceptions/ApplicationException';
import { StatusCode } from '@/shared/response/HttpStatusCode';
import { HttpStatusMessageType } from '@/shared/response/HttpStatusMessage';
import { isValidObjectId } from '@/utils';

class Validator {
  notNull(data: any, statusCode: StatusCode, message?: HttpStatusMessageType) {
    if (data === null) throw new ApplicationException(statusCode, message);
  }

  mustNull(data: any, statusCode: StatusCode, message?: HttpStatusMessageType) {
    if (data !== null) throw new ApplicationException(statusCode, message);
  }

  objectIdMustValid(
    id: string,
    statusCode: StatusCode,
    message?: HttpStatusMessageType,
  ) {
    if (!isValidObjectId(id)) {
      throw new ApplicationException(statusCode, message);
    }
  }

  mustTrue(
    data: boolean,
    statusCode: StatusCode,
    message?: HttpStatusMessageType,
  ) {
    if (!data) throw new ApplicationException(statusCode, message);
  }
}

export default new Validator();
