import {ChevronDown, Plane, PlaneLanding, PlaneTakeoff} from "lucide-react";

import DropdownList from "@/components/core/DropdownList";
import useFetchPaging from "@/hooks/useFetchPaging";
import {placesService} from "@/service/place";

type Props = {
    chooseDestination?: boolean;
};

const PlaceDropdown = ({chooseDestination}: Props) => {
    const {data} = useFetchPaging(
        ({page}) => placesService.getPagingPlaces({page}),
        {},
    );

    return (
        <DropdownList
            options={data}
            format={(item) => ({
                key: item.id,
                value: `${item.title} (${item.code})`,
            })}
            placeholderClassName="flex-1"
            placeholder={chooseDestination ? "Chọn điểm đến" : "Chọn điểm đi"}
            buttonClassName="w-full"
            startIcon={
                chooseDestination ? (
                    <PlaneLanding size={20}/>
                ) : (
                    <PlaneTakeoff size={20}/>
                )
            }
            endIcon={<ChevronDown size={20}/>}
        />
    );
};

export default PlaceDropdown;
