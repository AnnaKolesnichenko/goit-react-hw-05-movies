import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import { fetchMovieById } from 'services/ApiServices';
import { getPoster } from 'services/ApiServices';
import Loader from 'components/Loader/Loader';

import style from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const lastQueryRef = useRef('/movies');

  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMovieById(movieId)
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      });
  }, [movieId]);

  useEffect(() => {
    if(location.state && location.state.from) {
      lastQueryRef.current = location.state.from;
    }
  }, [location.state]);

  return (
    <div style={{ marginLeft: 10 }}>
      <Link to={lastQueryRef.current}>
        <button type="button" className={style.back_btn}>Go back</button>
      </Link>

      {loading ? (<Loader />) : (
        <div className={style.movie}>
          <img
            className={style.image}
            src={getPoster(movie)}
            alt={movie.title}
            width={100}
            height={150}
          />
          <div style={{ marginLeft: 20 }}>
            <h2 className={style.movie_title}>
              {movie.title}{' '}
              {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
            </h2>
            <h3 className={style.details}>User score: {movie.vote_average}</h3>
            <h2 className={style.title}>Overview </h2>
            <h3 className={style.details}>{movie.overview}</h3>
            <h2 className={style.title}>Genres </h2>
            <h3 className={style.details}>
              {Array.isArray(movie.genres)
                ? movie.genres.map(genre => genre.name).join(', ')
                : null}
            </h3>
          </div>
        </div>
      )}
      {error && <p>Error occurred while fetching reviews.</p>}

      <h2 className={style.additional_title}>
        Additional information
      </h2>
      <ul className={style.link_list}>
        <li to={location.state ? location.state.from : '/movies?query'}>
          <Link to="cast" >Cast</Link>
        </li>
        <li to={location.state ? location.state.from : '/movie?query'}>
          <Link to="reviews" >Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
