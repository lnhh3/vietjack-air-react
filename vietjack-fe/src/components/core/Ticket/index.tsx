import Button from "@/components/core/Button";
import {FormatDate} from "@/types/common";
import {PlaceResponse, TicketResponse, TicketType} from "@/types/ticket";
import {formatDate, formatMoney} from "@/utils";

type Props = {
    data: TicketResponse;
};

const Ticket = ({data}: Props) => {
    const {
        title,
        fromPlace,
        destinationPlace,
        price,
        ticketType,
        departureDate,
    } = data;

    const formatPlaceName = (place: PlaceResponse) =>
        `${place.title} (${place.code})`;

    const formatTicketType = (type: TicketType) => {
        const name = {
            [TicketType.ONE_WAY]: "Một chiều",
            [TicketType.ROUND_TRIP]: "Khứ hồi",
        };
        return name[type] ?? "";
    };

    return (
        <div
            className="transition-all bg-white shadow-[rgba(149,157,165,0.2)_0px_8px_24px] p-4 rounded w-full cursor-pointer">
            <div className="py-1 pb-4">
                <p className="font-medium text-[16px]">{formatPlaceName(fromPlace)}</p>
                <p className="font-medium text-[16px]">
                    đến {formatPlaceName(destinationPlace)}
                </p>
                <p className="text-neutral-500 mt-1">
                    Khởi hành {formatDate(departureDate, FormatDate.DD_MM_yyyy)}
                </p>
                <div className="text-right">
                    <div>
                        <p className="text-neutral-500">Giá chỉ từ</p>
                        <p className="text-red-600 text-[24px] font-medium">
                            {formatMoney(price, 0)} VND
                        </p>
                    </div>
                    <div>
                        <p className="text-neutral-500">Loại vé</p>
                        <p className="font-medium">{formatTicketType(ticketType)}</p>
                    </div>
                </div>
            </div>
            <Button className="w-full">Đặt ngay</Button>
        </div>
    );
};

export default Ticket;
