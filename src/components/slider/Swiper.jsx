import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logoWithTitle.svg";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { slides } from "../../data/slide";

const ImageSlider = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    if (swiper) swiper.slideTo(index);
  };

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", () => setActiveIndex(swiper.realIndex));
    }
  }, [swiper]);

  return (
    <div className="w-[40vw] h-[100vh] relative bg-secondary">
      {/* Logo */}
      <div className="w-full flex justify-center h-[22vh]">
        <img
          src={logo}
          alt="شعار الموقع"
          className="w-[164px]"
          loading="lazy"
        />
      </div>

      {/* Swiper slider */}
      <Swiper
        modules={[Autoplay]}
        onSwiper={setSwiper}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="flex overflow-hidden shadow-lg h-[78vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="mb-6 overflow-hidden">
            <div className="flex m-auto flex-col items-center gap-6 w-fit h-full object-cover">
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-[200px] h-[240px] object-contain transition-transform duration-700 ${
                  activeIndex === index ? "scale-110" : "scale-90"
                }`}
              />
              <h2
                className={`font-bold transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {slide.title}
              </h2>
              <p
                className={`w-[246px] text-sm text-center transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {slide.desc}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation dots */}
      <div className="absolute translate-x-[-50%] left-[50%] bottom-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ml-2 ${
              activeIndex === index
                ? "bg-primary scale-110 w-5 h-2"
                : "bg-[#C2BFFF] w-2 h-2 hover:bg-gray-400"
            }`}
            aria-label={`اذهب إلى الشريحة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
