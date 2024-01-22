import { useEffect, useState } from "react";

import Navbar from "./layout/Navbar";
import Main from "./layout/Main";
import Search from "./components/Search";
import Logo from "./components/Logo";
import Results from "./components/Resuts";
import Box from "./layout/Box";
import Summary from "./components/Summary";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMesage";
import MovieWatchedList from "./components/MovieWatchedList";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const apiKey = "6283428a";



export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState(
    JSON.parse(localStorage.getItem("watched")) || []

  );

  const [selectedMovieId, setSelectedMovieId] = useState("");
  const { movies, isLoading, error } = useMovies(query);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const handleSelectMovie = (id) => {
    setSelectedMovieId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedMovieId("");
  };

  const handleAddWatchedMovie = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(function () {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched])


  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage msg={error} />}
        </Box>

        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatchedMovie}
              apiKey={apiKey}
              watched={watched}
            />
          ) : (
            <>
              <Summary
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
                watched={watched}
              />

              <MovieWatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
