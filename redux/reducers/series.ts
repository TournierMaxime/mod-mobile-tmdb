import {
  SEASON_DETAILS_FAILURE,
  SEASON_DETAILS_REQUEST,
  SEASON_DETAILS_SUCCESS,
  SEASON_WATCH_PROVIDERS_FAILURE,
  SEASON_WATCH_PROVIDERS_REQUEST,
  SEASON_WATCH_PROVIDERS_SUCCESS,
  SERIE_CREW_FAILURE,
  SERIE_CREW_REQUEST,
  SERIE_CREW_SUCCESS,
  SERIE_DETAILS_FAILURE,
  SERIE_DETAILS_REQUEST,
  SERIE_DETAILS_SUCCESS,
  SERIE_RECOMMENDATION_FAILURE,
  SERIE_RECOMMENDATION_REQUEST,
  SERIE_RECOMMENDATION_SUCCESS,
  SERIE_TRAILER_FAILURE,
  SERIE_TRAILER_REQUEST,
  SERIE_TRAILER_SUCCESS,
  ON_THE_AIR_FAILURE,
  ON_THE_AIR_REQUEST,
  ON_THE_AIR_SUCCESS,
  POPULAR_FAILURE,
  POPULAR_REQUEST,
  POPULAR_SUCCESS,
  TRENDING_TV_FAILURE,
  TRENDING_TV_REQUEST,
  TRENDING_TV_SUCCESS,
  UPDATE_SEASON_WATCH_PROVIDERS,
  UPDATE_SEASON_WATCH_REQUEST,
  RESET,
  SerieActionTypes,
} from "../actions/series"

interface SerieState {
  data: {
    results: []
    episodes: any[]
    page: number | null
    total_pages: number | null
    loading: boolean
    error: string | null
  }
  paginationData: {
    results: []
    episodes: any[]
    page: number | null
    total_pages: number | null
    loading: boolean
    error: string | null
  }
  seasonWatchProviders: any[]
  loading: boolean
  error: string | null
}

const initialState: SerieState = {
  data: {
    results: [],
    episodes: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
  paginationData: {
    results: [],
    episodes: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
  seasonWatchProviders: [],
  loading: false,
  error: null,
}

const serieRecommendationReducer = (
  state = initialState,
  action: SerieActionTypes,
): SerieState => {
  switch (action.type) {
    case SERIE_RECOMMENDATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SERIE_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case SERIE_RECOMMENDATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

const seasonDetailsReducer = (
  state = initialState,
  action: SerieActionTypes,
): SerieState => {
  switch (action.type) {
    case SEASON_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SEASON_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case SEASON_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

const serieDetailsReducer = (
  state = initialState,
  action: SerieActionTypes,
): SerieState => {
  switch (action.type) {
    case SERIE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SERIE_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case SERIE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

const onTheAirReducer = (
  state = initialState,
  action: SerieActionTypes,
): SerieState => {
  switch (action.type) {
    case ON_THE_AIR_REQUEST:
      if (action.target === "onTheAir") {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === "onTheAirPagination") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            loading: true,
            error: null,
          },
        }
      }
      return state
    case ON_THE_AIR_SUCCESS:
      if (action.target === "onTheAir") {
        return {
          ...state,
          data: {
            ...state.data,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      } else if (action.target === "onTheAirPagination") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      }
      return state
    case ON_THE_AIR_FAILURE:
      if (action.target === "onTheAir") {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === "onTheAirPagination") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            error: action.payload,
            loading: false,
          },
        }
      }
      return state
    case RESET:
      return initialState
    default:
      return state
  }
}

const popularReducer = (
  state = initialState,
  action: SerieActionTypes,
): SerieState => {
  switch (action.type) {
    case POPULAR_REQUEST:
      if (action.target === "popular") {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === "popularPagination") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            loading: true,
            error: null,
          },
        }
      }
      return state
    case POPULAR_SUCCESS:
      if (action.target === "popular") {
        return {
          ...state,
          data: {
            ...state.data,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      } else if (action.target === "popularPagination") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      }
      return state
    case POPULAR_FAILURE:
      if (action.target === "popular") {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === "popularPagination") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            error: action.payload,
            loading: false,
          },
        }
      }
      return state
    case RESET:
      return initialState
    default:
      return state
  }
}

const seasonWatchProvidersReducer = (
  state = initialState,
  action: SerieActionTypes,
): SerieState => {
  switch (action.type) {
    case SEASON_WATCH_PROVIDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SEASON_WATCH_PROVIDERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case SEASON_WATCH_PROVIDERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case UPDATE_SEASON_WATCH_PROVIDERS:
      return {
        ...state,
        seasonWatchProviders: state.seasonWatchProviders.concat({
          seasonNumber: action.payload.seasonNumber,
          watchProviders: action.payload.watchProviders,
        }),
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

const serieCrewReducer = (
  state = initialState,
  action: SerieActionTypes,
): SerieState => {
  switch (action.type) {
    case SERIE_CREW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SERIE_CREW_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case SERIE_CREW_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

const serieTrailerReducer = (
  state = initialState,
  action: SerieActionTypes,
): SerieState => {
  switch (action.type) {
    case SERIE_TRAILER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SERIE_TRAILER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case SERIE_TRAILER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

const trendingTVReducer = (
  state = initialState,
  action: SerieActionTypes,
): SerieState => {
  switch (action.type) {
    case TRENDING_TV_REQUEST:
      if (action.target === "trendingTV") {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === "trendingPaginationTV") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            loading: true,
            error: null,
          },
        }
      }
      return state
    case TRENDING_TV_SUCCESS:
      if (action.target === "trendingTV") {
        return {
          ...state,
          data: {
            ...state.data,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      } else if (action.target === "trendingPaginationTV") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      }
      return state
    case TRENDING_TV_FAILURE:
      if (action.target === "trendingTV") {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === "trendingPaginationTV") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            error: action.payload,
            loading: false,
          },
        }
      }
      return state
    case RESET:
      return initialState
    default:
      return state
  }
}

export {
  seasonDetailsReducer,
  serieDetailsReducer,
  onTheAirReducer,
  popularReducer,
  seasonWatchProvidersReducer,
  serieCrewReducer,
  serieTrailerReducer,
  trendingTVReducer,
  serieRecommendationReducer,
}
