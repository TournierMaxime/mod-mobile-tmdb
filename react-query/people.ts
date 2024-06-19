import {
  PeopleDetails,
  PeopleCareer,
  PeopleExternalIds,
} from "../../../services/tmdb"

const peopleDetails = async (id: number, language: string) => {
  try {
    const response = await PeopleDetails(id, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const peopleExternalIds = async (id: number) => {
  try {
    const response = await PeopleExternalIds(id)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const peopleCareer = async (id: number, language: string) => {
  try {
    const response = await PeopleCareer(id, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { peopleCareer, peopleDetails, peopleExternalIds }
