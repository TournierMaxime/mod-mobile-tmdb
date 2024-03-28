/* const initialState = {
  data: {},
  loading: false,
  error: null,
}

const searchFeedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_FEEDS_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "SEARCH_FEEDS_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "SEARCH_FEEDS_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case "RESET_SEARCH_FEEDS":
      return initialState
    default:
      return state
  }
}

export { searchFeedsReducer }
 */
