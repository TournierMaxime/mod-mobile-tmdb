import { Search } from "../../../services/tmdb"

const search = async (page: number, query: string, language: string) => {
  try {
    const response = await Search(page, query, language)
    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { search }
