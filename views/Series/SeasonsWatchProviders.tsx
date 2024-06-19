import React from "react"
import { updateSeasonWatchProviders } from "../../react-query/series"
import { Text, View, TouchableOpacity, ImageBackground } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import Rate from "../../lib/components/Rate"
import moment from "moment"
import tw from "twrnc"
import Series from "../../lib/class/Series"
import { useQuery } from "react-query"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { RootState } from "store"
import { SerieStackParamList } from "navigators/SerieStackNavigator"

interface Props {
  id: number
  item: any
  language: string
  t: (key: string) => string
}

const SeasonsWatchProviders = ({ id, item, language, t }: Props) => {
  const navigation = useNavigation<NavigationProp<SerieStackParamList>>()
  const lang = language.toUpperCase()

  let providerLang: string = lang === "EN" ? "US" : lang

  if (lang === "EN") {
    providerLang = "US"
  }

  const { imageDetails, plotAndBio, fontSize } = useResponsive()

  const seasonNumber = item.season_number

  const { data: providers } = useQuery(["providers", id, seasonNumber], () =>
    updateSeasonWatchProviders(id, seasonNumber),
  )

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  return (
    <TouchableOpacity
      style={[tw`${borderColor} ${background}`, { borderBottomWidth: 2 }]}
      onPress={() =>
        navigation.navigate("AllEpisodes", {
          id,
          seasonNumber,
        })
      }
    >
      <View style={tw`flex flex-row justify-start p-2`}>
        <View style={tw`items-center`}>
          {item.poster_path ? (
            <ImageBackground
              style={imageDetails()}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
            />
          ) : (
            <ImageBackground
              style={imageDetails()}
              source={require("../../../../assets/images/No_Image_Available.jpg")}
            />
          )}
        </View>
        <View style={tw`flex-1 w-full`}>
          <Text
            style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
          >
            {item.name}
          </Text>
          <Text
            style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
          >
            {item.episode_count} {t("episodes")}
          </Text>
          <Text
            style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
          >
            {moment(item.air_date).format("LL")}
          </Text>
          <View style={tw`ml-4 mt-2`}>
            <Rate rate={item.vote_average} />
          </View>
        </View>
      </View>
      <Text style={plotAndBio(text)}>{item.overview}</Text>
      {Series.providersByCountry({
        providers,
        languageKey: providerLang,
        t,
        text,
      })}
    </TouchableOpacity>
  )
}

export default SeasonsWatchProviders
