import React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { popular } from '../../../../react-query/series'
import Utils from '@mod/mobile-common/lib/class/Utils'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'
import { useInfiniteQuery } from 'react-query'

const Popular = () => {
  const navigation = useNavigation()

  const { i18n } = useTranslation()
  const language = i18n.language

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['popular', language],
      ({ pageParam = 1 }) => popular(pageParam, language),
      {
        getNextPageParam: (lastPage) => lastPage.page + 1,
      }
    )

  const allResults = data?.pages.flatMap((page) => page.results) || []

  return (
    <View style={tw`bg-slate-100 items-center justify-between`}>
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
                  navigation.navigate('DetailsSerie', {
                    id: item.id,
                    title: item.original_name,
                  })
                }
              >
                <Image
                  style={[
                    tw`w-16 h-26 rounded-md m-4`,
                    { resizeMode: 'cover' },
                  ]}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                  }}
                />
                <Text style={tw`text-center font-medium text-lg`}>
                  {Utils.truncateTitle(item.original_name, 15)}
                </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

export default Popular
