import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  RESET_SEARCH,
  SearchActionTypes,
} from "../actions/search"

interface SearchState {
  data: {
    page: number
    results: []
    total_pages: number
    total_results: number
  }
  loading: boolean
  error: string | null
}

const initialState: SearchState = {
  data: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  loading: false,
  error: null,
}

export default function searchReducer(
  state = initialState,
  action: SearchActionTypes,
): SearchState {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET_SEARCH:
      return initialState
    default:
      return state
  }
}
