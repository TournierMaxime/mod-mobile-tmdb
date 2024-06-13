import { Search } from "../../../services/tmdb"

const search = async (page, query, language) => {
  try {
    const response = await Search(page, query, language)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export { search }
