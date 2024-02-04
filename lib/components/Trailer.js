import React, { useEffect } from 'react'
import { movieTrailer } from '../../redux/actions/movies'
import { serieTrailer } from '../../redux/actions/series'
import { useDispatch, useSelector } from 'react-redux'
import { Linking, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from 'react-native-vector-icons'
import Utils from '@mod/mobile-common/lib/class/Utils'
import tw from 'twrnc'

const extractFirstTrailerResult = (trailer) => {
  if (!trailer.results) {
    return null
  }

  const trailerResult = trailer.results.find(
    (result) => result.type === 'Trailer'
  )

  return trailerResult
}

const Trailer = ({ id, movie, serie }) => {
  const dispatch = useDispatch()

  const { i18n } = useTranslation()
  const language = i18n.language

  const mvTrailer = useSelector((state) => state.movieTrailer.data)
  const firstMovieTrailerResult = extractFirstTrailerResult(mvTrailer)
  const videoIdMovie = firstMovieTrailerResult?.key

  const handleLinkToMovieTrailer = () => {
    const url = `https://youtu.be/${videoIdMovie}`
    Linking.openURL(url)
  }

  const srTrailer = useSelector((state) => state.serieTrailer.data)
  const firstSerieTrailerResult = extractFirstTrailerResult(srTrailer)
  const videoIdSerie = firstSerieTrailerResult?.key

  const handleLinkToSerieTrailer = () => {
    const url = `https://youtu.be/${videoIdSerie}`
    Linking.openURL(url)
  }

  useEffect(() => {
    if (movie?.id === id) {
      dispatch(movieTrailer(movie?.id, language))
    } else if (serie?.id === id) {
      dispatch(serieTrailer(serie?.id, language))
    }
  }, [dispatch, id, movie, serie])

  return (
    <View style={tw`mt-4`}>
    <TouchableOpacity
      style={tw`mr-2 items-center justify-center`}
      onPress={() => {
        if (id === movie?.id) {
          handleLinkToMovieTrailer()
        } else if (id === serie?.id) {
          handleLinkToSerieTrailer()
        }
      }}
    >
      <Ionicons
        style={tw`items-center justify-center`}
        name='videocam-outline'
        size={Utils.moderateScale(35)}
        color='white'
      />
      </TouchableOpacity>
      </View>
  )
}

export default Trailer
