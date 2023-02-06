import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import PropTypes from 'prop-types'
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ title, poster, release, rating, id }) => {
  const navigate = useNavigate();
  return (
    <div className="movie-card p-3 bg-slate-800 rounded-lg text-white flex flex-col select-none h-full">
      <img
        className="w-full h-[250px] object-cover mb-3"
        src={`http://image.tmdb.org/t/p/w500/${poster}`}
        alt=""
      />
      <div className="flex flex-col flex-1 mb-2">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50">
          <span>{release}</span>
          <div>
            {rating}
            <FontAwesomeIcon className="text-yellow-500 ml-2" icon={faStar} />
          </div>
        </div>
      </div>

      <Button onClick={() => {
          navigate(`/movie/${id}`);
          window.location.reload();
        }} bgColor="secondary">Watch Now</Button>
    </div>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string,
  release: PropTypes.string,
  rating: PropTypes.number,
  id: PropTypes.number,
}

const FallbackComponent = ()=>{
  return <p className="bg-red-50 text-red-500"> Some thing went wrong !!</p>
}

export const MovieCardSkeleton = ()=>{
  return (
    <div className="movie-card p-3 bg-slate-800 rounded-lg text-white flex flex-col select-none h-full">
      
      <LoadingSkeleton className="w-full h-[250px] object-cover mb-3"></LoadingSkeleton>
      <div className="flex flex-col flex-1 mb-2">
        <h3 className="text-xl font-bold mb-2">
          <LoadingSkeleton width="100%" height="40px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50">
          <span>
            <LoadingSkeleton width="50px" height="20px"></LoadingSkeleton>
          </span>
          <div>
            <LoadingSkeleton width="30px" height="20px"></LoadingSkeleton>
            <FontAwesomeIcon className="text-yellow-500 ml-2" icon={faStar} />
          </div>
        </div>
      </div>

      <LoadingSkeleton width="100%" height="50px" className="rounded-lg"></LoadingSkeleton>
    </div>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});
