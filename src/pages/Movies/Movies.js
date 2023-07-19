// import MovieDetails from '../movieDetails/MovieDetails';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import { fetchMoviesByQuery } from 'services/ApiServices';
import Loader from 'components/Loader/Loader';
import NonExisting from 'pages/NotExisting/NonExisting';
import MovieList from 'components/MovieList/MovieList';

import style from './Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchQuery = searchParams.get('query');
  const location = useLocation();
  const memoLocation = useRef(location.current);

  useEffect(() => {      
    if(!searchQuery) {
      return;
    }
    setLoading(true);
    
      fetchMoviesByQuery(searchQuery)
      .then(res => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch (error => {      
        setError(true);
        setLoading(false);
      })
   }, [searchQuery])

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.query.value.toLowerCase().trim();
    setSearchParams({
      query: searchValue
    })
  }


  return (
    <div className={style.form_section}>
      <form className={style.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={style.input_field}
          name="query"
          required
        ></input>
        <button type="submit" className={style.search_btn}>Search</button>
      </form>
      {error && <NonExisting/>}
      {loading && <Loader/>}      
      {movies.length > 0 && <MovieList state={{from: location}} lo={memoLocation} movies={movies}/>}
    </div>
  );
};

export default Movies;
