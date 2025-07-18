// src/components/HeroSlider.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Secure Your Tomorrow Today",
    subtitle: "Protect what matters most with BimaBondhu",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367b",
  },
  {
    id: 2,
    title: "Your Family, Our Priority",
    subtitle: "Affordable life insurance plans for every stage of life",
    image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f8",
  },
  {
    id: 3,
    title: "Plan Smart, Live Free",
    subtitle: "Get expert guidance and custom policies",
    image: "https://images.unsplash.com/photo-1618946894926-58e1d9edb62e",
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full h-[80vh] bg-green-200">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center text-center px-4"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="bg-black bg-opacity-60 p-6 rounded-md max-w-xl text-white space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
                <a
                  href="/quote"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-semibold"
                >
                  Get a Free Quote
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
