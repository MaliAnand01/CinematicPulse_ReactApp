import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/movie/${id}?append_to_response=credits,videos`,
          API_OPTIONS
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Movie not found</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const trailer = movie.videos.results.find(
    (video) => video.type === "Trailer"
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center text-blue-400 hover:text-blue-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </button>

        {/* Movie Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Poster */}
          <div className="lg:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Info */}
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <div className="flex items-center mb-4">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-semibold mr-4">
                {movie.vote_average?.toFixed(1)} ⭐
              </span>
              <span className="text-gray-300">
                {movie.release_date?.split("-")[0]} • {movie.runtime} min
              </span>
            </div>

            <div className="mb-4">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm mr-2 mb-2 inline-block"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              {movie.overview}
            </p>

            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.credits.cast.slice(0, 10).map((actor) => (
                    <span
                      key={actor.id}
                      className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {actor.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Production Companies */}
            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Production Companies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_companies.map((company) => (
                      <span
                        key={company.id}
                        className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Trailer Section */}
        {movie.videos?.results && movie.videos.results.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
            <div className="aspect-video">
              {console.log(movie.videos.results)}

              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                className="w-full h-full rounded-lg"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Budget</h3>
            <p className="text-gray-300">
              {movie.budget > 0
                ? `$${(movie.budget / 1000000).toFixed(1)}M`
                : "Not available"}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-gray-300">
              {movie.revenue > 0
                ? `$${(movie.revenue / 1000000).toFixed(1)}M`
                : "Not available"}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            <p className="text-gray-300">{movie.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
