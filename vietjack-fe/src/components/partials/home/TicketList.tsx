"use client";
import uniqueBy from "@popperjs/core/lib/utils/uniqueBy";

import Button from "@/components/core/Button";
import Ticket from "@/components/core/Ticket";
import PlaceDropdown from "@/components/partials/PlaceDropdown";
import useFetchPaging from "@/hooks/useFetchPaging";
import {ticketService} from "@/service/ticket";

const TicketList = () => {
    const {data, fetchMore, hasLoadMore} = useFetchPaging(
        ({page}) => ticketService.getPagingTicket({page}),
        {
            filter: (data) => uniqueBy(data, (item) => item.id),
        },
    );
    return (
        <div className="mt-10">
            <div className="gap-2 grid grid-cols-3">
                <PlaceDropdown/>
                <PlaceDropdown chooseDestination/>
                <div></div>
                {data.map((item) => (
                    <Ticket key={item.id} data={item}/>
                ))}
            </div>
            {hasLoadMore && (
                <div className="flex justify-center mt-3">
                    <Button onClick={fetchMore} variant="outline">
                        Xem thêm
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TicketList;
