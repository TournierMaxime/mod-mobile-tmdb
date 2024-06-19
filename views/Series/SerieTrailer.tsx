import React, { Fragment } from "react"
import { serieTrailer } from "../../react-query/series"
import { ActivityIndicator, View, Text } from "react-native"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import tw from "twrnc"
import YoutubeIframe from "modules/mod-mobile-common/lib/components/utils/YouTubeIframe"
import useResponsive from "modules/mod-mobile-common/lib/hooks/utils/useResponsive"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import { RootState } from "store"

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

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { text } = useDynamicThemeStyles(darkMode)

  const { fontSize } = useResponsive()

  const {
    data: srTrailer,
    isLoading,
    isError,
  } = useQuery(["serieTrailer", id, language], () => serieTrailer(id, language))
  const firstSerieTrailerResult = extractFirstTrailerResult(srTrailer)
  const videoIdSerie = firstSerieTrailerResult?.key

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if (isError) {
    return (
      <View style={tw`mt-4 items-center`}>
        <Text style={fontSize(text)}>Error loading trailer</Text>
      </View>
    )
  }

  if (!srTrailer || srTrailer.results.length === 0) {
    return (
      <View style={tw`mt-4 items-center`}>
        <Text style={fontSize(text)}>No trailer available</Text>
      </View>
    )
  }

  return (
    <Fragment>
      {srTrailer?.results?.length > 0 ? (
        <View style={tw`flex-row justify-center mt-4 mb-8`}>
          <YoutubeIframe videoId={videoIdSerie} />
        </View>
      ) : null}
    </Fragment>
  )
}

export default SerieTrailer
