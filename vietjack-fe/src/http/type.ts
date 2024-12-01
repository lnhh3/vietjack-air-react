import { HttpStatusCode } from "axios";

export type HttpResponse<T = unknown> = {
  status: HttpStatusCode;
  message: string;
  data: T;
  description: string;
};
