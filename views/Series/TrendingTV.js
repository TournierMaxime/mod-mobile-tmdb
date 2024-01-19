import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  trendingTV,
  resetTrending,
} from '../../../redux/actions/tmdb/series'
import useLoadMore from '../../../utils/LoadMore'
import { truncateTitle } from '../../../utils/Truncate'
import { useNavigation } from '@react-navigation/native'
import list from '../../../styles/components/list'
import { useTranslation } from 'react-i18next'

const TrendingTV = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const trendingTVData = useSelector((state) => state.trendingTV.paginationData)
  const trendingTVResults = useSelector(
    (state) => state.trendingTV.paginationData.results
  )
  const { currentPage, loadMore } = useLoadMore(
    trendingTVData.page,
    trendingTVData.total_pages
  )
  const [allResults, setAllResults] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const { i18n } = useTranslation()
  const language = i18n.language
  const initialPage = 1

  const onRefresh = async () => {
    setRefreshing(true)
    await dispatch(trendingTV(initialPage, 'trendingPaginationTV', language))
    setRefreshing(false)
  }

  useEffect(() => {
    dispatch(trendingTV(currentPage, 'trendingPaginationTV', language))
  }, [dispatch, currentPage, language])

  useEffect(() => {
    if (trendingTVResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...trendingTVResults])
      } else {
        setAllResults(trendingTVResults)
      }
    }
  }, [trendingTVResults])

  useEffect(() => {
    return () => {
      dispatch(resetTrending())
    }
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${index}`}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <View style={styles.flatListViewContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailsSerie', {
                    id: item.id,
                    title: item.name,
                  })
                }
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                  }}
                />
                <Text style={styles.originalTitle}>
                  {truncateTitle(
                    item.name,
                    language === 'zh-cn' ||
                      language === 'ko' ||
                      language === 'ja'
                      ? 5
                      : 15
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: list.container,
  title: list.title,
  image: list.image,
  flatListViewContainer: list.flatListViewContainer,
  originalTitle: list.originalTitle,
})

export default TrendingTV
