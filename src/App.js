import axios from 'axios';
import './App.css';
import { getMovieList, searchMovie } from './api';
import CustomNavbar from './CustomNavbar';
import { useEffect, useState } from 'react';

const App = () => {
  const API_URL = 'https://api.themoviedb.org/3';

  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const handleMovieClick = async (event, movieId) => {
    event.stopPropagation();
    const response = await axios.get(
      `${API_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_APIKEY}`
    );
    setSelectedMovie(response.data);
  };

  const handleMovieClose = () => {
    setSelectedMovie(null);
  };

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div
            className="Movie-title"
            onClick={(event) => handleMovieClick(event, movie.id)}
          >
            {movie.title}
          </div>
          <img
            className="Movie-Image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="Movie-date">release: {movie.release_date}</div>
          <div className="Movie-rate">rate: {movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <CustomNavbar />
        </div>
        <h1>movie mania</h1>
        <input
          placeholder="cari film kesayangan..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
        {selectedMovie && (
          <div className="Movie-overview">
            <button className="Movie-close" onClick={handleMovieClose}>
              X
            </button>
            <h2>{selectedMovie.title}</h2>
            <img
              src={`${process.env.REACT_APP_BASEIMGURL}/${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <p>{selectedMovie.release_date}</p>
            <p>{selectedMovie.overview}</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
