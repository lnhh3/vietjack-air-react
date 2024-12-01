export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

export type HttpResponse<T = any> = {
  status: HttpStatusCode;
  message: string;
  data: T
  description: string;
};

export type HttpDataResponse<T = any> = T & {
  createAt?: number
  updateAt?: number
}