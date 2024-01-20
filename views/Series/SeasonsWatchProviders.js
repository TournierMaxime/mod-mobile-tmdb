import React, { Fragment, useEffect } from 'react'
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

const SeasonsWatchProviders = ({ id, item, language, t }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const providers = useSelector(
    (state) => state.seasonWatchProviders.seasonWatchProviders
  )

  const seasonNumber = item.season_number
  const lang = language.toUpperCase()

  const flatrate = (providers, languageKey) => {
    let language = languageKey

    switch (language) {
      case 'EN-GB':
        language = 'US'
        break
      case 'ZH-CN':
        language = 'CN'
        break
      case 'JA':
        language = 'JP'
        break
      case 'KO':
        language = 'KR'
        break
    }

    if (!providers?.watchProviders?.results[language]?.flatrate) {
      return null
    }
    if (providers.seasonNumber !== seasonNumber) return null
    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4`}>{t('flatrate')}</Text>
        {providers.watchProviders.results[language]?.flatrate?.map(
          (provider, index) => {
            return (
              <Text style={[tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`, { color: '#495057', backgroundColor: '#dee2e6' }]} key={index}>
                {provider.provider_name}
              </Text>
            )
          }
        )}
      </View>
    )
  }

  const buy = (providers, languageKey) => {
    let language = languageKey

    switch (language) {
      case 'EN-GB':
        language = 'US'
        break
      case 'ZH-CN':
        language = 'CN'
        break
      case 'JA':
        language = 'JP'
        break
      case 'KO':
        language = 'KR'
        break
    }
    if (!providers?.watchProviders?.results[language]?.buy) {
      return null
    }
    if (providers.seasonNumber !== seasonNumber) return null
    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4`}>{t('buy')}</Text>
        {providers.watchProviders.results[language]?.buy?.map(
          (provider, index) => {
            return (
              <Text style={[tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`, { color: '#495057', backgroundColor: '#dee2e6' }]} key={index}>
                {provider.provider_name}
              </Text>
            )
          }
        )}
      </View>
    )
  }

  const providersByCountry = (lang) => {
    switch (lang) {
      case 'EN-GB':
        lang = 'US'
        break
      case 'ZH-CN':
        lang = 'CN'
        break
      case 'JA':
        lang = 'JP'
        break
      case 'KO':
        lang = 'KR'
        break
    }

    const seasonProviders = providers.find(
      (provider) => provider.seasonNumber === seasonNumber
    )

    return (
      <Fragment>
        {flatrate(seasonProviders, lang)}
        {buy(seasonProviders, lang)}
      </Fragment>
    )
  }

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
              source={require('../../assets/images/No_Image_Available.jpg')}
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
          <View>{providersByCountry(lang)}</View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SeasonsWatchProviders
