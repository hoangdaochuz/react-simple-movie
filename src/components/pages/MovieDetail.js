import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { apiKey, tmdbAPI } from "../../config";
import MovieCard from "../movie/MovieCard";
import styled from "styled-components";
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>

const MovieDetailStyle = styled.div`
  @media screen and (max-width: 500px){
    .genres{
      flex-direction: column;
    }
  }
`

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(null);
  const { movieId } = useParams();
  const getMovieDetail = async () => {
    const res = await axios.get(
      tmdbAPI.getMovieDetail(movieId)
    );
    return res.data;
  };

  useEffect(() => {
    getMovieDetail().then((res) => {
      setMovieDetail(res);
    });
  }, []);

  console.log(movieDetail);
  if (!movieDetail) {
    return null;
  }
  const { backdrop_path, poster_path, title, overview, genres } = movieDetail;
  return (
    <MovieDetailStyle className="py-10">
      <div className="page-container relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          className="w-full h-[600px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(http://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="max-w-[800px] h-[400px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={`http://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
        />
      </div>
      <h1 className="text-white text-center font-bold text-4xl mb-5">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="genres flex items-center justify-center gap-5 text-white mb-5">
          {genres.map((item) => {
            return (
              <span
                className="text-[18px] border border-primary px-3 py-2 rounded-sm"
                key={item.id}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      )}
      <div className="text-white max-w-[800px] mx-auto text-center leading-relaxed py-10">
        <p>{overview}</p>
      </div>
      
      <MovieMeta type="credits"/>
      <MovieMeta type="videos"/>
      <MovieMeta type="similar"/>
      {/* <CastComponent />
      <TrailerComponent />
      <SimilarMovieComponent/> */}
    </MovieDetailStyle>
  );
};

const MovieMeta = ({type = "videos"})=>{
  const { movieId } = useParams();
  const [data, setData] = useState();
  const getData = async () => {
    const res = await axios.get(
      tmdbAPI.getMovieMeta(movieId, type)
    );
    return res.data;
  };

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return null;

  if(type==="credits"){
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="cast-list cast page-container">
        <h2 className="text-center text-white text-3xl mb-10 font-bold">Cast</h2>
        <Swiper
          spaceBetween={40}
          slidesPerView={"auto"}
          grabCursor={true}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
        >
          {cast.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div>
                  <div className="h-[350px]">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={`http://image.tmdb.org/t/p/original/${item.profile_path}`}
                      alt=""
                    />
                  </div>
                  <h3 className="text-white text-xl">{item.name}</h3>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }else{
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if(type==="similar"){
      return (
        <div className="movie-list page-container"> 
              <h3 className="text-white font-bold mb-10 text-3xl">Similar</h3>   
               {/*Khong nen de thuoc tinh grid, grid-col vao the div chua swiper boi vi lam vay thi no khong chay duoc.  */}
              <Swiper spaceBetween={40} slidesPerView={"auto"} grabCursor={true} modules={[Autoplay]} autoplay={{delay: 3000}}>
                {results && results.map((movie, index)=>{
                  return (<SwiperSlide key={index}>
                            <MovieCard title={movie.title} poster={movie.poster_path} release={movie.release_date} rating = {movie.vote_average} id={movie.id}/>
                          </SwiperSlide>)
                })}
              </Swiper>
            </div>
      )
    }else{
      return (
        <div className="py-10 page-container flex flex-col gap-10">
          {results.slice(0,2).map((item) => {
            return (
              <div key={item.id} className="w-full h-full mb-3">
                <iframe 
                  className="w-full h-full object-fill aspect-video"
                  width="1024"
                  height="576"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="THE GODFATHER | Opening Scene | Paramount Movies"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            );
          })}
        </div>
      );
    }
  }
}


const CastComponent = () => {
  const { movieId } = useParams();
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await axios.get(
      tmdbAPI.getMovieMeta(movieId, "credits")
    );
    return res.data;
  };

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="cast page-container">
      <h2 className="text-center text-white text-3xl mb-10 font-bold">Cast</h2>
      <Swiper
        spaceBetween={40}
        slidesPerView={4}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
      >
        {cast.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div>
                <div className="h-[350px]">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={`http://image.tmdb.org/t/p/original/${item.profile_path}`}
                    alt=""
                  />
                </div>
                <h3 className="text-white text-xl">{item.name}</h3>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

const TrailerComponent = () => {
  const { movieId } = useParams();
  const [data, setData] = useState();
  const getData = async () => {
    const res = await axios.get(
      tmdbAPI.getMovieMeta(movieId, "videos")
    );
    return res.data;
  };

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10 page-container flex flex-col gap-10">
      {results.slice(0,2).map((item) => {
        return (
          <div key={item.id} className="w-full h-full mb-3">
            <iframe 
              className="w-full h-full object-fill aspect-video"
              width="1024"
              height="576"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="THE GODFATHER | Opening Scene | Paramount Movies"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};

const SimilarMovieComponent = ()=>{
  const { movieId } = useParams();
  const [data, setData] = useState();
  const getData = async () => {
    const res = await axios.get(
      tmdbAPI.getMovieMeta(movieId, "similar")
    );
    return res.data;
  };

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  console.log(results)

  return (
    <div className="movie-list page-container"> 
          <h3 className="text-white font-bold mb-10 text-3xl">Similar</h3>   
           {/*Khong nen de thuoc tinh grid, grid-col vao the div chua swiper boi vi lam vay thi no khong chay duoc.  */}
          <Swiper spaceBetween={40} slidesPerView={"auto"} grabCursor={true} modules={[Autoplay]} autoplay={{delay: 3000}}>
            {results && results.map((movie, index)=>{
              return (<SwiperSlide key={index}>
                        <MovieCard title={movie.title} poster={movie.poster_path} release={movie.release_date} rating = {movie.vote_average} id={movie.id}/>
                      </SwiperSlide>)
            })}
          </Swiper>
        </div>
  )
}

export default MovieDetail;
