import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css/autoplay';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const BannerItemStyle = styled.div`
  @media screen and (max-width: 350px){
    .description{
      width: 85%;
    }
    .category{
      flex-direction: column;
      row-gap: 15px;
      width: 100%;

    }
  }
`
const BannerItem = ({item})=>{
  const navigate = useNavigate()
  const {title, poster_path, id} = item
  return (
    <BannerItemStyle className="w-full h-full rounded-lg relative">
          <div className="overlay absolute inset-0 rounded-lg bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
          <img className="w-full h-full object-cover rounded-lg object-top" src={`http://image.tmdb.org/t/p/original/${poster_path}`} alt=""  />
          <div className="description text-white absolute left-5 bottom-5 w-full mb-5">
            <h2 className="text-3xl font-bold mb-5">{title}</h2>
            <div className="category flex justify-start gap-x-3 mb-5">
              <span className="px-3 py-1 rounded-lg border border-white">Action</span>
              <span className="px-3 py-1 rounded-lg border border-white">Avenger</span>
              <span className="px-3 py-1 rounded-lg border border-white">Drama</span>
            </div>
            {/* <button className="text-white bg-primary px-3 py-1 rounded-md font-medium">Watch Now</button> */}
            <Button onClick={() => {
          navigate(`/movie/${id}`);
          window.location.reload();
        }}>Watch Now</Button>
          </div>
    </BannerItemStyle>
  )
}

const Banner = () => {
  const [movies, setMovies] = useState([])
  const getUpComingMovie = async()=>{
    const res = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=8c14f06191c793a87a59fd44effbcffd')
    return res.data
  }

  useEffect(()=>{
    getUpComingMovie().then((res)=>{
      setMovies(res.results)
    })
  },[])

  console.log(movies)
  return (
    <section className="banner h-[500px] page-container pb-20 overflow-hidden mb-20">
      <Swiper slidesPerView={1} grabCursor={true} modules={[Autoplay]} autoplay={{delay: 3000}}>
        {movies && movies.map((movie)=>{
          return (
            <SwiperSlide key={movie.id}>
              <BannerItem item={movie}/>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  );
};

export default Banner;