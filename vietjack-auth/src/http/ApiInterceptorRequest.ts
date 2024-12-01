import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import moment from 'moment';

import GenericApi from '@/http/GenericApi.ts';
import { toSnakeCaseKey } from '@/utils/helper';
import StorageHelper from '@/utils/StorageHelper';

export type FunctionRequest = (...params: any) => any;

const HEADER_AUTH_TOKEN = 'auth-token';
export const NGROK_ACCESS = 'ngrok-skip-browser-warning';

class ApiInterceptorRequest {
  globalParams: { [key: string]: string | FunctionRequest } = {};
  globalHeaders: { [key: string]: string | FunctionRequest } = {};
  api: GenericApi;
  callbacks: FunctionRequest[] = [];

  constructor(api: GenericApi) {
    this.api = api;
    this.api.axiosInstance.interceptors.request.use((config) =>
      this.interceptorRequest(config, api)
    );
  }

  async interceptorRequest(config: InternalAxiosRequestConfig, api: GenericApi) {
    if (config.headers) {
      const headers = await this.constructParams(this.globalHeaders, config.headers);
      config.headers = headers as AxiosRequestHeaders;
      config.headers['Content-Type'] = GenericApi.CT_JSON;
      config.headers[HEADER_AUTH_TOKEN] = StorageHelper.getAuthToken()?.accessToken;
    }
    if (config.data !== undefined && config.data !== null) {
      const params = await this.constructParams(this.globalParams, config.data);
      config.data = toSnakeCaseKey(params);
    }
    this.callbacks.forEach((f: FunctionRequest) => {
      f(this, config);
    });

    if (api.logRequest) {
      console.log('-------------[ REQUEST ]--------------');
      console.log('Time', moment().format('HH:mm:ss'));
      console.log('Headers', config.headers);
      console.log('URL', config?.method?.toUpperCase() + ' ' + config?.baseURL + '' + config?.url);
      console.log('Parameters', config.data);
      console.log('-----------[ END REQUEST ]------------');
    }

    return config;
  }

  async constructParams(params: object, referenceObject: object) {
    for (const i in params) {
      // @ts-ignore
      if (typeof params[i] === 'function') {
        // @ts-ignore
        const f: FunctionRequest = params[i] as FunctionRequest;
        const res = await f();
        if (res !== undefined) {
          // @ts-ignore
          referenceObject[i] = res;
        }
      } else {
        // @ts-ignore
        referenceObject[i] = params[i];
      }
    }
    // delete undefined values
    for (const key in referenceObject) {
      // @ts-ignore
      if (referenceObject[key] === undefined) {
        // @ts-ignore
        delete referenceObject[key];
      }
    }

    return referenceObject;
  }

  getContentTypeHeader(method?: string) {
    switch (method) {
      case 'patch':
        return GenericApi.CT_PATCH_JSON;

      default:
        return GenericApi.CT_JSON;
    }
  }

  addParam(key: string, value: string | FunctionRequest): ApiInterceptorRequest {
    this.globalParams[key] = value;
    return this;
  }

  addHeaderKey(key: string, value: string | FunctionRequest): ApiInterceptorRequest {
    this.globalHeaders[key] = value;
    return this;
  }

  modifyHeaderKey(key: string, value: string): ApiInterceptorRequest {
    this.globalHeaders[key] = value;
    return this;
  }

  addCallback(f: FunctionRequest): void {
    this.callbacks.push(f);
  }
}
export default ApiInterceptorRequest;
