import { SearchArticles, GetOneArticle } from "../../../../services/articles"
import { AppThunk } from "../../../../store"

export const SEARCH_ARTICLES_REQUEST = "SEARCH_ARTICLES_REQUEST"
export const SEARCH_ARTICLES_SUCCESS = "SEARCH_ARTICLES_SUCCESS"
export const SEARCH_ARTICLES_FAILURE = "SEARCH_ARTICLES_FAILURE"
export const RESET_SEARCH_ARTICLES = "RESET_SEARCH_ARTICLES"

export const GET_ONE_ARTICLE_REQUEST = "GET_ONE_ARTICLE_REQUEST"
export const GET_ONE_ARTICLE_SUCCESS = "GET_ONE_ARTICLE_SUCCESS"
export const GET_ONE_ARTICLE_FAILURE = "GET_ONE_ARTICLE_FAILURE"

interface SearchArticlesRequestAction {
  type: typeof SEARCH_ARTICLES_REQUEST
}

interface SearchArticlesSuccessAction {
  type: typeof SEARCH_ARTICLES_SUCCESS
  payload: any
}

interface SearchArticlesFailureAction {
  type: typeof SEARCH_ARTICLES_FAILURE
  payload: string
}

interface ResetSearchArticlesAction {
  type: typeof RESET_SEARCH_ARTICLES
}

interface GetOneArticleRequestAction {
  type: typeof GET_ONE_ARTICLE_REQUEST
}

interface GetOneArticleSuccessAction {
  type: typeof GET_ONE_ARTICLE_SUCCESS
  payload: any
}

interface GetOneArticleFailureAction {
  type: typeof GET_ONE_ARTICLE_FAILURE
  payload: string
}

type ArticleActionTypes =
  | SearchArticlesRequestAction
  | SearchArticlesSuccessAction
  | SearchArticlesFailureAction
  | ResetSearchArticlesAction
  | GetOneArticleRequestAction
  | GetOneArticleSuccessAction
  | GetOneArticleFailureAction

export const searchArticles =
  (lang: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SEARCH_ARTICLES_REQUEST })
      const response = await SearchArticles(lang)
      dispatch({ type: SEARCH_ARTICLES_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: SEARCH_ARTICLES_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

export const getOneArticle =
  (articleId: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ONE_ARTICLE_REQUEST })
      const response = await GetOneArticle(articleId)
      dispatch({ type: GET_ONE_ARTICLE_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: GET_ONE_ARTICLE_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

export const resetSearchArticles = (): ResetSearchArticlesAction => ({
  type: RESET_SEARCH_ARTICLES,
})

export type { ArticleActionTypes }
