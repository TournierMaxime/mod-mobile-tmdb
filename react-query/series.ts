import {
  SerieDetails,
  SerieCrew,
  SerieTrailer,
  TrendingTV,
  OnTheAir,
  Popular,
  SeasonDetails,
  SeasonWatchProviders,
} from "../../../services/tmdb"

const serieDetails = async (id: number, language: string) => {
  try {
    const response = await SerieDetails(id, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const serieCrew = async (id: number, language: string) => {
  try {
    const response = await SerieCrew(id, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const serieTrailer = async (id: number, language: string) => {
  try {
    const response = await SerieTrailer(id, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const trendingTV = async (page: number, language: string) => {
  try {
    const response = await TrendingTV(page, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const onTheAir = async (page: number, language: string) => {
  try {
    const response = await OnTheAir(page, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const popular = async (page: number, language: string) => {
  try {
    const response = await Popular(page, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const seasonDetails = async (
  id: number,
  seasonNumber: number,
  language: string,
) => {
  try {
    const response = await SeasonDetails(id, seasonNumber, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const seasonWatchProviders = async (id: number, seasonNumber: number) => {
  try {
    const response = await SeasonWatchProviders(id, seasonNumber)
    return response.data.results
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const updateSeasonWatchProviders = async (id: number, seasonNumber: number) => {
  try {
    const response = await SeasonWatchProviders(id, seasonNumber)
    return response.data.results
  } catch (error: any) {
    throw new Error(error.message)
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
