import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { upcoming, resetUpcoming } from '../../redux/actions/movies'
import useLoadMore from '../../../../lib/hooks/utils/useLoadMore'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'

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
    <View style={tw`bg-slate-100 items-center justify-between`}>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${index}`}
        numColumns={2}
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
                  navigation.navigate('Details Movie', {
                    id: item.id,
                    title: item.original_title,
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

export default Upcoming
