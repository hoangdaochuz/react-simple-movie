import React, { Fragment } from 'react';
import Banner from '../banner/Banner';
import MovieList from '../movie/MovieList';

const HomePage = () => {
  return (
    <Fragment>
      <Banner/>
      <section className="movie-layout page-container pb-20">
        <h2 className="text-white text-2xl capitalize font-bold mb-10">Now Playing</h2>
        <MovieList/>
      </section>
      <section className="movie-layout page-container pb-20">
        <h2 className="text-white text-2xl capitalize font-bold mb-10">Top Rated Movies</h2>
        <MovieList type="top_rated"/>
      </section>
      <section className="movie-layout page-container pb-20">
        <h2 className="text-white text-2xl capitalize font-bold mb-10">Trending</h2>
        <MovieList type="popular"/>
      </section>
    </Fragment>
  );
};

export default HomePage;