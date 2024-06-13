import { SearchArticles, GetOneArticle } from "../../../../services/articles"

const searchArticles = (lang) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_ARTICLES_REQUEST" })
    const response = await SearchArticles(lang)
    dispatch({ type: "SEARCH_ARTICLES_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "SEARCH_ARTICLES_FAILURE", payload: error.message })
    throw new Error(error)
  }
}

const getOneArticle = (articleId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_ONE_ARTICLE_REQUEST" })
    const response = await GetOneArticle(articleId)
    dispatch({ type: "GET_ONE_ARTICLE_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "GET_ONE_ARTICLE_FAILURE", payload: error.message })
    throw new Error(error)
  }
}

const resetSearchArticles = () => ({
  type: "RESET_SEARCH_ARTICLES",
})

export { searchArticles, resetSearchArticles, getOneArticle }
