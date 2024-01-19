const initialState = {
  data: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  loading: false,
  error: null,
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'SEARCH_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'SEARCH_RESET_REQUEST':
      return {
        ...state,
        data: {
          ...state.data,
          results: [],
        },
      }
    case 'RESET_SEARCH':
      return initialState
    default:
      return state
  }
}
