import {
  MovieDetails,
  MovieCrew,
  MovieWatchProviders,
  NowPlaying,
  ReleaseDates,
  MovieTrailer,
  Trending,
  Upcoming,
} from '../../../../services/tmdb'

const movieDetails = (id, language) => async (dispatch) => {
  try {
    dispatch({type: 'MOVIE_DETAILS_REQUEST'})
    const response = await MovieDetails(id, language)
    dispatch({ type: 'MOVIE_DETAILS_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'MOVIE_DETAILS_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetMovieDetails = () => ({
  type: 'RESET_MOVIE_DETAILS',
})

const movieCrew = (id, language) => async (dispatch) => {
  try {
    dispatch({type: 'MOVIE_CREW_REQUEST'})
    const response = await MovieCrew(id, language)
    dispatch({ type: 'MOVIE_CREW_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'MOVIE_CREW_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetMovieCrew = () => ({
  type: 'RESET_MOVIE_CREW',
})

const movieWatchProviders = (id) => async (dispatch) => {
  try {
    dispatch({type: 'MOVIE_WATCH_PROVIDERS_REQUEST'})
    const response = await MovieWatchProviders(id)
    dispatch({
      type: 'MOVIE_WATCH_PROVIDERS_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'MOVIE_WATCH_PROVIDERS_FAILURE',
      payload: error.message,
    })
    console.log(error)
    throw error
  }
}

const resetMovieWatchProviders = () => ({
  type: 'RESET_MOVIE_WATCH_PROVIDERS',
})

const nowPlaying =
  (page, target = 'nowPlaying', language) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'NOW_PLAYING_REQUEST', target })
      const response = await NowPlaying(page, language)
      dispatch({ type: 'NOW_PLAYING_SUCCESS', payload: response.data, target })
      return response.data
    } catch (error) {
      dispatch({ type: 'NOW_PLAYING_FAILURE', payload: error.message, target })
      console.log(error)
      throw error
    }
  }

const resetNowPlaying = () => ({
  type: 'RESET_NOW_PLAYING',
})

const releaseDates = (id) => async (dispatch) => {
  try {
    dispatch({type: 'RELEASE_DATES_REQUEST'})
    const response = await ReleaseDates(id)
    dispatch({ type: 'RELEASE_DATES_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'RELEASE_DATES_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetReleaseDates = () => ({
  type: 'RESET_RELEASE_DATES',
})

const movieTrailer = (id, language) => async (dispatch) => {
  try {
    dispatch({type: 'MOVIE_TRAILER_REQUEST'})
    const response = await MovieTrailer(id, language)
    dispatch({ type: 'MOVIE_TRAILER_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'MOVIE_TRAILER_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const trending =
  (page, target = 'trending', language) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'TRENDING_REQUEST', target })
      const response = await Trending(page, language)
      dispatch({ type: 'TRENDING_SUCCESS', payload: response.data, target })
      return response.data
    } catch (error) {
      dispatch({ type: 'TRENDING_FAILURE', payload: error.message })
      console.log(error)
      throw error
    }
  }

const resetTrending = () => ({
  type: 'RESET_TRENDING',
})

const upcoming =
  (page, target = 'upcoming', language) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'UPCOMING_REQUEST', target })
      const response = await Upcoming(page, language)
      dispatch({ type: 'UPCOMING_SUCCESS', payload: response.data, target })
      return response.data
    } catch (error) {
      dispatch({ type: 'UPCOMING_FAILURE', payload: error.message })
      console.log(error)
      throw error
    }
  }

const resetUpcoming = () => ({
  type: 'RESET_UPCOMING',
})

export {
  movieDetails,
  resetMovieDetails,
  movieCrew,
  resetMovieCrew,
  movieWatchProviders,
  resetMovieWatchProviders,
  nowPlaying,
  resetNowPlaying,
  releaseDates,
  resetReleaseDates,
  movieTrailer,
  trending,
  resetTrending,
  upcoming,
  resetUpcoming,
}
