import {
  MOVIE_CREW_FAILURE,
  MOVIE_CREW_REQUEST,
  MOVIE_CREW_SUCCESS,
  MOVIE_DETAILS_FAILURE,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_RECOMMENDATION_FAILURE,
  MOVIE_RECOMMENDATION_REQUEST,
  MOVIE_RECOMMENDATION_SUCCESS,
  MOVIE_TRAILER_FAILURE,
  MOVIE_TRAILER_REQUEST,
  MOVIE_TRAILER_SUCCESS,
  MOVIE_WATCH_PROVIDERS_FAILURE,
  MOVIE_WATCH_PROVIDERS_REQUEST,
  MOVIE_WATCH_PROVIDERS_SUCCESS,
  NOW_PLAYING_FAILURE,
  NOW_PLAYING_REQUEST,
  NOW_PLAYING_SUCCESS,
  UPCOMING_FAILURE,
  UPCOMING_REQUEST,
  UPCOMING_SUCCESS,
  TOP_RATED_FAILURE,
  TOP_RATED_REQUEST,
  TOP_RATED_SUCCESS,
  TRENDING_FAILURE,
  TRENDING_REQUEST,
  TRENDING_SUCCESS,
  RELEASE_DATES_FAILURE,
  RELEASE_DATES_REQUEST,
  RELEASE_DATES_SUCCESS,
  RESET,
  MovieActionTypes,
} from "../actions/movies"

interface MovieState {
  data: {
    dates: Record<string, any>
    results: any[]
    page: number | null
    total_pages: number | null
    loading: boolean
    error: string | null
  }
  paginationData: {
    dates: Record<string, any>
    results: any[]
    page: number | null
    total_pages: number | null
    loading: boolean
    error: string | null
  }
  loading: boolean
  error: string | null
}

const initialState: MovieState = {
  data: {
    dates: {},
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
  paginationData: {
    dates: {},
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
  loading: false,
  error: null,
}

const movieRecommendationReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case MOVIE_RECOMMENDATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case MOVIE_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case MOVIE_RECOMMENDATION_FAILURE:
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

const movideDetailsReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case MOVIE_DETAILS_FAILURE:
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

const movieCrewReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case MOVIE_CREW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case MOVIE_CREW_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case MOVIE_CREW_FAILURE:
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

const movieWatchProvidersReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case MOVIE_WATCH_PROVIDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case MOVIE_WATCH_PROVIDERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case MOVIE_WATCH_PROVIDERS_FAILURE:
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

const nowPlayingReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case NOW_PLAYING_REQUEST:
      if (action.target === "nowPlaying") {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === "nowPlayingPagination") {
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
    case NOW_PLAYING_SUCCESS:
      if (action.target === "nowPlaying") {
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
      } else if (action.target === "nowPlayingPagination") {
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
    case NOW_PLAYING_FAILURE:
      if (action.target === "nowPlaying") {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === "nowPlayingPagination") {
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

const topRatedReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case TOP_RATED_REQUEST:
      if (action.target === "topRated") {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === "topRatedPagination") {
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
    case TOP_RATED_SUCCESS:
      if (action.target === "topRated") {
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
      } else if (action.target === "topRatedPagination") {
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
    case TOP_RATED_FAILURE:
      if (action.target === "topRated") {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === "topRatedPagination") {
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

const releaseDatesReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case RELEASE_DATES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case RELEASE_DATES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case RELEASE_DATES_FAILURE:
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

const movieTrailerReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case MOVIE_TRAILER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case MOVIE_TRAILER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case MOVIE_TRAILER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

const trendingReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case TRENDING_REQUEST:
      if (action.target === "trending") {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === "trendingPagination") {
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
    case TRENDING_SUCCESS:
      if (action.target === "trending") {
        return {
          ...state,
          data: {
            ...state.data,
            dates: action.payload.dates,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      } else if (action.target === "trendingPagination") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            dates: action.payload.dates,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      }
      return state
    case TRENDING_FAILURE:
      if (action.target === "trending") {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === "trendingPagination") {
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

const upcomingReducer = (
  state = initialState,
  action: MovieActionTypes,
): MovieState => {
  switch (action.type) {
    case UPCOMING_REQUEST:
      if (action.target === "upcoming") {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === "upcomingPagination") {
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
    case UPCOMING_SUCCESS:
      if (action.target === "upcoming") {
        return {
          ...state,
          data: {
            ...state.data,
            dates: action.payload.dates,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      } else if (action.target === "upcomingPagination") {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            dates: action.payload.dates,
            results: action.payload.results,
            page: action.payload.page,
            total_pages: action.payload.total_pages,
            loading: false,
          },
        }
      }
      return state
    case UPCOMING_FAILURE:
      if (action.target === "upcoming") {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === "upcomingPagination") {
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
  movideDetailsReducer,
  movieCrewReducer,
  movieWatchProvidersReducer,
  nowPlayingReducer,
  releaseDatesReducer,
  movieTrailerReducer,
  trendingReducer,
  upcomingReducer,
  movieRecommendationReducer,
  topRatedReducer,
}
