import React from "react"
import { View, FlatList, ActivityIndicator } from "react-native"
import { popular } from "../../react-query/series"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import { useInfiniteQuery } from "react-query"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import FlatListItem from "../../lib/components/FlatListItem"
import { RootState } from "store"
import { NavigationProp } from "@react-navigation/native"
import { SerieStackParamList } from "navigators/SerieStackNavigator"

interface PopularProps {
  i18n: any
  t: any
  navigation: NavigationProp<SerieStackParamList, "Popular">
  route: any
}

const Popular: React.FC<PopularProps> = () => {
  const { i18n } = useTranslation()
  const language = i18n.language

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background } = useDynamicThemeStyles(darkMode)

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["popular", language],
      ({ pageParam = 1 }) => popular(pageParam, language),
      {
        getNextPageParam: (lastPage) => lastPage.page + 1,
      },
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
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
        renderItem={({ item, index }) => (
          <FlatListItem item={item} index={index} type="tv" />
        )}
      />
    </View>
  )
}

export default Popular
