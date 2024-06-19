import React, { useState, useEffect } from "react"
import {
  Modal,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { search } from "../../react-query/search"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import moment from "moment"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { useInfiniteQuery } from "react-query"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState } from "store"
import { MovieStackParamList } from "navigators/MovieStackNavigator"
import { SerieStackParamList } from "navigators/SerieStackNavigator"

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
}

interface Item {
  original_title: string
  media_type: string
  id: number
  release_date: string
  name: string
  first_air_date: string
}

interface Items {
  item: Item
  index: number
}

const SearchModal = ({ visible, setVisible }: Props) => {
  const navigation =
    useNavigation<NavigationProp<MovieStackParamList & SerieStackParamList>>()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const { placeholder, fontSize } = useResponsive()

  const { background, text, colorIcon } = useDynamicThemeStyles(darkMode)

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const [query, setQuery] = useState("")

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    remove,
  } = useInfiniteQuery(
    ["search", language],
    ({ pageParam = 1 }) => search(pageParam, query, language),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
      enabled: false,
    },
  )

  const searchResults = data?.pages.flatMap((page) => page.results) || []

  const resetSearch = () => {
    setQuery("")
    remove()
  }

  const handleSearch = async () => {
    try {
      await refetch()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const renderItemContent = ({ item, index }: Items) => {
    if (item.original_title && item.media_type === "movie") {
      return (
        <TouchableOpacity
          key={index}
          style={[tw`w-full border-slate-100 p-6`, { borderBottomWidth: 2 }]}
          onPress={() => {
            navigation.navigate("MoviesTab", {
              screen: "DetailsMovie",
              params: { id: item.id },
            }),
              resetSearch()
            setVisible(false)
          }}
        >
          <Text style={fontSize(text)}>{`${item.original_title} (${moment(
            item.release_date,
          ).format("YYYY")}) / ${t("utils.film")}`}</Text>
        </TouchableOpacity>
      )
    } else if (item.name) {
      if (item.media_type === "tv") {
        return (
          <TouchableOpacity
            style={[tw`w-full border-slate-100 p-6`, { borderBottomWidth: 2 }]}
            onPress={() => {
              navigation.navigate("SeriesTab", {
                screen: "DetailsSerie",
                params: { id: item.id },
              }),
                resetSearch()
              setVisible(false)
            }}
          >
            <Text style={fontSize(text)}>{`${item.name} (${moment(
              item.first_air_date,
            ).format("YYYY")}) / ${t("utils.serie")}`}</Text>
          </TouchableOpacity>
        )
      }
      if (item.media_type === "person") {
        return (
          <TouchableOpacity
            style={[tw`w-full border-slate-100 p-6`, { borderBottomWidth: 2 }]}
            onPress={() => {
              navigation.navigate("MoviesTab", {
                screen: "DetailsPeople",
                params: { id: item.id },
              }),
                resetSearch()
              setVisible(false)
            }}
          >
            <Text style={fontSize(text)}>{`${item.name} / ${t(
              "utils.celebrity",
            )}`}</Text>
          </TouchableOpacity>
        )
      }
    }
    return null
  }

  const handleModalClose = () => {
    setVisible(false)
    setQuery("")
    resetSearch()
  }

  useEffect(() => {
    if (!visible) {
      resetSearch()
    }
  }, [visible])

  return (
    <View style={tw`flex-1 items-end`}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={handleModalClose}
      >
        <View style={tw`flex-1 justify-start items-stretch ${background}`}>
          <View
            style={tw`flex-row justify-end items-center px-4 pt-4 ${
              Platform.OS === "ios" ? `mt-12` : `mt-4`
            } w-full`}
          >
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <AntDesign
                color={colorIcon}
                name="close"
                size={Utils.moderateScale(35)}
              />
            </TouchableOpacity>
          </View>
          <View style={tw`px-4 mt-4 relative`}>
            <TextInput
              style={placeholder()}
              placeholder={t("utils.search")}
              onChangeText={(text) => setQuery(text)}
              value={query}
              onSubmitEditing={handleSearch}
            />
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => `${item.id}-${index}`}
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
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={tw`ml-auto mr-auto flex-wrap w-full ${background}`}
                  >
                    {renderItemContent({ item, index })}
                  </View>
                )
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default SearchModal
