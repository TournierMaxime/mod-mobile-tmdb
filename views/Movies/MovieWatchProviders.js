import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import dot from '../../../styles/pages/dot'
import Accordion from '../../../components/Accordion'

const MovieWatchProviders = ({ language, t }) => {
  const providers = useSelector(
    (state) => state.movieWatchProviders.data.results
  )

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

    if (!providers?.[language]?.flatrate) {
      return null
    }

    return (
      <View>
        <Text style={styles.renderItemTitle}>{t('flatrate')}</Text>
        {providers?.[language]?.flatrate?.map((provider, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.renderItemTags}>
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
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
    if (!providers?.[language]?.buy) {
      return null
    }

    return (
      <View>
        <Text style={styles.renderItemTitle}>{t('buy')}</Text>
        {providers?.[language]?.buy?.map((provider, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.renderItemTags}>
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  const rent = (providers, languageKey) => {
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
    if (!providers?.[language]?.rent) {
      return null
    }

    return (
      <View>
        <Text style={styles.renderItemTitle}>{t('rent')}</Text>
        {providers?.[language]?.buy?.map((provider, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.renderItemTags}>
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  const providersByCountry = (providers, language) => {

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

    return (
      <Fragment>
        {flatrate(providers, language)}
        {buy(providers, language)}
        {rent(providers, language)}
      </Fragment>
    )
  }

  return (
    <Accordion title={t('available')}>
      <View style={styles.mainContainer}>
        <Text style={[styles.renderItemTitle, { marginBottom: 15 }]}>
          {t('contentPoweredByJustWatch')}
        </Text>
        <View>{providersByCountry(providers, language)}</View>
      </View>
    </Accordion>
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

export default MovieWatchProviders
