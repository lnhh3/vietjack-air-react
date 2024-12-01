import { useAuthStore } from '@authRemote/entry';
import { AxiosError, type AxiosResponse, HttpStatusCode as AxiosHttpStatusCode } from 'axios';
import moment from 'moment';

import { FunctionRequest } from '@/https/ApiInterceptorRequest.ts';
import GenericApi from '@/https/GenericApi.ts';
import { toCamelCaseKey } from '@/utilities/helper';
import StorageHelper from '@/utilities/StorageHelper';

import { HttpResponse, HttpStatusCode } from './types';

export default class ApiInterceptorResponse {
  api: GenericApi;
  modifiers: FunctionRequest[] = [];
  callbacks: FunctionRequest[] = [];
  constructor(api: GenericApi) {
    this.api = api;
    this.api.axiosInstance.interceptors.response.use(
      (res) => this.interceptorResponse(res, api) as any,
      (error) => this.rejectError(error, api)
    );
  }

  interceptorResponse(response: AxiosResponse<HttpResponse>, api: GenericApi) {
    const isSuccess =
      response.status === AxiosHttpStatusCode.Ok && response.data.status === HttpStatusCode.OK;
    if (api.logResponse) {
      console.info('-------------[ RESPONSE ]--------------');
      console.log('URL', moment().format('HH:mm:ss'), response.request.responseURL);
      console.log('Header', response.headers);
      console[isSuccess ? 'log' : 'error'](
        isSuccess ? 'Response:' : '[ERROR]',
        ApiInterceptorResponse.truncateLongBase64InObject(
          JSON.parse(JSON.stringify(toCamelCaseKey(response.data)))
        )
      );
      console.info('-----------[ END RESPONSE ]------------');
    }
    return Promise[isSuccess ? 'resolve' : 'reject'](toCamelCaseKey<HttpResponse>(response.data));
  }

  rejectError(error: AxiosError<HttpResponse>, api: GenericApi) {
    const response = error.response;
    if (api.logResponse) {
      console.info('-------------[ RESPONSE ]--------------');
      console.log('[ERROR]', response?.data);
      console.info('-----------[ END RESPONSE ]------------');
    }

    switch (response?.data.status) {
      case HttpStatusCode.UNAUTHORIZED:
        StorageHelper.deleteAuthToken();
        useAuthStore.getState().logout();
        break;
    }

    return Promise.reject(error.response?.data);
  }

  addModifier(callback: FunctionRequest): ApiInterceptorResponse {
    this.modifiers.push(callback);
    return this;
  }

  addCallback(f: (f: AxiosResponse<any>) => void): ApiInterceptorResponse {
    this.callbacks.push(f);
    return this;
  }

  private static isBase64String(str: string): boolean {
    return /^[A-Za-z0-9+/]+={0,2}$/.test(str);
  }

  private static truncateBase64(str: string): string {
    if (str.length > 20) {
      return str.substr(0, 10) + '....' + str.substr(-10);
    }
    return str;
  }

  private static truncateLongBase64InObject(obj: any): any {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && this.isBase64String(obj[key])) {
          obj[key] = this.truncateBase64(obj[key]);
        } else if (typeof obj[key] === 'object') {
          this.truncateLongBase64InObject(obj[key]);
        }
      }
    }
    return obj;
  }
}
