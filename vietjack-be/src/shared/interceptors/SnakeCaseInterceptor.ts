import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import ResponseDTO from '@/shared/response/ResponseDTO';
import { toSnakeCaseKey } from '@/utils';

@Injectable()
export class SnakeCaseInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        map<ResponseDTO<any>, any>((data) =>
          toSnakeCaseKey(ResponseDTO.toObject(data)),
        ),
      );
  }
}
