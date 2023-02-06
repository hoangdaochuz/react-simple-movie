import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { tmdbAPI } from "../../config";
import useDebounce from "../../hooks/useDebounce";
import MovieCard, { MovieCardSkeleton } from "../movie/MovieCard";
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>
const itemsPerPage = 20;
const MoviePage = () => {
  const [data, setData]= useState()
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [url, setUrl] = useState(
    tmdbAPI.getMoviesInPage(nextPage)
  );
  const debounceValue = useDebounce(query, 500);
  const getMovies = async (url) => {
    const res = await axios.get(url);
    return res.data;
  };

  useEffect(() => {
    if (debounceValue) {
      setUrl(
        tmdbAPI.getMoviesInPageWithSearch(debounceValue, nextPage)
      );
    } else {
      setUrl(
        tmdbAPI.getMoviesInPage(nextPage)
      );
    }
    setLoading(true);
    getMovies(url).then((res) => {
      setMovies(res.results);
      setData(res)
      setLoading(false);
    });
  }, [debounceValue, url, nextPage]);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;

  const pageCount = data? Math.ceil(data.total_results / itemsPerPage):500
  // const pageCount = 500


  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pageCount;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1)
  };

  console.log(data)
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <input
          type="text"
          className="w-full bg-slate-700 text-white outline-none px-5 py-3"
          placeholder="Enter your movie..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button className="bg-primary text-white px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {loading && <div className="grid grid-cols-4 gap-10 mb-10">
        <MovieCardSkeleton></MovieCardSkeleton>
        <MovieCardSkeleton></MovieCardSkeleton>
        <MovieCardSkeleton></MovieCardSkeleton>
        <MovieCardSkeleton></MovieCardSkeleton>
      </div>}
      {!loading && <div className="grid grid-cols-4 gap-10 mb-10">
        {movies &&
          movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                poster={movie.poster_path}
                rating={movie.vote_average}
                title={movie.title}
                release={movie.release_date}
                id={movie.id}
              ></MovieCard>
            );
          })}
      </div>}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination text-white"
      />  
      
      <div className="flex items-center justify-center gap-x-5 text-white hidden">
        <span
          className="cursor-pointer"
          onClick={() => {
            setNextPage(nextPage - 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        {new Array(5).fill(0).map((item, index) => {
          return (
            <span
              className="cursor-pointer text-slate-900 bg-white px-3 py-2 leading-none rounded-sm font-bold"
              onClick={() => {
                setNextPage(index + 1);
              }}
            >
              {index + 1}
            </span>
          );
        })}
        <span
          className="cursor-pointer"
          onClick={() => {
            setNextPage(nextPage + 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
