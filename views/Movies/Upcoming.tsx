import React, { memo } from "react"
import { View, FlatList, ActivityIndicator } from "react-native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import { useInfiniteQuery } from "react-query"
import { upcoming } from "../../react-query/movies"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import FlatListItem from "../../lib/components/FlatListItem"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { RootState } from "store"
import { NavigationProp } from "@react-navigation/native"
import { MovieStackParamList } from "navigators/MovieStackNavigator"

interface UpcomingProps {
  i18n: any
  t: any
  navigation: NavigationProp<MovieStackParamList, "Upcoming">
  route: any
}

const Upcoming: React.FC<UpcomingProps> = () => {
  const { i18n } = useTranslation()
  const language = i18n.language

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background } = useDynamicThemeStyles(darkMode)

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["upcoming", language],
      ({ pageParam = 1 }) => upcoming(pageParam, language),
      {
        getNextPageParam: (lastPage) => lastPage.page + 1,
      },
    )

  const allResults = data?.pages.flatMap((page) => page.results) || []

  return (
    <View style={tw`${background} items-center justify-between`}>
      <FlatList
        getItemLayout={Utils.getItemLayout}
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
          <FlatListItem item={item} index={index} type={"movie"} />
        )}
      />
    </View>
  )
}

export default memo(Upcoming)
