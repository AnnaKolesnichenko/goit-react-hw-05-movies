import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import DeafaultPoster from '../../images/placeholder.jpg';
import { fetchCast } from 'services/ApiServices';

import style from './Cast.module.css';


const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    setLoading(true);
    fetchCast(movieId)
      .then(res => {
        setCast(res.data.cast);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      });
  }, [movieId]);
  console.log(movieId);

  return (

      <div className={style.cast}>
      {loading ? <p>Loading cast....</p> : (
        <ul className={style.actors}>
        {cast.map(actor => (
          <li className={style.actor} key={actor.cast_id} state={{from: location}}>
            <Link >
            <img className={style.image} src={actor.profile_path === null ? DeafaultPoster : `https://image.tmdb.org/t/p/w154/${actor.profile_path}` } alt={actor.name} />
            <div className={style.actor_descr}>
            <h2 className={style.name}>{actor.name}</h2>
            <h2 className={style.name}>Character: {actor.character}</h2>
            </div>
          </Link>
          </li>
        ))}
      </ul>
      )}
      {error && <p>Error occurred while fetching reviews.</p>}
    </div>

  );
};

export default Cast;


