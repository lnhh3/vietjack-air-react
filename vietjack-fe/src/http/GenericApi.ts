import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { ApiInterceptorRequest } from "@/http/ApiInterceptorRequest";
import ApiInterceptorResponse from "@/http/ApiInterceptorResponse";
import { HttpResponse } from "@/http/type";

export default class GenericApi {
  axiosInstance: AxiosInstance;
  interceptorRequest: ApiInterceptorRequest;
  interceptorResponse: ApiInterceptorResponse;
  logRequest = false;
  logResponse = false;

  static CT_URL_ENCODED = "application/x-www-form-urlencoded;charset=utf-8";
  static CT_MULTIPART = "multipart/form-data;charset=utf-8";
  static CT_JSON = "application/json";
  static CT_PATCH_JSON = "application/merge-patch+json";

  constructor(options = {}) {
    this.axiosInstance = axios.create(options);
    this.interceptorRequest = new ApiInterceptorRequest(this);
    this.interceptorResponse = new ApiInterceptorResponse(this);
  }

  setTimeout(value: number) {
    this.axiosInstance.defaults.timeout = value;
  }

  getInterceptorRequest() {
    return this.interceptorRequest;
  }

  getInterceptorResponse() {
    return this.interceptorResponse;
  }

  updateContentType(value = GenericApi.CT_JSON) {
    this.axiosInstance.defaults.headers["Content-Type"] = value;
  }

  setBaseUrl(url: string) {
    this.axiosInstance.defaults.baseURL = url;
  }

  async get<R = unknown>(url: string, configs?: AxiosRequestConfig) {
    return await this.axiosInstance.get<any, HttpResponse<R>>(url, {
      ...configs,
    });
  }

  async post<R = unknown, D = unknown>(
    url: string,
    data: D,
    configs?: AxiosRequestConfig,
  ) {
    return await this.axiosInstance.post<D, HttpResponse<R>>(
      url,
      data,
      configs,
    );
  }

  async delete<R = unknown>(url: string, configs?: AxiosRequestConfig) {
    return this.axiosInstance.delete<unknown, HttpResponse<R>>(url, {
      ...configs,
    });
  }

  async patch<R = unknown, T = unknown>(
    url: string,
    data?: T,
    configs?: AxiosRequestConfig,
  ) {
    return await this.axiosInstance.patch<T, HttpResponse<R>>(
      url,
      data,
      configs,
    );
  }
  async put<R = any, T = any>(
    url: string,
    data?: T,
    configs?: AxiosRequestConfig,
  ) {
    return await this.axiosInstance.put<T, HttpResponse<R>>(url, data, configs);
  }
  async request<T = any, R = any>(configs: AxiosRequestConfig) {
    return await this.axiosInstance.request<T, HttpResponse<R>>(configs);
  }
}
