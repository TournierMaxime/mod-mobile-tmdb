import React, { Fragment } from 'react'
import { movieTrailer } from '../../react-query/movies'
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

const Trailer = ({ id }) => {
  const { i18n } = useTranslation()
  const language = i18n.language

  const { data: mvTrailer } = useQuery(['movieTrailer', id, language], () =>
    movieTrailer(id, language)
  )
  const firstMovieTrailerResult = extractFirstTrailerResult(mvTrailer)
  const videoIdMovie = firstMovieTrailerResult?.key

  const handleLinkToMovieTrailer = () => {
    const url = `https://youtu.be/${videoIdMovie}`
    Linking.openURL(url)
  }

  return (
    <Fragment>
      {mvTrailer?.results?.length > 0 ? (
        <TouchableOpacity
          style={tw`mr-2 items-center justify-center`}
          onPress={() => handleLinkToMovieTrailer()}
        >
          <MaterialIcons
            name='videocam'
            size={Utils.moderateScale(30)}
            color='black'
          />
        </TouchableOpacity>
      ) : null}
    </Fragment>
  )
}

export default Trailer
