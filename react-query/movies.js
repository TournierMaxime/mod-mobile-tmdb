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

const movieDetails = async (id, language) => {
  try {
    const response = await MovieDetails(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const movieCrew = async (id, language) => {
  try {
    const response = await MovieCrew(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const releaseDates = async (id) => {
  try {
    const response = await ReleaseDates(id)
    return response.data.results
  } catch (error) {
    console.log(error)
    throw error
  }
}

const movieWatchProviders = async (id) => {
  try {
    const response = await MovieWatchProviders(id)
    return response.data.results
  } catch (error) {
    console.log(error)
    throw error
  }
}

const movieTrailer = async (id, language) => {
  try {
    const response = await MovieTrailer(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const nowPlaying = async (page, language) => {
  try {
    const response = await NowPlaying(page, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const topRated = async (page, language) => {
  try {
    const response = await TopRated(page, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const trending = async (page, language) => {
  try {
    const response = await Trending(page, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const upcoming = async (page, language) => {
  try {
    const response = await Upcoming(page, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
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
