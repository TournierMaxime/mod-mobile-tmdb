import { Search } from "../../../services/tmdb"

const search = async (page: number, query: string, language: string) => {
  try {
    const response = await Search(page, query, language)
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

export { search }
