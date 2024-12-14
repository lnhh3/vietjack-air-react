"use client";

import Carousel from "@/components/core/Carousel";

const HomeCarousel = () => {
  return (
    <div className="max-w-[1200px]">
      <Carousel
        data={[
          "/img/booking-tet-ticket-banner.jpg",
          "/img/new-year-banner-2025.jpg",
        ]}
        onRenderItem={(item) => {
          return (
            <img
              src={item}
              alt=""
              className="h-[50vh] w-full object-cover rounded-[12px]"
            />
          );
        }}
      />
    </div>
  );
};

export default HomeCarousel;
