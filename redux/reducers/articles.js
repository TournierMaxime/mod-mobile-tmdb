const initialState = {
  data: {},
  loading: false,
  error: null,
}

const searchArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_ARTICLES_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "SEARCH_ARTICLES_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "SEARCH_ARTICLES_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case "RESET_SEARCH_ARTICLES":
      return initialState
    default:
      return state
  }
}

const oneArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ONE_ARTICLE_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "GET_ONE_ARTICLE_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "GET_ONE_ARTICLE_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export { searchArticlesReducer, oneArticleReducer }
