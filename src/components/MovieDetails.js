import { useEffect, useState } from "react";

const MovieDetails = ({ selectedId, onCloseMovie, apiKey }) => {
  const [movieData, setMovieData] = useState("");

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getMovieData();
  });
  return (
    <div className="detail">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      {selectedId}
    </div>
  );
};

export default MovieDetails;
