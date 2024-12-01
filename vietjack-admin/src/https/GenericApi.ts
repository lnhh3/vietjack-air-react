import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
} from 'axios';

import ApiInterceptorRequest from '@/https/ApiInterceptorRequest.ts';
import ApiInterceptorResponse from '@/https/ApiInterceptorResponse.ts';

import { HttpResponse } from './types';

export const __DEV__ = import.meta.env.VITE_ENV === 'development';
export const __STAGING__ = import.meta.env.VITE_ENV === 'staging';
export const __PROD__ = import.meta.env.VITE_ENV === 'production';

export default class GenericApi {
  axiosInstance: AxiosInstance;
  private readonly interceptorRequest: ApiInterceptorRequest;
  private readonly interceptorResponse: ApiInterceptorResponse;
  logRequest: boolean = __DEV__;
  logResponse: boolean = __DEV__;
  logParams: boolean = __DEV__;

  static readonly CT_URL_ENCODED: string = 'application/x-www-form-urlencoded;charset=utf-8';
  static readonly CT_MULTIPART: string = 'multipart/form-data;charset=utf-8';
  static readonly CT_JSON: string = 'application/json';
  static readonly CT_PATCH_JSON: string = 'application/merge-patch+json';

  constructor(options: CreateAxiosDefaults = {}) {
    this.axiosInstance = axios.create(options);
    this.interceptorRequest = new ApiInterceptorRequest(this);
    this.interceptorResponse = new ApiInterceptorResponse(this);
  }

  setTimeout(value: number): void {
    this.axiosInstance.defaults.timeout = value;
  }

  getInterceptorRequest(): ApiInterceptorRequest {
    return this.interceptorRequest;
  }

  getInterceptorResponse(): ApiInterceptorResponse {
    return this.interceptorResponse;
  }

  updateContentType(value: string = GenericApi.CT_JSON): void {
    this.axiosInstance.defaults.headers['Content-Type'] = value;
  }

  setBaseUrl(url: string): void {
    this.axiosInstance.defaults.baseURL = url;
  }

  async get<T = any>(url: string, configs?: AxiosRequestConfig) {
    return await this.axiosInstance.get<any, HttpResponse<T>>(url, {
      ...configs,
    });
  }

  async post<T = any, R = any>(
    url: string,
    data?: T,
    configs?: AxiosRequestConfig
  ): Promise<HttpResponse<R>> {
    return await this.axiosInstance.post<any, HttpResponse<R>>(url, data, configs);
  }

  async delete<R = any>(url: string, configs?: AxiosRequestConfig) {
    return this.axiosInstance.delete<any, HttpResponse<R>>(url, {
      ...configs,
    });
  }

  async patch<T = any, R = any>(url: string, data?: T, configs?: AxiosRequestConfig) {
    return await this.axiosInstance.patch<T, HttpResponse<R>>(url, data, configs);
  }
  async put<T = any, R = any>(url: string, data?: T, configs?: AxiosRequestConfig) {
    return await this.axiosInstance.put<T, HttpResponse<R>>(url, data, configs);
  }
  async request<T = any, R = any>(configs: AxiosRequestConfig) {
    return await this.axiosInstance.request<T, HttpResponse<R>>(configs);
  }
}
