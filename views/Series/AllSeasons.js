import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList
} from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import dot from '../../../styles/pages/dot'
import { useTranslation } from 'react-i18next'
import SeasonsWatchProviders from './SeasonsWatchProviders'
 
const AllSeasons = ({ route }) => {
  const { title, id } = route.params
  const serie = useSelector((state) => state.serieDetails.data)

  const { t, i18n } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>
        {t('seasonsOf')} {title}
      </Text>
      <FlatList
        data={serie?.seasons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SeasonsWatchProviders item={item} id={id} language={language} t={t} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: dot.container,
  image: dot.image,
  renderItemContainer: dot.renderItemContainer,
  renderItemTitle: dot.renderItemTitle,
  renderItemOverview: dot.renderItemOverview,
  renderItemDetails: dot.renderItemDetails,
  seasonTitle: dot.seasonTitle,
})

export default AllSeasons
