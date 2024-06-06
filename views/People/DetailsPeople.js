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
import moment from "moment"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import Tabs from "@mod/mobile-common/lib/components/utils/Tabs"
import People from "../../lib/class/People"
import useHandleFavorites from "@mod/mobile-common/lib/hooks/utils/useHandleFavorites"
import AddToFavorite from "../../lib/components/AddToFavorite"
import { useQuery } from "react-query"
import {
  peopleCareer,
  peopleDetails,
  peopleExternalIds,
} from "../../react-query/people"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useIsFocused } from "@react-navigation/native"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const DetailsPeople = ({ route }) => {
  const { id } = route.params
  const isFocused = useIsFocused()

  const [selectedTab, setSelectedTab] = useState("about")

  const { backDropPoster, mediaTitle } = useResponsive()

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const { data: people, isLoading } = useQuery(["people", id, language], () =>
    peopleDetails(id, language),
  )
  const { data: career } = useQuery(["career", id, language], () =>
    peopleCareer(id, language),
  )
  const { data: externalIds } = useQuery(["externalIds", id, language], () =>
    peopleExternalIds(id, language),
  )

  const favorites = useSelector((state) => state.favorites.data)

  const { setItem, handleFavorite, isFavorite } = useHandleFavorites({
    favorites,
    data: {
      id,
      name: people?.name,
      image: people?.profile_path,
      type: "people",
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
        people && (
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
                  uri: `https://image.tmdb.org/t/p/original${people.profile_path}`,
                }}
              />

              <View style={[tw`absolute `, { top: 0, right: 0 }]}>
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
                  {people.name}
                  {People.birth(people, t, i18n)}

                  {people.deathday ? null : People.currentAge(people, t)}

                  {people.deathday ? People.ageDeath(people, t) : null}
                </Text>
              </View>
            </View>
            <Tabs
              people={people}
              career={career}
              t={t}
              language={language}
              id={id}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              externalIds={externalIds}
            />
          </Fragment>
        )
      )}
    </ScrollView>
  )
}

export default DetailsPeople
