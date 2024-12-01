import HttpRequest from "@/http";
import { PagingResponse } from "@/types/paging";
import { TicketResponse } from "@/types/ticket";
import { toSnakeCaseKey } from "@/utils";

export const ticketService = {
  getPagingTicket: async ({ page = 1, pageSize = 10 } = {}) => {
    const res = await HttpRequest.get<PagingResponse<TicketResponse>>(
      "/tickets",
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
