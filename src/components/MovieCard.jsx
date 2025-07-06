import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({
  movie: {
    id,
    title,
    name,
    vote_average,
    poster_path,
    release_date,
    first_air_date,
    original_language,
  },
  contentType = "movie"
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${contentType}/${id}`);
  };

  // Use title for movies, name for TV shows
  const displayTitle = contentType === "movie" ? title : name;
  
  // Use release_date for movies, first_air_date for TV shows
  const displayDate = contentType === "movie" ? release_date : first_air_date;

  return (
    <div
      className="movie-card hover:scale-105 hover:shadow-indigo-500 transition duration-500 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={displayTitle}
      />

      <div className="mt-4">
        <h3>{displayTitle}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {displayDate ? displayDate.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
