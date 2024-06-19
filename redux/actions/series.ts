import {
  SeasonDetails,
  SerieDetails,
  OnTheAir,
  Popular,
  SeasonWatchProviders,
  SerieCrew,
  SerieTrailer,
  TrendingTV,
  RecommendationSerie,
} from "../../../../services/tmdb"
import { AppThunk } from "store"

export const SERIE_RECOMMENDATION_REQUEST = "SERIE_RECOMMENDATION_REQUEST"
export const SERIE_RECOMMENDATION_SUCCESS = "SERIE_RECOMMENDATION_SUCCESS"
export const SERIE_RECOMMENDATION_FAILURE = "SERIE_RECOMMENDATION_FAILURE"

interface SerieRecommendationRequestAction {
  type: typeof SERIE_RECOMMENDATION_REQUEST
}

interface SerieRecommendationSuccessAction {
  type: typeof SERIE_RECOMMENDATION_SUCCESS
  payload: any
}

interface SerieRecommendationFailureAction {
  type: typeof SERIE_RECOMMENDATION_FAILURE
  payload: string
}

// Season Details
export const SEASON_DETAILS_REQUEST = "SEASON_DETAILS_REQUEST"
export const SEASON_DETAILS_SUCCESS = "SEASON_DETAILS_SUCCESS"
export const SEASON_DETAILS_FAILURE = "SEASON_DETAILS_FAILURE"

interface SeasonDetailsRequestAction {
  type: typeof SEASON_DETAILS_REQUEST
}

interface SeasonDetailsSuccessAction {
  type: typeof SEASON_DETAILS_SUCCESS
  payload: any
}

interface SeasonDetailsFailureAction {
  type: typeof SEASON_DETAILS_FAILURE
  payload: string
}

// Serie Details
export const SERIE_DETAILS_REQUEST = "SERIE_DETAILS_REQUEST"
export const SERIE_DETAILS_SUCCESS = "SERIE_DETAILS_SUCCESS"
export const SERIE_DETAILS_FAILURE = "SERIE_DETAILS_FAILURE"

interface SerieDetailsRequestAction {
  type: typeof SERIE_DETAILS_REQUEST
}

interface SerieDetailsSuccessAction {
  type: typeof SERIE_DETAILS_SUCCESS
  payload: any
}

interface SerieDetailsFailureAction {
  type: typeof SERIE_DETAILS_FAILURE
  payload: string
}

// On The Air
export const ON_THE_AIR_REQUEST = "ON_THE_AIR_REQUEST"
export const ON_THE_AIR_SUCCESS = "ON_THE_AIR_SUCCESS"
export const ON_THE_AIR_FAILURE = "ON_THE_AIR_FAILURE"

interface OnTheAirRequestAction {
  type: typeof ON_THE_AIR_REQUEST
  target: string
}

interface OnTheAirSuccessAction {
  type: typeof ON_THE_AIR_SUCCESS
  payload: any
  target: string
}

interface OnTheAirFailureAction {
  type: typeof ON_THE_AIR_FAILURE
  payload: string
  target: string
}

// Popular
export const POPULAR_REQUEST = "POPULAR_REQUEST"
export const POPULAR_SUCCESS = "POPULAR_SUCCESS"
export const POPULAR_FAILURE = "POPULAR_FAILURE"

interface PopularRequestAction {
  type: typeof POPULAR_REQUEST
  target: string
}

interface PopularSuccessAction {
  type: typeof POPULAR_SUCCESS
  payload: any
  target: string
}

interface PopularFailureAction {
  type: typeof POPULAR_FAILURE
  payload: string
  target: string
}

// Season Watch Providers
export const SEASON_WATCH_PROVIDERS_REQUEST = "SEASON_WATCH_PROVIDERS_REQUEST"
export const SEASON_WATCH_PROVIDERS_SUCCESS = "SEASON_WATCH_PROVIDERS_SUCCESS"
export const SEASON_WATCH_PROVIDERS_FAILURE = "SEASON_WATCH_PROVIDERS_FAILURE"
export const UPDATE_SEASON_WATCH_REQUEST = "UPDATE_SEASON_WATCH_REQUEST"
export const UPDATE_SEASON_WATCH_PROVIDERS = "UPDATE_SEASON_WATCH_PROVIDERS"

interface SeasonWatchProvidersRequestAction {
  type: typeof SEASON_WATCH_PROVIDERS_REQUEST
}

interface SeasonWatchProvidersSuccessAction {
  type: typeof SEASON_WATCH_PROVIDERS_SUCCESS
  payload: any
}

interface SeasonWatchProvidersFailureAction {
  type: typeof SEASON_WATCH_PROVIDERS_FAILURE
  payload: string
}

interface UpdateSeasonWatchRequestAction {
  type: typeof UPDATE_SEASON_WATCH_REQUEST
}

interface UpdateSeasonWatchProvidersAction {
  type: typeof UPDATE_SEASON_WATCH_PROVIDERS
  payload: {
    seasonNumber: number
    watchProviders: any
  }
}

// Serie Crew
export const SERIE_CREW_REQUEST = "SERIE_CREW_REQUEST"
export const SERIE_CREW_SUCCESS = "SERIE_CREW_SUCCESS"
export const SERIE_CREW_FAILURE = "SERIE_CREW_FAILURE"

interface SerieCrewRequestAction {
  type: typeof SERIE_CREW_REQUEST
}

interface SerieCrewSuccessAction {
  type: typeof SERIE_CREW_SUCCESS
  payload: any
}

interface SerieCrewFailureAction {
  type: typeof SERIE_CREW_FAILURE
  payload: string
}

// Serie Trailer
export const SERIE_TRAILER_REQUEST = "SERIE_TRAILER_REQUEST"
export const SERIE_TRAILER_SUCCESS = "SERIE_TRAILER_SUCCESS"
export const SERIE_TRAILER_FAILURE = "SERIE_TRAILER_FAILURE"

interface SerieTrailerRequestAction {
  type: typeof SERIE_TRAILER_REQUEST
}

interface SerieTrailerSuccessAction {
  type: typeof SERIE_TRAILER_SUCCESS
  payload: any
}

interface SerieTrailerFailureAction {
  type: typeof SERIE_TRAILER_FAILURE
  payload: string
}

// Trending TV
export const TRENDING_TV_REQUEST = "TRENDING_TV_REQUEST"
export const TRENDING_TV_SUCCESS = "TRENDING_TV_SUCCESS"
export const TRENDING_TV_FAILURE = "TRENDING_TV_FAILURE"

interface TrendingTVRequestAction {
  type: typeof TRENDING_TV_REQUEST
  target: string
}

interface TrendingTVSuccessAction {
  type: typeof TRENDING_TV_SUCCESS
  payload: any
  target: string
}

interface TrendingTVFailureAction {
  type: typeof TRENDING_TV_FAILURE
  payload: string
  target: string
}

export const RESET = "RESET"

interface ResetAction {
  type: typeof RESET
}

type SerieActionTypes =
  | SerieRecommendationRequestAction
  | SerieRecommendationSuccessAction
  | SerieRecommendationFailureAction
  | SeasonDetailsRequestAction
  | SeasonDetailsSuccessAction
  | SeasonDetailsFailureAction
  | SerieDetailsRequestAction
  | SerieDetailsSuccessAction
  | SerieDetailsFailureAction
  | OnTheAirRequestAction
  | OnTheAirSuccessAction
  | OnTheAirFailureAction
  | PopularRequestAction
  | PopularSuccessAction
  | PopularFailureAction
  | SeasonWatchProvidersRequestAction
  | SeasonWatchProvidersSuccessAction
  | SeasonWatchProvidersFailureAction
  | UpdateSeasonWatchRequestAction
  | UpdateSeasonWatchProvidersAction
  | SerieCrewRequestAction
  | SerieCrewSuccessAction
  | SerieCrewFailureAction
  | SerieTrailerRequestAction
  | SerieTrailerSuccessAction
  | SerieTrailerFailureAction
  | TrendingTVRequestAction
  | TrendingTVSuccessAction
  | TrendingTVFailureAction
  | ResetAction

const serieRecommendation =
  (id: number): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SERIE_RECOMMENDATION_REQUEST })
      const response = await RecommendationSerie(id)
      dispatch({
        type: SERIE_RECOMMENDATION_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: SERIE_RECOMMENDATION_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const seasonDetails =
  (
    id: number,
    seasonNumber: number,
    language: string,
  ): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SEASON_DETAILS_REQUEST })
      const response = await SeasonDetails(id, seasonNumber, language)
      dispatch({ type: SEASON_DETAILS_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: SEASON_DETAILS_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const serieDetails =
  (id: number, language: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SERIE_DETAILS_REQUEST })
      const response = await SerieDetails(id, language)
      dispatch({ type: SERIE_DETAILS_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: SERIE_DETAILS_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const onTheAir =
  (
    page: number,
    target = "onTheAir",
    language: string,
  ): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: ON_THE_AIR_REQUEST, target })
      const response = await OnTheAir(page, language)
      dispatch({ type: ON_THE_AIR_SUCCESS, payload: response.data, target })
      return response.data
    } catch (error: any) {
      dispatch({ type: ON_THE_AIR_FAILURE, payload: error.message, target })
      throw error
    }
  }

const popular =
  (
    page: number,
    target = "popular",
    language: string,
  ): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: POPULAR_REQUEST, target })
      const response = await Popular(page, language)
      dispatch({ type: POPULAR_SUCCESS, payload: response.data, target })
      return response.data
    } catch (error: any) {
      dispatch({ type: POPULAR_FAILURE, payload: error.message, target })
      throw error
    }
  }

const seasonWatchProviders =
  (id: number, seasonNumber: number): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SEASON_WATCH_PROVIDERS_REQUEST })
      const response = await SeasonWatchProviders(id, seasonNumber)
      dispatch({
        type: SEASON_WATCH_PROVIDERS_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: SEASON_WATCH_PROVIDERS_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const updateSeasonWatchProviders =
  (id: number, seasonNumber: number): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SEASON_WATCH_REQUEST })
      const response = await SeasonWatchProviders(id, seasonNumber)
      dispatch({
        type: UPDATE_SEASON_WATCH_PROVIDERS,
        payload: {
          seasonNumber,
          watchProviders: response.data,
        },
      })
    } catch (error: any) {
      dispatch({
        type: SEASON_WATCH_PROVIDERS_FAILURE,
        payload: error.message,
      })
      throw error
    }
  }

const serieCrew =
  (id: number, language: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SERIE_CREW_REQUEST })
      const response = await SerieCrew(id, language)
      dispatch({ type: SERIE_CREW_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: SERIE_CREW_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const serieTrailer =
  (id: number, language: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SERIE_TRAILER_REQUEST })
      const response = await SerieTrailer(id, language)
      dispatch({ type: SERIE_TRAILER_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: SERIE_TRAILER_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const trendingTV =
  (
    page: number,
    target = "trendingTV",
    language: string,
  ): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: TRENDING_TV_REQUEST, target })
      const response = await TrendingTV(page, language)
      dispatch({ type: TRENDING_TV_SUCCESS, payload: response.data, target })
      return response.data
    } catch (error: any) {
      dispatch({ type: TRENDING_TV_FAILURE, payload: error.message, target })
      throw error
    }
  }

const reset = () => ({
  type: RESET,
})

export {
  seasonDetails,
  serieDetails,
  onTheAir,
  popular,
  seasonWatchProviders,
  updateSeasonWatchProviders,
  serieCrew,
  serieTrailer,
  trendingTV,
  serieRecommendation,
  reset,
}

export type { SerieActionTypes }
