import React, { memo } from 'react'
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'
import { useInfiniteQuery } from 'react-query'
import { upcoming } from '../../react-query/movies'
import { useSelector } from 'react-redux'
import { useDynamicThemeStyles } from '@mod/mobile-common/styles/theme'

const Upcoming = () => {
  const navigation = useNavigation()

  const { i18n } = useTranslation()
  const language = i18n.language

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background } = useDynamicThemeStyles(darkMode)

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['upcoming', language],
      ({ pageParam = 1 }) => upcoming(pageParam, language),
      {
        getNextPageParam: (lastPage) => lastPage.page + 1,
      }
    )

  const allResults = data?.pages.flatMap((page) => page.results) || []

  return (
    <View style={tw`${background} items-center justify-between`}>
      <FlatList
        data={allResults}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        onEndReached={() => {
          if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading || isFetchingNextPage ? (
            <ActivityIndicator size='large' color='#0000ff' />
          ) : null
        }
        renderItem={({ item }) => {
          return (
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
                  style={[
                    tw`w-40 h-60 rounded-md m-4`,
                    { resizeMode: 'cover' },
                  ]}
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

export default memo(Upcoming)
