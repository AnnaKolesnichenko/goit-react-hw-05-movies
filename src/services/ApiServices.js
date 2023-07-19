import axios from "axios";
import DefaultPoster from '../images/default_poster.jpg';


const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '14b16a10583a3d9315723a356100e4ad';

export const fetchCast = (movieId) => {
    return axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
};

export const fetchTrending = async () => {
    return await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
};

export const fetchReviews = (movieId) => {
    return axios.get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
};

export const fetchMovieById = (movieId) => {
    return axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
};

export const fetchMoviesByQuery = async (query, page = 1) => {
 return await axios
      .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&per_page=20`);

}




export const getPoster = (movie) => {
    return movie.poster_path === null ? DefaultPoster :`https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
};

export const getActorPoster = (actor) => {
    return actor.profile_path === null ? DefaultPoster : `https://image.tmdb.org/t/p/w500/${actor.profile_path}`; 
};