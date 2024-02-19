const initialState = {
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

const movieRecommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIE_RECOMMENDATION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'MOVIE_RECOMMENDATION_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'MOVIE_RECOMMENDATION_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_RECOMMENDATION':
      return initialState
    default:
      return state
  }
}

const movideDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIE_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'MOVIE_DETAILS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'MOVIE_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_MOVIE_DETAILS':
      return initialState
    default:
      return state
  }
}

const movieCrewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIE_CREW_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'MOVIE_CREW_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'MOVIE_CREW_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_MOVIE_CREW':
      return initialState
    default:
      return state
  }
}

const movieWatchProvidersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIE_WATCH_PROVIDERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'MOVIE_WATCH_PROVIDERS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'MOVIE_WATCH_PROVIDERS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_MOVIE_WATCH_PROVIDERS':
      return initialState
    default:
      return state
  }
}

const nowPlayingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOW_PLAYING_REQUEST':
      if (action.target === 'nowPlaying') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === 'nowPlayingPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            loading: true,
            error: null,
          },
        }
      }
      break
    case 'NOW_PLAYING_SUCCESS':
      if (action.target === 'nowPlaying') {
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
      } else if (action.target === 'nowPlayingPagination') {
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
      break
    case 'NOW_PLAYING_FAILURE':
      if (action.target === 'nowPlaying') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === 'nowPlayingPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            error: action.payload,
            loading: false,
          },
        }
      }
      break
    case 'RESET_NOW_PLAYING':
      return initialState
    default:
      return state
  }
}

const releaseDatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RELEASE_DATES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'RELEASE_DATES_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'RELEASE_DATES_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_RELEASE_DATES':
      return initialState
    default:
      return state
  }
}

const movieTrailerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIE_TRAILER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'MOVIE_TRAILER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'MOVIE_TRAILER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

const trendingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRENDING_REQUEST':
      if (action.target === 'trending') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === 'trendingPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            loading: true,
            error: null,
          },
        }
      }
      break
    case 'TRENDING_SUCCESS':
      if (action.target === 'trending') {
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
      } else if (action.target === 'trendingPagination') {
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
      break
    case 'TRENDING_FAILURE':
      if (action.target === 'trending') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === 'trendingPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            error: action.payload,
            loading: false,
          },
        }
      }
      break
    case 'RESET_TRENDING':
      return initialState
    default:
      return state
  }
}

const upcomingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPCOMING_REQUEST':
      if (action.target === 'upcoming') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === 'upcomingPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            loading: true,
            error: null,
          },
        }
      }
      break
    case 'UPCOMING_SUCCESS':
      if (action.target === 'upcoming') {
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
      } else if (action.target === 'upcomingPagination') {
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
      break
    case 'UPCOMING_FAILURE':
      if (action.target === 'upcoming') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === 'upcomingPagination') {
        return {
          ...state,
          paginationData: {
            ...state.paginationData,
            error: action.payload,
            loading: false,
          },
        }
      }
      break
    case 'RESET_UPCOMING':
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
  movieRecommendationReducer
}
