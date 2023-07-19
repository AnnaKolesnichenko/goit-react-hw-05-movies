import axios from "axios";
import DefaultPoster from '../images/default_poster.jpg';


const API_KEY = '14b16a10583a3d9315723a356100e4ad';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// axios.defaults.params = {
//     api_key: API_KEY
// };

export const fetchCast = (movieId) => {
    return axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}`);
};

export const fetchTrending = async () => {
    return await axios.get(`/trending/movie/week?api_key=${API_KEY}`);
};

export const fetchReviews = (movieId) => {
    return axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
};

export const fetchMovieById = (movieId) => {
    return axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
};

export const fetchMoviesByQuery = async (query, page = 1) => {
 return await axios
      .get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&per_page=20`);

}




export const getPoster = (movie) => {
    return movie.poster_path === null ? DefaultPoster :`https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
};

export const getActorPoster = (actor) => {
    return actor.profile_path === null ? DefaultPoster : `https://image.tmdb.org/t/p/w500/${actor.profile_path}`; 
};