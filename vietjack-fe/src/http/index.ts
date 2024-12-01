import qs from "qs";

import GenericApi from "@/http/GenericApi";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const HttpRequest = new GenericApi({
  baseURL: `${BASE_URL}/api`,
  paramsSerializer: (params: any) => qs.stringify(params),
});

export default HttpRequest;
