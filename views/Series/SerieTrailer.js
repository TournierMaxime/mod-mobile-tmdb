import React, { Fragment } from 'react'
import { serieTrailer } from '../../../../react-query/series'
import { Linking, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Feather } from '@expo/vector-icons'
import Utils from '@mod/mobile-common/lib/class/Utils'
import tw from 'twrnc'
import { useQuery } from 'react-query'

const extractFirstTrailerResult = (trailer) => {
  if (!trailer?.results) {
    return null
  }

  const trailerResult = trailer?.results?.find(
    (result) => result.type === 'Trailer'
  )

  return trailerResult
}

const SerieTrailer = ({ id }) => {
  const { i18n } = useTranslation()
  const language = i18n.language

  const { data: srTrailer } = useQuery(['serieTrailer', id, language], () =>
    serieTrailer(id, language)
  )
  const firstSerieTrailerResult = extractFirstTrailerResult(srTrailer)
  const videoIdSerie = firstSerieTrailerResult?.key

  const handleLinkToSerieTrailer = () => {
    const url = `https://youtu.be/${videoIdSerie}`
    Linking.openURL(url)
  }

  return (
    <Fragment>
      <View style={tw`mt-4`}>
        {srTrailer?.results?.length > 0 ? (
          <TouchableOpacity
            style={tw`mr-2 items-center justify-center`}
            onPress={() => handleLinkToSerieTrailer()}
          >
            <Feather
              style={tw`items-center justify-center`}
              name='video'
              size={Utils.moderateScale(35)}
              color='white'
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </Fragment>
  )
}

export default SerieTrailer
