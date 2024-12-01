import type { InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

import { NGROK_ACCESS } from '@/http/ApiInterceptorRequest.ts';
import GenericApi from '@/http/GenericApi.ts';

const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

const httpRequest = new GenericApi({
  baseURL: `${BASE_URL}/api`,
  paramsSerializer: (params) => qs.stringify(params),
});

httpRequest.logRequest = false;
httpRequest.logResponse = false;

httpRequest.getInterceptorRequest().addCallback((_: any, config: InternalAxiosRequestConfig) => {
  config.headers['Cross-Origin-Embedder-Policy'] = 'unsafe-none';
  if (config.method === 'get' || config.method === 'GET') {
    config.headers[NGROK_ACCESS] = 'true';
  }
});

export default httpRequest;
