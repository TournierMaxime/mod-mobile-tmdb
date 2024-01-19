import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateSeasonWatchProviders,
  resetSeasonWatchProviders,
} from '../../../redux/actions/tmdb/series'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Rate from '../../../utils/Rate'
import dot from '../../../styles/pages/dot'
import moment from 'moment'

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
        <Text style={styles.renderItemTitle}>{t('flatrate')}</Text>
        {providers.watchProviders.results[language]?.flatrate?.map(
          (provider, index) => {
            return (
              <Text style={styles.renderItemTags} key={index}>
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
        <Text style={styles.renderItemTitle}>{t('buy')}</Text>
        {providers.watchProviders.results[language]?.buy?.map(
          (provider, index) => {
            return (
              <Text style={styles.renderItemTags} key={index}>
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
      <View style={styles.renderItemContainer}>
        <View style={{ alignItems: 'center' }}>
          {item.poster_path ? (
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require('../../../assets/image/No_Image_Available.jpg')}
            />
          )}
          <Rate rate={item.vote_average} />
        </View>
        <View style={styles.renderItemDetails}>
          <Text style={styles.renderItemTitle}>
            {item.name} | {item.episode_count} {t('episodes')}
          </Text>
          <Text style={styles.renderItemTitle}>
            {moment(item.air_date).format('LL')}
          </Text>
          <Text style={styles.renderItemOverview}>{item.overview}</Text>
          <Text style={[styles.renderItemTitle, { marginBottom: 15 }]}>
            {t('contentPoweredByJustWatch')}
          </Text>
          <View>{providersByCountry(lang)}</View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: dot.image,
  renderItemContainer: dot.renderItemContainer,
  renderItemTitle: dot.renderItemTitle,
  renderItemOverview: dot.renderItemOverview,
  renderItemTags: dot.renderItemTags,
  renderItemDetails: dot.renderItemDetails,
  seasonTitle: dot.seasonTitle,
})

export default SeasonsWatchProviders
