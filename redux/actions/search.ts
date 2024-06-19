import { Search } from "../../../../services/tmdb"
import { AppThunk } from "store"

export const SEARCH_REQUEST = "SEARCH_REQUEST"
export const SEARCH_SUCCESS = "SEARCH_SUCCESS"
export const SEARCH_FAILURE = "SEARCH_FAILURE"
export const RESET_SEARCH = "RESET_SEARCH"

interface SearchRequestAction {
  type: typeof SEARCH_REQUEST
}

interface SearchSuccessAction {
  type: typeof SEARCH_SUCCESS
  payload: any
}

interface SearchFailureAction {
  type: typeof SEARCH_FAILURE
  payload: string
}

interface ResetSearchAction {
  type: typeof RESET_SEARCH
}

type SearchActionTypes =
  | SearchRequestAction
  | SearchSuccessAction
  | SearchFailureAction
  | ResetSearchAction

const search =
  (page: number, query: string, language: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SEARCH_REQUEST })
      const response = await Search(page, query, language)
      dispatch({
        type: SEARCH_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: SEARCH_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const resetSearchModal = (): ResetSearchAction => ({
  type: RESET_SEARCH,
})

export { search, resetSearchModal }

export type { SearchActionTypes }
