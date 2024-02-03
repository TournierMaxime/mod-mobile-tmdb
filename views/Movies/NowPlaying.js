import React, { useEffect, useState } from 'react'
import {
  View,
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
} from '../../redux/actions/movies'
import useLoadMore from '../../../../lib/hooks/utils/useLoadMore'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'

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
    <View style={tw`bg-slate-100 items-center justify-between`}>
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
            <View style={tw`flex-col justify-between`}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailsMovie', {
                    id: item.id,
                    title: item.title,
                  })
                }
              >
                <Image
                  style={[tw`w-40 h-60 rounded-md m-4`, { resizeMode: 'cover' }]}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

export default NowPlaying
