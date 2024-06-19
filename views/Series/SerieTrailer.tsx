import React, { Fragment } from "react"
import { serieTrailer } from "../../react-query/series"
import { Linking, TouchableOpacity, Text } from "react-native"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import tw from "twrnc"

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

const SerieTrailer = ({ id }: Props) => {
  const { i18n } = useTranslation()
  const language = i18n.language

  const { data: srTrailer } = useQuery(["serieTrailer", id, language], () =>
    serieTrailer(id, language),
  )
  const firstSerieTrailerResult = extractFirstTrailerResult(srTrailer)
  const videoIdSerie = firstSerieTrailerResult?.key

  const handleLinkToSerieTrailer = () => {
    const url = `https://youtu.be/${videoIdSerie}`
    Linking.openURL(url)
  }

  const { btnSubmit } = useResponsive()

  return (
    <Fragment>
      {srTrailer?.results?.length > 0 ? (
        <TouchableOpacity
          style={tw`flex-row justify-center mt-4 mb-8 
            bg-indigo-600
           rounded-lg`}
          onPress={() => handleLinkToSerieTrailer()}
        >
          <Text style={btnSubmit()}>Trailer</Text>
        </TouchableOpacity>
      ) : null}
    </Fragment>
  )
}

export default SerieTrailer
