import React, { useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment/moment'
import dot from '../../../styles/pages/dot'
import { seasonDetails, resetSeasonDetails } from '../../../redux/actions/tmdb/series'
import { useTranslation } from 'react-i18next'

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
      <View style={styles.renderItemContainer}>
        {item.still_path ? (
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.still_path}`,
            }}
          />
        ) : (
          <Image
            style={styles.image}
            source={require('../../../assets/image/No_Image_Available.jpg')}
          />
        )}

        <View style={styles.renderItemDetails}>
          <Text style={styles.renderItemTitle}>
            {item.name} | {t('episode')} {item.episode_number}
          </Text>
          <Text style={styles.renderItemTitle}>
            {moment(item.air_date).format('LL')}
          </Text>
          <Text style={styles.renderItemOverview}>{item.overview}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>{t('Episodes')}</Text>
      <FlatList
        data={season?.episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
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

export default AllEpisodes
