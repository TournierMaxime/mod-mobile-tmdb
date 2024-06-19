import React, { Fragment } from "react"
import { movieTrailer } from "../../react-query/movies"
import { Linking, TouchableOpacity, Text } from "react-native"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import tw from "twrnc"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

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

  const { btnSubmit } = useResponsive()

  return (
    <Fragment>
      {mvTrailer?.results?.length > 0 ? (
        <TouchableOpacity
          style={tw`flex-row justify-center mt-4 mb-8 
            bg-indigo-600
           rounded-lg`}
          onPress={() => handleLinkToMovieTrailer()}
        >
          <Text style={btnSubmit()}>Trailer</Text>
        </TouchableOpacity>
      ) : null}
    </Fragment>
  )
}
export default Trailer
