import React, { useState, useEffect } from 'react';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_APIKEY}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Daftar Film</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>ID: {movie.id}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Popularitas: {movie.popularity}</p>
            <p>Ringkasan: {movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
