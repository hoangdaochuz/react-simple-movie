export const fetcher = (url) => fetch(url).then((res) => res.json());
export const apiKey = "8c14f06191c793a87a59fd44effbcffd"
const endpointAPI = 'https://api.themoviedb.org/3/movie'
export const tmdbAPI = {
  getMovieList: (type)=> `${endpointAPI}/${type}?api_key=${apiKey}`,
  getMovieDetail: (movieId)=>`${endpointAPI}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type)=>`${endpointAPI}/${movieId}/${type}?api_key=${apiKey}`,
  getMoviesInPage: (page)=>`${endpointAPI}/popular?api_key=${apiKey}&page=${page}`,
  getMoviesInPageWithSearch: (searchValue, page)=>`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&page=${page}`

}