import {
  SerieDetails,
  SerieCrew,
  SerieTrailer,
  TrendingTV,
  OnTheAir,
  Popular,
  SeasonDetails,
  SeasonWatchProviders,
} from '../../../services/tmdb'

const serieDetails = async (id, language) => {
  try {
    const response = await SerieDetails(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const serieCrew = async (id, language) => {
  try {
    const response = await SerieCrew(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const serieTrailer = async (id, language) => {
  try {
    const response = await SerieTrailer(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const trendingTV = async (page, language) => {
  try {
    const response = await TrendingTV(page, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const onTheAir = async (page, language) => {
  try {
    const response = await OnTheAir(page, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const popular = async (page, language) => {
  try {
    const response = await Popular(page, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const seasonDetails = async (id, seasonNumber, language) => {
  try {
    const response = await SeasonDetails(id, seasonNumber, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const seasonWatchProviders = async (id, seasonNumber, language) => {
  try {
    const response = await SeasonWatchProviders(id, seasonNumber, language)
    return response.data.results
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateSeasonWatchProviders = async (id, seasonNumber, language) => {
  try {
    const response = await SeasonWatchProviders(id, seasonNumber, language)
    return response.data.results
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  serieDetails,
  serieCrew,
  serieTrailer,
  trendingTV,
  onTheAir,
  popular,
  seasonDetails,
  seasonWatchProviders,
  updateSeasonWatchProviders,
}
