import React, { Fragment, useEffect, useState } from "react"
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import { useSelector } from "react-redux"
import { LinearGradient } from "expo-linear-gradient"
import Runtime from "../../lib/components/RunTime"
import { useTranslation } from "react-i18next"
import Tabs from "@mod/mobile-common/lib/components/utils/Tabs"
import tw from "twrnc"
import useHandleFavorites from "@mod/mobile-common/lib/hooks/utils/useHandleFavorites"
import AddToFavorite from "../../lib/components/AddToFavorite"
import { movieDetails, movieCrew } from "../../react-query/movies"
import { useQuery } from "react-query"
import Movies from "../../lib/class/Movies"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useIsFocused } from "@react-navigation/native"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState } from "store"
import { NavigationProp } from "@react-navigation/native"
import { MovieStackParamList } from "navigators/MovieStackNavigator"

interface DetailsMovieProps {
  i18n: any
  t: any
  navigation: NavigationProp<MovieStackParamList, "DetailsMovie">
  route: any
}

const DetailsMovie = ({ route }: DetailsMovieProps) => {
  const { id } = route.params

  const isFocused = useIsFocused()

  const { backDropPoster, mediaTitle } = useResponsive()

  const [selectedTab, setSelectedTab] = useState("about")

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const { data: movie, isLoading } = useQuery(["movie", id, language], () =>
    movieDetails(id, language),
  )
  const { data: credits } = useQuery(["credits", id, language], () =>
    movieCrew(id, language),
  )

  const favorites = useSelector((state: RootState) => state.favorites.data)

  const { setItem, handleFavorite, isFavorite } = useHandleFavorites({
    favorites,
    data: {
      id,
      name: movie?.original_title,
      image: movie?.poster_path,
      type: "movie",
      recommendationId: "",
    },
  })

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
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
        movie && (
          <Fragment>
            <View style={backDropPoster()}>
              <LinearGradient
                colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)"]}
                style={tw`w-full h-full relative flex`}
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
                  uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
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
                  {movie.title}
                  <Runtime time={movie?.runtime} isMovie={true} />
                  {Movies.genres({ data: movie })}
                  {Movies.directors({ data: credits })}
                </Text>
              </View>
            </View>
            <Tabs
              id={id}
              movie={movie}
              credits={credits}
              t={t}
              language={language}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              career={undefined}
              people={undefined}
              serie={undefined}
              externalIds={undefined}
            />
          </Fragment>
        )
      )}
    </ScrollView>
  )
}

export default DetailsMovie
