import {
  PeopleCareer,
  PeopleDetails,
  PeopleExternalIds,
} from '../../../../services/tmdb'

const peopleCareer = (id, language) => async (dispatch) => {
  try {
    dispatch({type: 'PEOPLE_CAREER_REQUEST'})
    const response = await PeopleCareer(id, language)
    dispatch({ type: 'PEOPLE_CAREER_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'PEOPLE_CAREER_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetPeopleCareer = () => ({
  type: 'RESET_PEOPLE_CAREER',
})

const peopleDetails = (id, language) => async (dispatch) => {
  try {
    dispatch({type: 'PEOPLE_DETAILS_REQUEST'})
    const response = await PeopleDetails(id, language)
    dispatch({ type: 'PEOPLE_DETAILS_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'PEOPLE_DETAILS_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetPeopleDetails = () => ({
  type: 'RESET_PEOPLE_DETAILS',
})

const peopleExternalIds = (id) => async (dispatch) => {
  try {
    dispatch({type: 'PEOPLE_EXTERNAL_IDS_REQUEST'})
    const response = await PeopleExternalIds(id)
    dispatch({ type: 'PEOPLE_EXTERNAL_IDS_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'PEOPLE_EXTERNAL_IDS_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const resetPeopleExternalIds = () => ({
  type: 'RESET_PEOPLE_EXTERNAL_IDS',
})

export {
  peopleCareer,
  resetPeopleCareer,
  peopleDetails,
  resetPeopleDetails,
  peopleExternalIds,
  resetPeopleExternalIds,
}
