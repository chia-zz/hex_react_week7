// import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// 背景圖
const BANNER_IMG = [
  {
    id: 1,
    title: "在光影的縫隙裡，收藏一份安靜的陪伴",
    subTitle: "讓植物，成為空間裡最溫柔的對白",
    img: "banner-1.jpg",
    link: "前往選購",
    url: "/product",
  },
  {
    id: 2,
    title: "聽見草木的呼吸，在無聲的陪伴裡感受生命",
    subTitle: "用最安靜的力量，妝點生活裡每一處不經意的角落",
    img: "banner-2.jpg",
    link: "前往選購",
    url: "/product",
  },
  {
    id: 3,
    title: "於城市的一隅，築起一座只屬於你的綠意島嶼",
    subTitle: "卸下喧囂之後，讓植物溫柔地接住每一個靈魂",
    img: "banner-5.jpg",
    link: "前往選購",
    url: "/product",
  },
];

function Home() {
  return (
    <div className="">
      <Swiper
        className="swiper"
        modules={[Pagination, A11y, EffectFade, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {BANNER_IMG.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="home-banner position-relative">
              <img src={item.img} className="img-fluid w-100" alt={item.id} />
              <div className="text-shadow position-absolute bottom-10 start-50 translate-middle text-center text-white">
                <h2 className="fw-bold">{item.title}</h2>
                <p className="fs-4 ">{item.subTitle}</p>
                <NavLink
                  className="btn btn-outline-primary-600 border d-inline-block text-primary-50 fw-semibold text-decoration-none"
                  to={item.url}
                >
                  <span className="">{item.link}</span>
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default Home;
