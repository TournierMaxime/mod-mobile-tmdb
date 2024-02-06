import React, { Fragment } from 'react'
import { updateSeasonWatchProviders } from '../../../../react-query/series'
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Rate from '../../lib/components/Rate'
import moment from 'moment'
import tw from 'twrnc'
import Series from '../../lib/class/Series'
import { useQuery } from 'react-query'

const SeasonsWatchProviders = ({ id, item, language, t }) => {
  const navigation = useNavigation()
  const lang = language.toUpperCase()

  const seasonNumber = item.season_number

  const { data: providers } = useQuery(
    ['providers', id, seasonNumber, lang],
    () => updateSeasonWatchProviders(id, seasonNumber, lang)
  )

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('AllEpisodes', {
          id,
          seasonNumber,
        })
      }
    >
      <View style={tw`flex flex-row justify-start bg-white p-2`}>
        <View style={tw`items-center`}>
          {item.poster_path ? (
            <Fragment>
              <ImageBackground
                style={[
                  tw`w-20 h-30 rounded-md ml-4 mb-2`,
                  { resizeMode: 'cover' },
                ]}
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                }}
              >
                <Rate size={true} rate={item.vote_average} />
              </ImageBackground>
            </Fragment>
          ) : (
            <Fragment>
              <ImageBackground
                style={[
                  tw`w-20 h-30 rounded-md ml-4 mb-2`,
                  { resizeMode: 'cover' },
                ]}
                source={require('../../../../assets/images/No_Image_Available.jpg')}
              >
                <Rate size={true} rate={item.vote_average} />
              </ImageBackground>
            </Fragment>
          )}
        </View>
        <View style={tw`flex-1 w-full`}>
          <Text style={tw`font-medium text-lg ml-4`}>
            {item.name} | {item.episode_count} {t('episodes')}
          </Text>
          <Text style={tw`font-medium text-lg ml-4`}>
            {moment(item.air_date).format('LL')}
          </Text>
          <Text style={tw`font-medium text-lg p-4 text-justify leading-7`}>
            {item.overview}
          </Text>
          <Text style={[tw`font-medium text-lg ml-4`, { marginBottom: 15 }]}>
            {t('utils.contentPoweredByJustWatch')}
          </Text>
          {Series.providersByCountry(providers?.[lang], lang, t)}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SeasonsWatchProviders
