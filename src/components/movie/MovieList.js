import React, { useEffect, useState } from 'react';
import { Swiper,SwiperSlide } from 'swiper/react';
import MovieCard, { MovieCardSkeleton } from './MovieCard';

import {tmdbAPI} from '../../config'
import axios from 'axios';
import PropTypes from "prop-types"
import {withErrorBoundary} from 'react-error-boundary'


const MovieList = ({type = "now_playing"}) => {
  // https://api.themoviedb.org/3/movie/now_playing?api_key=8c14f06191c793a87a59fd44effbcffd
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const getListMovie = async()=>{
    const res = await axios.get(tmdbAPI.getMovieList(type))
    return res.data
  }
  useEffect(()=>{
    setLoading(true)
    getListMovie().then((res)=>{
      setMovies(res.results)
      setLoading(false)
    })
  },[])
  // console.log(movies)
  return ( <div className="movie-list">    
           {/*Khong nen de thuoc tinh grid, grid-col vao the div chua swiper boi vi lam vay thi no khong chay duoc.  */}
           {loading && <Swiper spaceBetween={40} slidesPerView={"auto"} grabCursor={true}>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
           </Swiper>}
          {!loading && <Swiper spaceBetween={40} slidesPerView={"auto"} grabCursor={true}>
            {movies && movies.map((movie, index)=>{
              return (<SwiperSlide key={index}>
                        <MovieCard title={movie.title} poster={movie.poster_path} release={movie.release_date} rating = {movie.vote_average} id={movie.id}/>
                      </SwiperSlide>)
            })}
          </Swiper>}
        </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string,
}

const FallbackComponent = ()=>{
  return <p className='bg-red-50 text-red-500'>Some thing went wrong!</p>
}

export default withErrorBoundary(MovieList,{
  FallbackComponent,
});