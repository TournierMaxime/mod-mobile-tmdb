import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  onTheAir,
  resetOnTheAir,
} from '../../redux/actions/series'
import useLoadMore from '@mod/mobile-common/lib/hooks/utils/useLoadMore'
import Utils from '@mod/mobile-common/lib/class/Utils'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'

const OnTheAir = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const onTheAirData = useSelector((state) => state.onTheAir.paginationData)
  const onTheAirResults = useSelector(
    (state) => state.onTheAir.paginationData.results
  )
  const { currentPage, loadMore } = useLoadMore(
    onTheAirData.page,
    onTheAirData.total_pages
  )
  const [allResults, setAllResults] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const { i18n } = useTranslation()
  const language = i18n.language
  const initialPage = 1

  const onRefresh = async () => {
    setRefreshing(true)
    await dispatch(onTheAir(initialPage, 'onTheAirPagination', language))
    setRefreshing(false)
  }

  useEffect(() => {
    dispatch(onTheAir(currentPage, 'onTheAirPagination', language))
  }, [dispatch, currentPage, language])

  useEffect(() => {
    if (onTheAirResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...onTheAirResults])
      } else {
        setAllResults(onTheAirResults)
      }
    }
  }, [onTheAirResults])

  useEffect(() => {
    return () => {
      dispatch(resetOnTheAir())
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
                  style={[tw`w-16 h-26 rounded-md m-4`, { resizeMode: 'cover' }]}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                  }}
                />
                <Text style={tw`text-center font-medium text-lg`}>
                  {Utils.truncateTitle(
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

export default OnTheAir
