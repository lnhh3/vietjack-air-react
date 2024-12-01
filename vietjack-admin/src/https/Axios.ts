import qs from 'qs';

import GenericApi from '@/https/GenericApi.ts';
import { toSnakeCaseKey } from '@/utilities/helper';

const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

const httpRequest = new GenericApi({
  baseURL: `${BASE_URL}/api`,
  paramsSerializer: (params) => qs.stringify(toSnakeCaseKey(params)),
});

httpRequest.logRequest = false;
httpRequest.logResponse = false;

export default httpRequest;
