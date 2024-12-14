"use client";
import "swiper/css";
import "swiper/css/pagination";

import { useHover } from "hooks-react-custom";
import * as React from "react";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

import { cn } from "@/utils";

import { CarouselProps } from "./type";

const Carousel: React.FC<CarouselProps> = (props) => {
  const {
    controls,
    classes,
    data,
    nextSlide,
    prevSlide,
    hideNavigateOnBegin,
    hideNavigateOnEnd,
    hoverShowNavigate,
    onRenderItem,
    onSlideChange,
    ...rest
  } = props;

  const [swiperRef, setSwiperRef] = React.useState<any>();
  const [hoverRef, isHover] = useHover<HTMLDivElement>();
  const [isSlideStickWall, setIsSlideStickWall] = React.useState({
    begin: true,
    end: false,
  });

  const handlePrevSlide = React.useCallback(() => {
    if (!swiperRef) return;
    swiperRef?.slidePrev();
  }, [swiperRef]);
  const handleNextSlide = React.useCallback(() => {
    if (!swiperRef) return;
    swiperRef?.slideNext();
  }, [swiperRef]);

  const handleSLideChange = React.useCallback(
    (swiper: any) => {
      onSlideChange?.(swiper);
      controls &&
        setIsSlideStickWall({
          begin: swiper?.isBeginning || false,
          end: swiper?.isEnd || false,
        });
    },
    [controls, onSlideChange],
  );

  return (
    <div ref={hoverRef} className={cn("relative", classes?.container)}>
      {controls && (
        <div
          className={cn(
            hoverShowNavigate ? (isHover ? "!block" : "!hidden") : "block",
            classes?.wrapNavigate,
          )}
        >
          <div
            onClick={handlePrevSlide}
            className={cn(
              "absolute left-0 -translate-x-1/2 z-10 -translate-y-1/2 top-1/2",
              classes?.prevSlide,
              hideNavigateOnBegin && isSlideStickWall.begin && "!hidden",
            )}
          >
            {prevSlide}
          </div>
          <div
            onClick={handleNextSlide}
            className={cn(
              "absolute right-0 z-10 translate-x-1/2 -translate-y-1/2 top-1/2",
              classes?.nextSlide,
              hideNavigateOnEnd && isSlideStickWall.end && "!hidden",
            )}
          >
            {nextSlide}
          </div>
        </div>
      )}
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onSwiper={setSwiperRef}
        modules={[Autoplay, Pagination]}
        onSlideChange={handleSLideChange}
        {...rest}
      >
        {(data?.length || 0) > 0 &&
          data?.map((item, index) => (
            <SwiperSlide key={`${index}-120`}>
              {onRenderItem?.(item, index)}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default React.memo(Carousel);
