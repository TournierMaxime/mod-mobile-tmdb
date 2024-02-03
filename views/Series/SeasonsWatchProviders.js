import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateSeasonWatchProviders,
  resetSeasonWatchProviders,
} from '../../redux/actions/series'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Rate from '../../lib/components/Rate'
import moment from 'moment'
import tw from 'twrnc'
import Series from '../../lib/class/Series'

const SeasonsWatchProviders = ({ id, item, language, t }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const providers = useSelector(
    (state) => state.seasonWatchProviders.seasonWatchProviders
  )

  const seasonNumber = item.season_number
  const lang = language.toUpperCase()

  useEffect(() => {
    dispatch(updateSeasonWatchProviders(id, item.season_number, language))
  }, [dispatch, id, seasonNumber, language])

  useEffect(() => {
    return () => {
      dispatch(resetSeasonWatchProviders())
    }
  }, [])

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('AllEpisodes', {
          id,
          seasonNumber,
        })
      }
    >
      <View style={tw`flex flex-row justify-start bg-white my-2 p-2`}>
        <View style={tw`items-center`}>
          {item.poster_path ? (
            <Image
              style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
            />
          ) : (
            <Image
              style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
              source={require('../../../../assets/images/No_Image_Available.jpg')}
            />
          )}
          <Rate rate={item.vote_average} />
        </View>
        <View style={tw`flex-1 w-full`}>
          <Text style={tw`font-medium text-lg ml-4`}>
            {item.name} | {item.episode_count} {t('episodes')}
          </Text>
          <Text style={tw`font-medium text-lg ml-4`}>
            {moment(item.air_date).format('LL')}
          </Text>
          <Text style={tw`font-medium text-lg p-4 text-justify leading-7`}>{item.overview}</Text>
          <Text style={[tw`font-medium text-lg ml-4`, { marginBottom: 15 }]}>
            {t('contentPoweredByJustWatch')}
          </Text>
          {Series.providersByCountry(providers, lang)}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SeasonsWatchProviders
