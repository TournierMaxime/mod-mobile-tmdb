import React, { Fragment, useEffect, useState } from "react"
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import { useSelector } from "react-redux"
import { serieDetails, serieCrew } from "../../react-query/series"
import { LinearGradient } from "expo-linear-gradient"
import Runtime from "@mod/mobile-tmdb/lib/components/RunTime"
import Tabs from "@mod/mobile-common/lib/components/utils/Tabs"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import useHandleFavorites from "@mod/mobile-common/lib/hooks/utils/useHandleFavorites"
import AddToFavorite from "../../lib/components/AddToFavorite"
import { useQuery } from "react-query"
import Series from "../../lib/class/Series"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useIsFocused } from "@react-navigation/native"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const DetailsSerie = ({ route }) => {
  const { id } = route.params
  const isFocused = useIsFocused()

  const { backDropPoster, mediaTitle } = useResponsive()

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const { data: serie, isLoading } = useQuery(["serie", id, language], () =>
    serieDetails(id, language),
  )

  const { data: credits } = useQuery(["serieCrew", id, language], () =>
    serieCrew(id, language),
  )

  const [selectedTab, setSelectedTab] = useState("about")

  const favorites = useSelector((state) => state.favorites.data)

  const { setItem, handleFavorite, isFavorite } = useHandleFavorites({
    favorites,
    data: {
      id,
      name: serie?.original_name,
      image: serie?.poster_path,
      type: "serie",
      recommendationId: "",
    },
  })

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background } = useDynamicThemeStyles(darkMode)

  useEffect(() => {
    setItem()
  }, [favorites])

  useEffect(() => {
    if (!isFocused) {
      setSelectedTab("about")
    }
  }, [isFocused])

  return (
    <ScrollView style={tw`flex-1 ${background}`}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        serie && (
          <Fragment>
            <View style={backDropPoster()}>
              <LinearGradient
                colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)"]}
                style={tw`flex w-full h-full relative`}
              />
              <ImageBackground
                style={[
                  tw`w-full h-auto absolute`,
                  {
                    resizeMode: "contain",
                    opacity: 0.4,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                ]}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${serie?.backdrop_path}`,
                }}
              />

              <View style={[tw`absolute`, { top: 0, right: 0 }]}>
                <View style={tw`flex-row`}>
                  <AddToFavorite
                    isFavorite={isFavorite}
                    handleFavorite={handleFavorite}
                  />
                </View>
              </View>

              <View
                style={[
                  tw`absolute flex flex-row flex-wrap flex mt-4`,
                  { bottom: 10 },
                ]}
              >
                <Text style={mediaTitle()}>
                  {serie.name}
                  <Runtime
                    time={serie?.episode_run_time}
                    isMovie={false}
                    t={t}
                  />
                  {" • "}
                  {Series.genres(serie)}
                  {" • "}
                  {Series.creators(serie)}
                </Text>
              </View>
            </View>
            <Tabs
              serie={serie}
              credits={credits}
              t={t}
              language={language}
              id={id}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Fragment>
        )
      )}
    </ScrollView>
  )
}

export default DetailsSerie
