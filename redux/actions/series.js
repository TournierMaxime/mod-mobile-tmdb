import {
  SeasonDetails,
  SerieDetails,
  OnTheAir,
  Popular,
  SeasonWatchProviders,
  SerieCrew,
  SerieTrailer,
  TrendingTV,
} from '../../services/tmdb'

const seasonDetails = (id, seasonNumber, language) => async (dispatch) => {
  try {
    const response = await SeasonDetails(id, seasonNumber, language)
    dispatch({ type: 'SEASON_DETAILS_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'SEASON_DETAILS_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetSeasonDetails = () => ({
  type: 'RESET_SEASON_DETAILS',
})

const serieDetails = (id, language) => async (dispatch) => {
  try {
    const response = await SerieDetails(id, language)
    dispatch({ type: 'SERIE_DETAILS_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'SERIE_DETAILS_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetSerieDetails = () => ({
  type: 'RESET_SERIE_DETAILS',
})

const onTheAir =
  (page, target = 'onTheAir', language) =>
  async (dispatch) => {
    try {
      const response = await OnTheAir(page, language)
      dispatch({ type: 'ON_THE_AIR_SUCCESS', payload: response.data, target })
      return response.data
    } catch (error) {
      dispatch({ type: 'ON_THE_AIR_FAILURE', payload: error.message })
      console.log(error)
      throw error
    }
  }

const resetOnTheAir = () => ({
  type: 'RESET_ON_THE_AIR',
})

const popular =
  (page, target = 'popular', language) =>
  async (dispatch) => {
    try {
      const response = await Popular(page, language)
      dispatch({ type: 'POPULAR_SUCCESS', payload: response.data, target })
      return response.data
    } catch (error) {
      dispatch({ type: 'POPULAR_FAILURE', payload: error.message })
      console.log(error)
      throw error
    }
  }

const resetPopular = () => ({
  type: 'RESET_POPULAR',
})

const seasonWatchProviders =
  (id, seasonNumber, language) => async (dispatch) => {
    try {
      const response = await SeasonWatchProviders(id, seasonNumber, language)
      dispatch({
        type: 'SEASON_WATCH_PROVIDERS_SUCCESS',
        payload: response.data,
      })
      return response.data
    } catch (error) {
      dispatch({
        type: 'SEASON_WATCH_PROVIDERS_FAILURE',
        payload: error.message,
      })
      console.log(error)
      throw error
    }
  }

const updateSeasonWatchProviders =
  (id, seasonNumber, language) => async (dispatch) => {
    try {
      const response = await SeasonWatchProviders(id, seasonNumber, language)
      dispatch({
        type: 'UPDATE_SEASON_WATCH_PROVIDERS',
        payload: {
          seasonNumber,
          watchProviders: response.data,
        },
      })
    } catch (error) {
      dispatch({
        type: 'SEASON_WATCH_PROVIDERS_FAILURE',
        payload: error.message,
      })
      console.log(error)
      throw error
    }
  }

const resetSeasonWatchProviders = () => ({
  type: 'RESET_SEASON_WATCH_PROVIDERS',
})

const serieCrew = (id, language) => async (dispatch) => {
  try {
    const response = await SerieCrew(id, language)
    dispatch({ type: 'SERIE_CREW_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'SERIE_CREW_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetSerieCrew = () => ({
  type: 'RESET_SERIE_CREW',
})

const serieTrailer = (id, language) => async (dispatch) => {
  try {
    const response = await SerieTrailer(id, language)
    dispatch({ type: 'SERIE_TRAILER_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'SERIE_TRAILER_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const trendingTV =
  (page, target = 'trendingTV', language) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'TRENDING_TV_REQUEST', target })
      const response = await TrendingTV(page, language)
      dispatch({ type: 'TRENDING_TV_SUCCESS', payload: response.data, target })
      return response.data
    } catch (error) {
      dispatch({ type: 'TRENDING_TV_FAILURE', payload: error.message })
      console.log(error)
      throw error
    }
  }

const resetTrending = () => ({
  type: 'RESET_TRENDING_TV',
})

export {
  seasonDetails,
  resetSeasonDetails,
  serieDetails,
  resetSerieDetails,
  onTheAir,
  resetOnTheAir,
  popular,
  resetPopular,
  seasonWatchProviders,
  updateSeasonWatchProviders,
  resetSeasonWatchProviders,
  serieCrew,
  resetSerieCrew,
  serieTrailer,
  trendingTV,
  resetTrending,
}
