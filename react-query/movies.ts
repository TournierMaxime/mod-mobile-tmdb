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
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const movieCrew = async (id: number, language: string) => {
  try {
    const response = await MovieCrew(id, language)
    return response.data
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const releaseDates = async (id: number) => {
  try {
    const response = await ReleaseDates(id)
    return response.data.results
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const movieWatchProviders = async (id: number) => {
  try {
    const response = await MovieWatchProviders(id)
    return response.data.results
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const movieTrailer = async (id: number, language: string) => {
  try {
    const response = await MovieTrailer(id, language)
    return response.data
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const nowPlaying = async (page: number, language: string) => {
  try {
    const response = await NowPlaying(page, language)
    return response.data
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const topRated = async (page: number, language: string) => {
  try {
    const response = await TopRated(page, language)
    return response.data
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const trending = async (page: number, language: string) => {
  try {
    const response = await Trending(page, language)
    return response.data
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const upcoming = async (page: number, language: string) => {
  try {
    const response = await Upcoming(page, language)
    return response.data
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
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
