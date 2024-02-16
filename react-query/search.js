import { Search } from "../../../services/tmdb"

const search = async (page, query, language) => {
  try {
    const response = await Search(page, query, language)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
};

export { search }