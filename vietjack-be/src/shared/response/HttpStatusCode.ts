export class StatusCode {
  private readonly statusCode: number;
  private readonly message: string;

  constructor(code: number, message: string = '') {
    this.statusCode = code;
    this.message = message;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getMessage() {
    return this.message;
  }

  static getMessageByCode(code: number): string | undefined {
    // @ts-ignore
    return HttpStatusCode?.[this.getStatusKeyByCode(code)]?.getMessage();
  }

  static getStatusKeyByCode(code: number) {
    const keyStatus = Object.keys(HttpStatusCode).find(
      // @ts-ignore
      (key) => HttpStatusCode?.[key]?.getStatusCode() === code,
    );
    if (!keyStatus) return;
    return keyStatus;
  }
}

export const HttpStatusCode = {
  OK: new StatusCode(200, 'Ok'),
  CREATED: new StatusCode(201, 'Created'),
  ACCEPTED: new StatusCode(202, 'Accepted'),
  NO_CONTENT: new StatusCode(204, 'No Content'),
  BAD_REQUEST: new StatusCode(400, 'Bad Request'),
  UNAUTHORIZED: new StatusCode(401, 'Unauthorized'),
  FORBIDDEN: new StatusCode(403, 'Forbidden'),
  NOT_FOUND: new StatusCode(404, 'Not Found'),
  METHOD_NOT_ALLOWED: new StatusCode(405, 'Method Not Allowed'),
  NOT_ACCEPTABLE: new StatusCode(406, 'Not Acceptable'),
  CONFLICT: new StatusCode(409, 'Conflict'),
  ALREADY_EXISTS: new StatusCode(409, 'Already Exists'),
  EXPIRED_TIME: new StatusCode(410, 'Expired time'),
  TOO_MANY_REQUEST: new StatusCode(429, 'Too Many Requests'),
  INTERNAL_SERVER_ERROR: new StatusCode(500, 'Internal Server Error'),
  NOT_IMPLEMENTED: new StatusCode(501, 'Not Implemented'),
  SERVICE_UNAVAILABLE: new StatusCode(503, 'Service Unavailable'),
  GATEWAY_TIMEOUT: new StatusCode(504, 'Gateway Timeout'),
};
