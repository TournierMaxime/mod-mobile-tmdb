import { PeopleDetails, PeopleCareer, PeopleExternalIds } from "../../../services/tmdb"

const peopleDetails = async (id, language) => {
  try {
    const response = await PeopleDetails(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const peopleExternalIds = async (id) => {
  try {
    const response = await PeopleExternalIds(id)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const peopleCareer = async (id, language) => {
  try {
    const response = await PeopleCareer(id, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { peopleCareer, peopleDetails, peopleExternalIds }