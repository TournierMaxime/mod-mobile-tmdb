
import { Search } from '../../../../services/tmdb'
  
export const search = (page, query, language) => async (dispatch) => {
  try {
    dispatch({type: 'SEARCH_RESET_REQUEST'})
    const response = await Search(page, query, language)
    dispatch({type: 'SEARCH_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

export const resetSearchModal = () => ({
  type: 'RESET_SEARCH',
})