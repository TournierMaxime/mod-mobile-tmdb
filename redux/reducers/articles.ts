import {
  SEARCH_ARTICLES_REQUEST,
  SEARCH_ARTICLES_SUCCESS,
  SEARCH_ARTICLES_FAILURE,
  RESET_SEARCH_ARTICLES,
  GET_ONE_ARTICLE_REQUEST,
  GET_ONE_ARTICLE_SUCCESS,
  GET_ONE_ARTICLE_FAILURE,
  ArticleActionTypes,
} from "../actions/articles"

interface ArticlesState {
  data: any
  loading: boolean
  error: string | null
}

const initialState: ArticlesState = {
  data: {},
  loading: false,
  error: null,
}

const searchArticlesReducer = (
  state = initialState,
  action: ArticleActionTypes,
): ArticlesState => {
  switch (action.type) {
    case SEARCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SEARCH_ARTICLES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case SEARCH_ARTICLES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET_SEARCH_ARTICLES:
      return initialState
    default:
      return state
  }
}

const oneArticleReducer = (
  state = initialState,
  action: ArticleActionTypes,
): ArticlesState => {
  switch (action.type) {
    case GET_ONE_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ONE_ARTICLE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case GET_ONE_ARTICLE_FAILURE:
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
export type { ArticlesState }
