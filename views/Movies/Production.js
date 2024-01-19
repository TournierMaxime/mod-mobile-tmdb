import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { numberWithCommas } from '../../../utils/NumberWithCommas'
import details from '../../../styles/pages/details'
import moment from 'moment'
import Accordion from '../../../components/Accordion'
import { useSelector } from 'react-redux'
import MovieWatchProviders from './MovieWatchProviders'

const Production = ({ id, movie, t, language }) => {
  moment.locale(language)
  const lang = language.toUpperCase()

  const releases = useSelector((state) => state.releaseDates.data.results)

  const productionCompanies = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('producers')}>
        <View style={styles.mainContainer}>
          {data?.map((item, index) => {
            return (
              <View key={index} style={styles.flatListViewContainer}>
                <Text style={styles.tags}>{item.name}</Text>
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  const productionCountries = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('country')}>
        <View style={styles.mainContainer}>
          {data?.map((item, index) => {
            return (
              <View key={index} style={styles.flatListViewContainer}>
                <Text style={styles.tags}>{item.name}</Text>
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  const releaseByCountry = (releaseDates, language) => {
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
      <Accordion title={t('release')}>
        <View style={styles.mainContainer}>
          {releaseDates.map((releaseDate, index) => {
            if (releaseDate.iso_3166_1 !== language) return null
            return (
              <View key={index}>
                {releaseDate.release_dates.map((releaseDate, index) => {
                  return (
                    <View style={styles.flatListViewContainer} key={index}>
                      <Text style={styles.tags}>
                        {moment(releaseDate.release_date).format('L')} {releaseDate.note ? `- ${releaseDate.note}` : `- ${t('nationalRelease')}`}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  const budget = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('budget')}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{numberWithCommas(data)}$</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  const revenue = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('boxOffice')}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>
            <Text style={styles.tags}>{numberWithCommas(data)}$</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  return (
    <View style={styles.productionViewContainer}>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.title}>{t('production')}</Text>
      </View>
      {releaseByCountry(releases, lang)}
      {budget(movie?.budget)}
      {revenue(movie?.revenue)}
      <MovieWatchProviders id={id} language={lang} t={t} />
      {productionCompanies(movie?.production_companies)}
      {productionCountries(movie?.production_countries)}
    </View>
  )
}

const styles = StyleSheet.create({
  image: details.image,
  title: details.title,
  subTitle: details.subTitle,
  flatListViewContainer: details.flatListViewContainer,
  tags: details.tags,
  productionViewContainer: details.productionViewContainer,
  mainContainer: details.mainContainer,
  technicalSheetViewContainer: details.technicalSheetViewContainer,
})

export default Production
