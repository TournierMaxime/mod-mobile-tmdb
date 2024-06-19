import React, { Fragment } from "react"
import { movieTrailer } from "../../react-query/movies"
import { Linking, Button } from "react-native"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"

interface Props {
  id: number
}

interface TrailerResult {
  type: string
  key: string
}

interface TrailerResponse {
  results: TrailerResult[]
}

const extractFirstTrailerResult = (trailer: TrailerResponse | undefined) => {
  if (!trailer?.results) {
    return null
  }

  const trailerResult = trailer?.results?.find(
    (result) => result.type === "Trailer",
  )

  return trailerResult
}

const Trailer = ({ id }: Props) => {
  const { i18n } = useTranslation()
  const language = i18n.language

  const { data: mvTrailer } = useQuery(["movieTrailer", id, language], () =>
    movieTrailer(id, language),
  )
  const firstMovieTrailerResult = extractFirstTrailerResult(mvTrailer)
  const videoIdMovie = firstMovieTrailerResult?.key

  const handleLinkToMovieTrailer = () => {
    if (videoIdMovie) {
      const url = `https://youtu.be/${videoIdMovie}`
      Linking.openURL(url)
    }
  }

  return (
    <Fragment>
      {mvTrailer?.results?.length > 0 ? (
        <Button title="Trailer" onPress={handleLinkToMovieTrailer} />
      ) : null}
    </Fragment>
  )
}

export default Trailer
