// src/components/HeroSlider.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PopularPolicies from "./PopularPolicies";
import LatestBlog from "./LatestBlog";
import Reviews from "./Reviews";
import NewsletterSubscription from "./NewsletterSubscription";
import MeetOurAgents from "./MeetOurAgents";
import HelmetTitle from "../../components/HelmetTitle";
import { Link } from "react-router";
import Features from "./Features";

const slides = [
  

  {
    id: 1,
    title: "Secure Your Tomorrow Today",
    subtitle: "Protect what matters most with BimaBondhu",
    image: "https://i.ibb.co.com/1Ywgth5G/towfiqu-barbhuiya-jpqyf-K7-GB4w-unsplash.jpg",
  },
  {
    id: 2,
    title: "Your Family, Our Priority",
    subtitle: "Affordable life insurance plans for every stage of life",
    image: "https://i.ibb.co.com/DD9Nqhn3/pexels-kampus-8441861.jpg",
  },
  {
    id: 3,
    title: "Plan Smart, Live Free",
    subtitle: "Get expert guidance and custom policies",
    image: "https://i.ibb.co.com/chCRJbw2/tierra-mallorca-rg-J1-J8-SDEAY-unsplash.jpg",
  },
];

const HeroSlider = () => {
  return (
   <section>
     <title>home</title>
     <div className="w-full h-[80vh] ">
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
              <div className=" bg-opacity-60 p-6 rounded-md max-w-xl text-white space-y-4">
                 <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1> 
                <p className="text-lg md:text-xl">{slide.subtitle}</p> 
                 <Link
                  to="/allpolicies"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-semibold"
                >
                  Get a Free Quote
                </Link> 
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
{/* popularPolicies */}
<PopularPolicies></PopularPolicies>
{/* LatestBlog */}
<LatestBlog></LatestBlog>
{/* Reviews */}
<Reviews></Reviews>
{/* NewsletterSubscription */}
<NewsletterSubscription></NewsletterSubscription>
{/* MeetOurAgents */}
<MeetOurAgents></MeetOurAgents>
{/* Features */}
<Features></Features>

   </section>
  );
};

export default HeroSlider;
