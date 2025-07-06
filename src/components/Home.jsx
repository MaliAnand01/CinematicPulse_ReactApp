/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./Search";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import { getTrendingMovies, updateSearchCount } from "../appwrite";
import Footer from "./Footer";
import { motion } from "framer-motion";

const API_BASE_URL = "https://tmdb-proxy.my-movie-proxy.workers.dev";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [contentType, setContentType] = useState("movie"); // "movie" or "tv"

  // Debounce the searchTerm to prevent unnecessary API calls
  // by waiting for 500ms before executing the fetchMovies function
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}?path=/search/${contentType}?query=${encodeURIComponent(
            query
          )}`
        : `${API_BASE_URL}?path=/discover/${contentType}?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(
          data.Error ||
            "Failed to fetch content. Please check your internet connection."
        );
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log("Error fetching content:", error);
      setErrorMessage("Failed to fetch content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.log("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, contentType]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const handleContentTypeChange = (type) => {
    setContentType(type);
    setSearchTerm(""); // Clear search when switching content type
  };

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img
            className="w-[50px] mb-8 cursor-pointer"
            src="logo.png"
            alt="LOGO"
          />
          <img src="./hero.png" alt="hero banner" />
          <h1>
            Find <span className="text-gradient">Movies & TV Shows</span> You'll
            Love Without the Hassle
          </h1>

          {/* Content Type Toggle */}
          <div className="flex justify-center mt-6 mb-4">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => handleContentTypeChange("movie")}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  contentType === "movie"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                🎬 Movies
              </button>
              <button
                onClick={() => handleContentTypeChange("tv")}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  contentType === "tv"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                📺 TV Shows
              </button>
            </div>
          </div>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={index}>
                    <p>{index + 1}</p>
                    <img
                      className="hover:scale-105 border-2 hover:border-indigo-800 transition duration-500 "
                      src={movie.poster_url}
                      alt="movie.title"
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          </section>
        )}

        <section className="all-movies">
          <h2>
            {contentType === "movie" ? "Popular Movies" : "Popular TV Shows"}
          </h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ul>
                {movieList.map((item) => (
                  <MovieCard
                    key={item.id}
                    movie={item}
                    contentType={contentType}
                  />
                ))}
              </ul>
            </motion.div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
