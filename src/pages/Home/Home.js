import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrending } from 'services/ApiServices';
import { getPoster } from 'services/ApiServices';

import style from './Home.module.css';

const Home = () => {
  const [trenderMovies, setTrendedMovies] = useState([]);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    fetchTrending()
      .then(({ data }) => setTrendedMovies(data.results))
      .catch(error => console.log(error));
  }, []);

  // const movieTitle = movie.title || "Be added soon...";

  return (
    <div>
      <h1 className={style.title}>Trending today</h1>
      <ul className={style.trending_list}>
        {trenderMovies.map(movie =>
        <li className={style.trending_item} key={movie.id}>
          <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
            >
              <img
                src={getPoster(movie)}
                alt={movie.title}
              />
              <h3 className={style.movie_title}>
                {movie.title ? movie.title : <p>Be added soon...</p>}
                </h3>
          </Link>
        </li>
        )}
      </ul>
    </div>
  );
};

export default Home;
