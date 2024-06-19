import {
  MovieDetails,
  MovieCrew,
  ReleaseDates,
  MovieWatchProviders,
  MovieTrailer,
  NowPlaying,
  TopRated,
  Trending,
  Upcoming,
} from "../../../services/tmdb"

const movieDetails = async (id: number, language: string) => {
  try {
    const response = await MovieDetails(id, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const movieCrew = async (id: number, language: string) => {
  try {
    const response = await MovieCrew(id, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const releaseDates = async (id: number) => {
  try {
    const response = await ReleaseDates(id)
    return response.data.results
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const movieWatchProviders = async (id: number) => {
  try {
    const response = await MovieWatchProviders(id)
    return response.data.results
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const movieTrailer = async (id: number, language: string) => {
  try {
    const response = await MovieTrailer(id, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const nowPlaying = async (page: number, language: string) => {
  try {
    const response = await NowPlaying(page, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const topRated = async (page: number, language: string) => {
  try {
    const response = await TopRated(page, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const trending = async (page: number, language: string) => {
  try {
    const response = await Trending(page, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const upcoming = async (page: number, language: string) => {
  try {
    const response = await Upcoming(page, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export {
  movieDetails,
  movieCrew,
  releaseDates,
  movieWatchProviders,
  movieTrailer,
  nowPlaying,
  topRated,
  trending,
  upcoming,
}
