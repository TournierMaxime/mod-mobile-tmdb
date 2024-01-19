import React, { Fragment, useEffect, useState } from 'react'
import {
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
  trending,
  resetTrending,
} from '../../redux/actions/movies'
import useLoadMore from '@mod/mobile-common/lib/hooks/utils/useLoadMore'
import Utils from '@mod/mobile-common/lib/class/Utils'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'

const Trending = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const trendingData = useSelector((state) => state.trending.paginationData)
  const trendingResults = useSelector(
    (state) => state.trending.paginationData.results
  )
  const { currentPage, loadMore } = useLoadMore(
    trendingData.page,
    trendingData.total_pages
  )
  const [allResults, setAllResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const { i18n } = useTranslation()
  const language = i18n.language
  const initialPage = 1

  const onRefresh = async () => {
    setRefreshing(true)
    await dispatch(trending(initialPage, 'trendingPagination', language))
    setRefreshing(false)
  }

  useEffect(() => {
    setIsLoading(true)
    dispatch(trending(currentPage, 'trendingPagination', language))
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [dispatch, currentPage, language])

  useEffect(() => {
    if (trendingResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...trendingResults])
      } else {
        setAllResults(trendingResults)
      }
    }
  }, [trendingResults])

  useEffect(() => {
    return () => {
      dispatch(resetTrending())
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
            <Fragment>
              {item.media_type === 'movie' ? (
                <View style={tw`flex-col justify-between`}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailsMovie', {
                        id: item.id,
                        title: item.original_title,
                      })
                    }
                  >
                    <Image
                      style={[tw`w-16 h-26 rounded-md m-4`, { resizeMode: 'cover' }]}
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                      }}
                    />
                    <Text style={tw`text-center font-medium text-lg`}>
                      {Utils.truncateTitle(
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
              ) : (
                <View style={tw`flex-col justify-between`}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailsSerie', {
                        id: item.id,
                        title: item.name,
                      })
                    }
                  >
                    <Image
                      style={[tw`w-16 h-26 rounded-md m-4`, { resizeMode: 'cover' }]}
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                      }}
                    />
                    <Text style={tw`text-center font-medium text-lg`}>
                      {truncateTitle(
                        item.name,
                        language,
                        language === 'zh-cn' ||
                          language === 'ko' ||
                          language === 'ja'
                          ? 5
                          : 15
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Fragment>
          )
        }}
      />
    </View>
  )
}

export default Trending
