import React, { Fragment } from 'react'
import { serieTrailer } from '../../react-query/series'
import { Linking, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { MaterialIcons } from '@expo/vector-icons'
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
      {srTrailer?.results?.length > 0 ? (
        <TouchableOpacity
          style={tw`mr-2 items-center justify-center`}
          onPress={() => handleLinkToSerieTrailer()}
        >
          <MaterialIcons
            name='videocam'
            size={Utils.moderateScale(35)}
            color='black'
          />
        </TouchableOpacity>
      ) : null}
    </Fragment>
  )
}

export default SerieTrailer
