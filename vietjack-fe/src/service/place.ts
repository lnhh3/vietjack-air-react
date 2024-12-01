import HttpRequest from "@/http";
import { PagingResponse } from "@/types/paging";
import { PlaceResponse, TicketResponse } from "@/types/ticket";
import { toSnakeCaseKey } from "@/utils";

export const placesService = {
  getPagingPlaces: async ({ page = 1, pageSize = 10 } = {}) => {
    const res = await HttpRequest.get<PagingResponse<PlaceResponse>>(
      "/places",
      {
        params: {
          page: Number(page),
          pageSize: Number(pageSize),
        },
      },
    );
    return res.data;
  },
};
