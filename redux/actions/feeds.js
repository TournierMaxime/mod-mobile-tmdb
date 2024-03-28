/* import { SearchFeeds } from "../../../../services/feeds"

const searchFeeds = () => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_FEEDS_REQUEST" })
    const response = await SearchFeeds()
    dispatch({ type: "SEARCH_FEEDS_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "SEARCH_FEEDS_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

const resetSearchFeeds = () => ({
  type: "RESET_SEARCH_FEEDS",
})

export { searchFeeds, resetSearchFeeds }
 */
