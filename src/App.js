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

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const apiKey = "6283428a";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const handleSelectMovie = (id) => {
    setSelectedMovieId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedMovieId("");
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
        );
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
      }
    };

    getMovies();
  }, [query]);

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
              apiKey={apiKey}
            />
          ) : (
            <>
              <Summary
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
                watched={watched}
              />

              <MovieWatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
