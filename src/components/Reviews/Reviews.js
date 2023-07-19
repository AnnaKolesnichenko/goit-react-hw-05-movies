import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchReviews} from 'services/ApiServices';
import Loader from 'components/Loader/Loader';

import style from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchReviews(movieId)
      .then(res => {
        setReviews(res.data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div className={style.reviews}>
      {loading ? (
        <Loader/>
      ) : (
        <ul className={style.items}>
          {reviews &&
            reviews.map(review => (
              <li key={review.id} className={style.item}>
                <h2 className={style.author}>Author: {review.author}</h2>
                <p className={style.details}>{review.content}</p>
              </li>
            ))}
        </ul>
      )}
      {error && <p>There are no reviews to this movie.</p>}
    </div>
  );
};

export default Reviews;

