import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = props => {
  console.log(props)
  return (
    <div className="movie-list">
      {props.movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}

export default MovieList
