import { Linking } from 'react-native'

const IMDB = ({ people }) => {
  if (!people.imdb_id) return null

  const handleUrlRedirect = () => {
    const url = `https://www.imdb.com/name/${people?.imdb_id}`
    Linking.openURL(url)
  }

  return handleUrlRedirect()
}

export default IMDB
