import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import details from '../../../styles/pages/details'
// import moment from 'moment'
import Accordion from '../../../components/Accordion'

const Production = ({ serie, t }) => {
  const status = (data) => {
    if (!data) return null

    const statusSerie = () => {
      switch (data) {
        case 'Returning Series':
          return <Text style={styles.tags}>{t('returningSeries')}</Text>
        case 'Ended':
          return <Text style={styles.tags}>{t('ended')}</Text>
      }
    }

    return (
      <Accordion title={t('status')}>
        <View style={styles.mainContainer}>
          <View style={styles.flatListViewContainer}>{statusSerie()}</View>
        </View>
      </Accordion>
    )
  }

  const networks = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('diffusers')}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.tags}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  const productionCompanies = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('producers')}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.tags}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  const productionCountries = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('country')}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={styles.flatListViewContainer}>
              <Text style={styles.tags}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  return (
    <View style={styles.productionViewContainer}>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.title}>{t('production')}</Text>
      </View>
      {status(serie?.status)}
      {networks(serie?.networks)}
      {productionCompanies(serie?.production_companies)}
      {productionCountries(serie?.production_countries)}
    </View>
  )
}

const styles = StyleSheet.create({
  image: details.image,
  title: details.title,
  subTitle: details.subTitle,
  flatListViewContainer: details.flatListViewContainer,
  tags: details.tags,
  technicalSheetViewContainer: details.technicalSheetViewContainer,
  mainContainer: details.mainContainer,
  productionViewContainer: details.productionViewContainer,
})

export default Production
