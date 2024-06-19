import {
  MovieDetails,
  MovieCrew,
  MovieWatchProviders,
  NowPlaying,
  ReleaseDates,
  MovieTrailer,
  Trending,
  Upcoming,
  RecommendationMovie,
  TopRated,
} from "../../../../services/tmdb"
import { AppThunk } from "store"

export const MOVIE_RECOMMENDATION_REQUEST = "MOVIE_RECOMMENDATION_REQUEST"
export const MOVIE_RECOMMENDATION_SUCCESS = "MOVIE_RECOMMENDATION_SUCCESS"
export const MOVIE_RECOMMENDATION_FAILURE = "MOVIE_RECOMMENDATION_FAILURE"

export const MOVIE_DETAILS_REQUEST = "MOVIE_DETAILS_REQUEST"
export const MOVIE_DETAILS_SUCCESS = "MOVIE_DETAILS_SUCCESS"
export const MOVIE_DETAILS_FAILURE = "MOVIE_DETAILS_FAILURE"

export const MOVIE_CREW_REQUEST = "MOVIE_CREW_REQUEST"
export const MOVIE_CREW_SUCCESS = "MOVIE_CREW_SUCCESS"
export const MOVIE_CREW_FAILURE = "MOVIE_CREW_FAILURE"

export const MOVIE_WATCH_PROVIDERS_REQUEST = "MOVIE_WATCH_PROVIDERS_REQUEST"
export const MOVIE_WATCH_PROVIDERS_SUCCESS = "MOVIE_WATCH_PROVIDERS_SUCCESS"
export const MOVIE_WATCH_PROVIDERS_FAILURE = "MOVIE_WATCH_PROVIDERS_FAILURE"

export const NOW_PLAYING_REQUEST = "NOW_PLAYING_REQUEST"
export const NOW_PLAYING_SUCCESS = "NOW_PLAYING_SUCCESS"
export const NOW_PLAYING_FAILURE = "NOW_PLAYING_FAILURE"

export const TOP_RATED_REQUEST = "TOP_RATED_REQUEST"
export const TOP_RATED_SUCCESS = "TOP_RATED_SUCCESS"
export const TOP_RATED_FAILURE = "TOP_RATED_FAILURE"

export const RELEASE_DATES_REQUEST = "RELEASE_DATES_REQUEST"
export const RELEASE_DATES_SUCCESS = "RELEASE_DATES_SUCCESS"
export const RELEASE_DATES_FAILURE = "RELEASE_DATES_FAILURE"

export const MOVIE_TRAILER_REQUEST = "MOVIE_TRAILER_REQUEST"
export const MOVIE_TRAILER_SUCCESS = "MOVIE_TRAILER_SUCCESS"
export const MOVIE_TRAILER_FAILURE = "MOVIE_TRAILER_FAILURE"

export const TRENDING_REQUEST = "TRENDING_REQUEST"
export const TRENDING_SUCCESS = "TRENDING_SUCCESS"
export const TRENDING_FAILURE = "TRENDING_FAILURE"

export const UPCOMING_REQUEST = "UPCOMING_REQUEST"
export const UPCOMING_SUCCESS = "UPCOMING_SUCCESS"
export const UPCOMING_FAILURE = "UPCOMING_FAILURE"

export const RESET = "RESET"

interface MovieRecommendationRequestAction {
  type: typeof MOVIE_RECOMMENDATION_REQUEST
}

interface MovieRecommendationSuccessAction {
  type: typeof MOVIE_RECOMMENDATION_SUCCESS
  payload: any
}

interface MovieRecommendationFailureAction {
  type: typeof MOVIE_RECOMMENDATION_FAILURE
  payload: string
}

// Action Interfaces
interface MovieDetailsRequestAction {
  type: typeof MOVIE_DETAILS_REQUEST
}
interface MovieDetailsSuccessAction {
  type: typeof MOVIE_DETAILS_SUCCESS
  payload: any
}
interface MovieDetailsFailureAction {
  type: typeof MOVIE_DETAILS_FAILURE
  payload: string
}

interface MovieCrewRequestAction {
  type: typeof MOVIE_CREW_REQUEST
}
interface MovieCrewSuccessAction {
  type: typeof MOVIE_CREW_SUCCESS
  payload: any
}
interface MovieCrewFailureAction {
  type: typeof MOVIE_CREW_FAILURE
  payload: string
}

interface MovieWatchProvidersRequestAction {
  type: typeof MOVIE_WATCH_PROVIDERS_REQUEST
}
interface MovieWatchProvidersSuccessAction {
  type: typeof MOVIE_WATCH_PROVIDERS_SUCCESS
  payload: any
}
interface MovieWatchProvidersFailureAction {
  type: typeof MOVIE_WATCH_PROVIDERS_FAILURE
  payload: string
}

interface NowPlayingRequestAction {
  type: typeof NOW_PLAYING_REQUEST
  target: string
}
interface NowPlayingSuccessAction {
  type: typeof NOW_PLAYING_SUCCESS
  payload: any
  target: string
}
interface NowPlayingFailureAction {
  type: typeof NOW_PLAYING_FAILURE
  payload: string
  target: string
}

interface TopRatedRequestAction {
  type: typeof TOP_RATED_REQUEST
  target: string
}
interface TopRatedSuccessAction {
  type: typeof TOP_RATED_SUCCESS
  payload: any
  target: string
}
interface TopRatedFailureAction {
  type: typeof TOP_RATED_FAILURE
  payload: string
  target: string
}

interface ReleaseDatesRequestAction {
  type: typeof RELEASE_DATES_REQUEST
}
interface ReleaseDatesSuccessAction {
  type: typeof RELEASE_DATES_SUCCESS
  payload: any
}
interface ReleaseDatesFailureAction {
  type: typeof RELEASE_DATES_FAILURE
  payload: string
}

interface MovieTrailerRequestAction {
  type: typeof MOVIE_TRAILER_REQUEST
}
interface MovieTrailerSuccessAction {
  type: typeof MOVIE_TRAILER_SUCCESS
  payload: any
}
interface MovieTrailerFailureAction {
  type: typeof MOVIE_TRAILER_FAILURE
  payload: string
}

interface TrendingRequestAction {
  type: typeof TRENDING_REQUEST
  target: string
}
interface TrendingSuccessAction {
  type: typeof TRENDING_SUCCESS
  payload: any
  target: string
}
interface TrendingFailureAction {
  type: typeof TRENDING_FAILURE
  payload: string
  target: string
}

interface UpcomingRequestAction {
  type: typeof UPCOMING_REQUEST
  target: string
}
interface UpcomingSuccessAction {
  type: typeof UPCOMING_SUCCESS
  payload: any
  target: string
}
interface UpcomingFailureAction {
  type: typeof UPCOMING_FAILURE
  payload: string
  target: string
}

interface ResetAction {
  type: typeof RESET
}

type MovieActionTypes =
  | MovieRecommendationRequestAction
  | MovieRecommendationSuccessAction
  | MovieRecommendationFailureAction
  | MovieDetailsRequestAction
  | MovieDetailsSuccessAction
  | MovieDetailsFailureAction
  | MovieCrewRequestAction
  | MovieCrewSuccessAction
  | MovieCrewFailureAction
  | MovieWatchProvidersRequestAction
  | MovieWatchProvidersSuccessAction
  | MovieWatchProvidersFailureAction
  | NowPlayingRequestAction
  | NowPlayingSuccessAction
  | NowPlayingFailureAction
  | TopRatedRequestAction
  | TopRatedSuccessAction
  | TopRatedFailureAction
  | ReleaseDatesRequestAction
  | ReleaseDatesSuccessAction
  | ReleaseDatesFailureAction
  | MovieTrailerRequestAction
  | MovieTrailerSuccessAction
  | MovieTrailerFailureAction
  | TrendingRequestAction
  | TrendingSuccessAction
  | TrendingFailureAction
  | UpcomingRequestAction
  | UpcomingSuccessAction
  | UpcomingFailureAction
  | ResetAction

const movieRecommendation =
  (id: number): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: MOVIE_RECOMMENDATION_REQUEST })
      const response = await RecommendationMovie(id)
      dispatch({
        type: MOVIE_RECOMMENDATION_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: MOVIE_RECOMMENDATION_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const movieDetails =
  (id: number, language: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: MOVIE_DETAILS_REQUEST })
      const response = await MovieDetails(id, language)
      dispatch({
        type: MOVIE_DETAILS_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: MOVIE_DETAILS_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const movieCrew =
  (id: number, language: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: MOVIE_CREW_REQUEST })
      const response = await MovieCrew(id, language)
      dispatch({
        type: MOVIE_CREW_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: MOVIE_CREW_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const movieWatchProviders =
  (id: number): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: MOVIE_WATCH_PROVIDERS_REQUEST })
      const response = await MovieWatchProviders(id)
      dispatch({
        type: MOVIE_WATCH_PROVIDERS_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: MOVIE_WATCH_PROVIDERS_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const nowPlaying =
  (
    page: number,
    target = "nowPlaying",
    language: string,
  ): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: NOW_PLAYING_REQUEST, target })
      const response = await NowPlaying(page, language)
      dispatch({ type: NOW_PLAYING_SUCCESS, payload: response.data, target })
      return response.data
    } catch (error: any) {
      dispatch({ type: NOW_PLAYING_FAILURE, payload: error.message, target })
      throw new Error(error)
    }
  }

const topRated =
  (
    page: number,
    target = "topRated",
    language: string,
  ): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: TOP_RATED_REQUEST, target })
      const response = await TopRated(page, language)
      dispatch({ type: TOP_RATED_SUCCESS, payload: response.data, target })
      return response.data
    } catch (error: any) {
      dispatch({ type: TOP_RATED_FAILURE, payload: error.message, target })
      throw new Error(error)
    }
  }

const releaseDates =
  (id: number): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: RELEASE_DATES_REQUEST })
      const response = await ReleaseDates(id)
      dispatch({ type: RELEASE_DATES_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: RELEASE_DATES_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const movieTrailer =
  (id: number, language: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: MOVIE_TRAILER_REQUEST })
      const response = await MovieTrailer(id, language)
      dispatch({ type: MOVIE_TRAILER_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: MOVIE_TRAILER_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const trending =
  (
    page: number,
    target = "trending",
    language: string,
  ): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: TRENDING_REQUEST, target })
      const response = await Trending(page, language)
      dispatch({ type: TRENDING_SUCCESS, payload: response.data, target })
      return response.data
    } catch (error: any) {
      dispatch({ type: TRENDING_FAILURE, payload: error.message, target })
      throw new Error(error)
    }
  }

const upcoming =
  (
    page: number,
    target = "upcoming",
    language: string,
  ): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: UPCOMING_REQUEST, target })
      const response = await Upcoming(page, language)
      dispatch({ type: UPCOMING_SUCCESS, payload: response.data, target })
      return response.data
    } catch (error: any) {
      dispatch({ type: UPCOMING_FAILURE, payload: error.message, target })
      throw new Error(error)
    }
  }

const reset = () => ({
  type: RESET,
})

export {
  movieDetails,
  movieCrew,
  movieWatchProviders,
  nowPlaying,
  releaseDates,
  movieTrailer,
  trending,
  upcoming,
  movieRecommendation,
  topRated,
  reset,
}

export type { MovieActionTypes }
