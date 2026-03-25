// import { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import NewArrival from '../../components/NewArrival';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { bannerImg } from '../../data/frontData';

function Home() {
  return (
    <>
      <div className=''>
        <Swiper
          className='swiper'
          modules={[Pagination, A11y, EffectFade, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          effect='fade'
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {bannerImg.map((item) => (
            <SwiperSlide key={item.id}>
              <div className='home-banner position-relative'>
                <img src={item.img} className='img-fluid w-100' alt={item.id} />
                <div className='text-shadow position-absolute bottom-10 start-50 translate-middle text-center text-white'>
                  <h2 className='fw-bold'>{item.title}</h2>
                  <p className='fs-4 '>{item.subTitle}</p>
                  <NavLink
                    className='btn btn-outline-primary-600 border d-inline-block text-primary-50 fw-semibold text-decoration-none'
                    to={item.url}
                  >
                    <span className=''>{item.link}</span>
                  </NavLink>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='h-100 my-3'>
        <NewArrival />
      </div>
    </>
  );
}
export default Home;
