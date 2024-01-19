import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { upcoming, resetUpcoming } from '../../../redux/actions/tmdb/movies'
import useLoadMore from '../../../utils/LoadMore'
import { truncateTitle } from '../../../utils/Truncate'
import { useNavigation } from '@react-navigation/native'
import list from '../../../styles/components/list'
import { useTranslation } from 'react-i18next'

const Upcoming = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const upcomingData = useSelector((state) => state.upcoming.paginationData)
  const upcomingResults = useSelector(
    (state) => state.upcoming.paginationData.results
  )
  const { currentPage, loadMore } = useLoadMore(
    upcomingData.page,
    upcomingData.total_pages
  )
  const [allResults, setAllResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { i18n } = useTranslation()
  const language = i18n.language

  useEffect(() => {
    setIsLoading(true)
    dispatch(upcoming(currentPage, 'upcomingPagination', language))
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [dispatch, currentPage])

  useEffect(() => {
    if (upcomingResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...upcomingResults])
      } else {
        setAllResults(upcomingResults)
      }
    }
  }, [upcomingResults])

    useEffect(() => {
    return () => {
      dispatch(resetUpcoming())
    }
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${index}`}
        numColumns={2}
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
                  navigation.navigate('Details Movie', {
                    id: item.id,
                    title: item.original_title,
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
                  {truncateTitle(item.original_title, 15)}
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

export default Upcoming
