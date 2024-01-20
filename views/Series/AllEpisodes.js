import React, { useEffect } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { seasonDetails, resetSeasonDetails } from '../../redux/actions/series'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'

const AllEpisodes = ({ route }) => {
  const { id, seasonNumber } = route.params
  const dispatch = useDispatch()
  const season = useSelector((state) => state.seasonDetails.data)

  const { i18n, t } = useTranslation()
  const language = i18n.language

  useEffect(() => {
    dispatch(seasonDetails(id, seasonNumber, language))
  }, [id, seasonNumber])

    useEffect(() => {
    return () => {
      dispatch(resetSeasonDetails())
    }
    }, [])

  const renderItem = (item) => {
    return (
      <View style={tw`flex flex-row justify-start bg-white my-4 p-4`}>
        {item.still_path ? (
          <Image
            style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.still_path}`,
            }}
          />
        ) : (
          <Image
            style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
            source={require('../../../assets/image/No_Image_Available.jpg')}
          />
        )}

        <View style={tw`flex-1 w-full`}>
          <Text style={tw`font-medium text-lg ml-4`}>
            {item.name} | {t('episode')} {item.episode_number}
          </Text>
          <Text style={tw`font-medium text-lg ml-4`}>
            {moment(item.air_date).format('LL')}
          </Text>
          <Text style={tw`font-medium text-lg p-4 text-justify leading-7`}>{item.overview}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={tw`flex-1 flex flex-col mt-4`}>
      <Text style={tw`text-center font-medium text-lg mb-4`}>{t('Episodes')}</Text>
      <FlatList
        data={season?.episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

export default AllEpisodes
