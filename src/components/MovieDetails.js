import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const MovieDetails = ({ selectedId, onCloseMovie, apiKey }) => {
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieData;

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getMovieData();
  }, [selectedId]);
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>${released} &bull; ${runtime}</p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>{imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24}/>
        </div>
        <p><em>{plot}</em></p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
};

export default MovieDetails;
