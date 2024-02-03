import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  trendingTV,
  resetTrending,
} from '../../redux/actions/series'
import useLoadMore from '@mod/mobile-common/lib/hooks/utils/useLoadMore'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'

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
    <View style={tw`bg-slate-100 items-center justify-center`}>
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

export default TrendingTV
