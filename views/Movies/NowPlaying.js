import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  nowPlaying,
  resetNowPlaying,
} from '../../../redux/actions/tmdb/movies'
import useLoadMore from '../../../utils/LoadMore'
import { truncateTitle } from '../../../utils/Truncate'
import { useNavigation } from '@react-navigation/native'
import list from '../../../styles/components/list'
import { useTranslation } from 'react-i18next'

const NowPlaying = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const nowPlayingData = useSelector((state) => state.nowPlaying.paginationData)
  const nowPlayingResults = useSelector(
    (state) => state.nowPlaying.paginationData.results
  )
  const { currentPage, loadMore } = useLoadMore(
    nowPlayingData.page,
    nowPlayingData.total_pages
  )
  const [allResults, setAllResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const { i18n } = useTranslation()
  const language = i18n.language
  const initialPage = 1

  const onRefresh = async () => {
    setRefreshing(true)
    await dispatch(nowPlaying(initialPage, 'nowPlayingPagination', language))
    setRefreshing(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await dispatch(
          nowPlaying(currentPage, 'nowPlayingPagination', language)
        )
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dispatch, currentPage, language])

  useEffect(() => {
    const updateResults = async () => {
      if (nowPlayingResults?.length > 0) {
        if (currentPage > 1) {
          setAllResults((prevResults) => [...prevResults, ...nowPlayingResults])
        } else {
          setAllResults(nowPlayingResults)
        }
      }
    }

    updateResults()
  }, [nowPlayingResults])

  useEffect(() => {
    return () => {
      dispatch(resetNowPlaying())
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
        onEndReached={
          isLoading === true ? (
            <ActivityIndicator
              style={styles.loader}
              size='large'
              color='#0000ff'
            />
          ) : (
            loadMore
          )
        }
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <View style={styles.flatListViewContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailsMovie', {
                    id: item.id,
                    title: item.title,
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
                    item.title,
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

export default NowPlaying
