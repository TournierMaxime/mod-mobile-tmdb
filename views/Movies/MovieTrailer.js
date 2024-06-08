import React, { Fragment } from "react"
import { movieTrailer } from "../../react-query/movies"
import { Linking } from "react-native"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"

const extractFirstTrailerResult = (trailer) => {
  if (!trailer?.results) {
    return null
  }

  const trailerResult = trailer?.results?.find(
    (result) => result.type === "Trailer",
  )

  return trailerResult
}

const Trailer = ({ id }) => {
  const { i18n } = useTranslation()
  const language = i18n.language

  const { data: mvTrailer } = useQuery(["movieTrailer", id, language], () =>
    movieTrailer(id, language),
  )
  const firstMovieTrailerResult = extractFirstTrailerResult(mvTrailer)
  const videoIdMovie = firstMovieTrailerResult?.key

  const handleLinkToMovieTrailer = () => {
    const url = `https://youtu.be/${videoIdMovie}`
    Linking.openURL(url)
  }

  return (
    <Fragment>
      {mvTrailer?.results?.length > 0 ? handleLinkToMovieTrailer() : null}
    </Fragment>
  )
}

export default Trailer
