import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logoWithTitle.svg";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import imgOne from "../../assets/images/onBoardingOne.svg";
import imgTwo from "../../assets/images/onBoardingTwo.svg";
import imgThree from "../../assets/images/onBoardingThree.svg";
import "swiper/css";
import "swiper/css/autoplay";

const ImageSlider = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: imgOne,
      alt: "Nature 1",
      title: "بيع واشتري بكل سهولة",
      desc: "منصة سوريا أمنة لنشر إعلاناتك وبيع منتجاتك",
    },
    {
      id: 2,
      image: imgTwo,
      alt: "Nature 2",
      title: "تابع عروض منطقتك",
      desc: "ابحث واعثر على أفضل العروض بالقرب منك بسهولة",
    },
    {
      id: 3,
      image: imgThree,
      alt: "Nature 3",
      title: "انشر إعلانك بسهولة",
      desc: "شارك منتجاتك وخدماتك مع آلاف المستخدمين",
    },
  ];

  const goToSlide = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", () => {
        setActiveIndex(swiper.realIndex);
      });
    }
  }, [swiper]);

  return (
    <div className="w-[40vw] h-[100vh]  relative  bg-secondary">
      <div className="w-full flex justify-center h-[22vh]">
        <img src={logo} alt="logo" className="w-[164px]" loading="lazy" />
      </div>
      <Swiper
        modules={[Autoplay]}
        onSwiper={setSwiper}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="flex overflow-hidden shadow-lg h-[78vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="mb-6 overflow-hidden">
            <div className="flex m-auto flex-col items-center gap-6 w-fit h-full object-cover">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-[250px] h-[250px] object-contain"
              />
              <>
                <h2
                  className={`${
                    slide.id === index + 1 ? "block" : "none"
                  }  font-bold`}
                >
                  {slide.title}
                </h2>
                <p
                  className={` ${
                    slide.id === index + 1 ? "block" : "none"
                  } w-[246px] text-sm  text-center `}
                >
                  {slide.desc}
                </p>
              </>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute translate-x-[-50%] left-[50%] bottom-4 ">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={` rounded-full transition-all duration-300 ml-2 ${
              activeIndex === index
                ? " bg-primary scale-110 w-5 h-2"
                : " bg-[#C2BFFF] w-2 h-2 hover:bg-gray-400 "
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
