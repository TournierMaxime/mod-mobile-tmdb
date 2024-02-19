const initialState = {
  data: {
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
  paginationData: {
    results: [],
    page: null,
    total_pages: null,
    loading: false,
    error: null,
  },
  seasonWatchProviders: [],
  loading: false,
  error: null,
}

const serieRecommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERIE_RECOMMENDATION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SERIE_RECOMMENDATION_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SERIE_RECOMMENDATION_FAILURE':
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

const seasonDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEASON_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEASON_DETAILS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SEASON_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_SEASON_DETAILS':
      return initialState
    default:
      return state
  }
}

const serieDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERIE_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SERIE_DETAILS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SERIE_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_SERIE_DETAILS':
      return initialState
    default:
      return state
  }
}

const onTheAirReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_THE_AIR_REQUEST':
      if (action.target === 'onTheAir') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === 'onTheAirPagination') {
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
    case 'ON_THE_AIR_SUCCESS':
      if (action.target === 'onTheAir') {
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
      } else if (action.target === 'onTheAirPagination') {
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
    case 'ON_THE_AIR_FAILURE':
      if (action.target === 'onTheAir') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === 'onTheAirPagination') {
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
    case 'RESET_ON_THE_AIR':
      return initialState
    default:
      return state
  }
}

const popularReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POPULAR_REQUEST':
      if (action.target === 'popular') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === 'popularPagination') {
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
    case 'POPULAR_SUCCESS':
      if (action.target === 'popular') {
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
      } else if (action.target === 'popularPagination') {
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
    case 'POPULAR_FAILURE':
      if (action.target === 'popular') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === 'popularPagination') {
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
    case 'RESET_POPULAR':
      return initialState
    default:
      return state
  }
}

const seasonWatchProvidersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEASON_WATCH_PROVIDERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEASON_WATCH_PROVIDERS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SEASON_WATCH_PROVIDERS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'UPDATE_SEASON_WATCH_PROVIDERS':
      return {
        ...state,
        seasonWatchProviders: state.seasonWatchProviders.concat({
          seasonNumber: action.payload.seasonNumber,
          watchProviders: action.payload.watchProviders,
        }),
      }
    case 'RESET_SEASON_WATCH_PROVIDERS':
      return initialState
    default:
      return state
  }
}

const serieCrewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERIE_CREW_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SERIE_CREW_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SERIE_CREW_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_SERIE_CREW':
      return initialState
    default:
      return state
  }
}

const serieTrailerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERIE_TRAILER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SERIE_TRAILER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SERIE_TRAILER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

const trendingTVReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRENDING_TV_REQUEST':
      if (action.target === 'trendingTV') {
        return {
          ...state,
          data: {
            ...state.data,
            loading: true,
            error: null,
          },
        }
      } else if (action.target === 'trendingPaginationTV') {
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
    case 'TRENDING_TV_SUCCESS':
      if (action.target === 'trendingTV') {
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
      } else if (action.target === 'trendingPaginationTV') {
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
    case 'TRENDING_TV_FAILURE':
      if (action.target === 'trendingTV') {
        return {
          ...state,
          data: {
            ...state.data,
            error: action.payload,
            loading: false,
          },
        }
      } else if (action.target === 'trendingPaginationTV') {
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
    case 'RESET_TRENDING_TV':
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
  serieRecommendationReducer
}
