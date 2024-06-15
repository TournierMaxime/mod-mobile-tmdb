import {
  PeopleDetails,
  PeopleCareer,
  PeopleExternalIds,
} from "../../../services/tmdb"

const peopleDetails = async (id: number, language: string) => {
  try {
    const response = await PeopleDetails(id, language)
    return response.data
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const peopleExternalIds = async (id: number) => {
  try {
    const response = await PeopleExternalIds(id)
    return response.data
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

const peopleCareer = async (id: number, language: string) => {
  try {
    const response = await PeopleCareer(id, language)
    return response.data
  } catch (error) {
    let errorMessage: string
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
  }
}

export { peopleCareer, peopleDetails, peopleExternalIds }
