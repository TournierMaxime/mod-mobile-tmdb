import React, { useEffect } from "react"
import { Linking } from "react-native"

interface Props {
  people: {
    imdb_id?: string
  }
}

const IMDB: React.FC<Props> = ({ people }) => {
  useEffect(() => {
    if (people.imdb_id) {
      const handleUrlRedirect = () => {
        const url = `https://www.imdb.com/name/${people?.imdb_id}`
        Linking.openURL(url)
      }
      handleUrlRedirect()
    }
  }, [people.imdb_id])

  return null
}

export default IMDB
