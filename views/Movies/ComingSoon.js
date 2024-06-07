import React, { memo } from "react"
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import { useInfiniteQuery } from "react-query"
import { upcoming } from "../../react-query/movies"
import moment from "moment"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const ComingSoon = () => {
  const navigation = useNavigation()

  const { imagePoster } = useResponsive()

  const { t, i18n } = useTranslation()
  const language = i18n.language

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["upcoming", language],
      ({ pageParam = 1 }) => upcoming(pageParam, language),
      {
        getNextPageParam: (lastPage) => lastPage.page + 1,
      },
    )

  const allResults = data?.pages.flatMap((page) => page.results) || []

  const now = moment().format("YYYY-MM-DD")

  const darkMode = useSelector((state) => state.theme.darkMode)

  const { background, text } = useDynamicThemeStyles(darkMode)

  const filter = allResults
    .filter((data) => {
      if (data.release_date > now) {
        return data
      }
    })
    .slice(0, 8)

  return (
    <View style={tw`${background} flex-1 items-center justify-between`}>
      <FlatList
        data={filter}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={
          <Text style={tw`font-medium text-xl text-center mt-4 ${text}`}>
            {t("utils.comingSoon")}
          </Text>
        }
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
        renderItem={({ item }) => {
          return (
            <View style={tw`flex-col justify-between`}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MoviesTab", {
                    screen: "DetailsMovie",
                    params: { id: item.id },
                  })
                }
              >
                <Image
                  style={imagePoster()}
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

export default memo(ComingSoon)
