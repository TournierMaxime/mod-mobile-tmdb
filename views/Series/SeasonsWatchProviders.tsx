import React from "react"
import { Text, View, TouchableOpacity, Image } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import moment from "moment"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { RootState } from "store"
import { SerieStackParamList } from "navigators/SerieStackNavigator"

interface Props {
  id: number
  item: any
  index: number
  language: string
  t: (key: string) => string
}

const SeasonsWatchProviders = ({ id, item, index, language, t }: Props) => {
  const navigation = useNavigation<NavigationProp<SerieStackParamList>>()
  const lang = language.toUpperCase()

  let providerLang: string = lang === "EN" ? "US" : lang

  if (lang === "EN") {
    providerLang = "US"
  }

  const { imageDetails, fontSize, cardDetails } = useResponsive()

  const seasonNumber = item.season_number

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { text, borderColor } = useDynamicThemeStyles(darkMode)

  const { name, poster_path, episode_count, air_date } = item

  return (
    <TouchableOpacity
      key={index}
      style={[tw`${borderColor}`, { borderBottomWidth: 2 }]}
      onPress={() =>
        navigation.navigate("AllEpisodes", {
          id,
          seasonNumber,
        })
      }
    >
      <View style={tw`flex flex-col p-4`}>
        {item ? (
          <View>
            {poster_path ? (
              <Image
                style={imageDetails()}
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
                }}
              />
            ) : (
              <Image
                style={imageDetails()}
                source={require("../../../../assets/images/No_Image_Available.jpg")}
              />
            )}

            <View style={cardDetails()}>
              <Text
                style={[
                  fontSize(text),
                  {
                    marginLeft: Utils.moderateScale(8),
                    marginTop: Utils.moderateScale(10),
                    maxWidth: Utils.moderateScale(100),
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  fontSize(text),
                  {
                    marginLeft: Utils.moderateScale(8),
                    maxWidth: Utils.moderateScale(100),
                  },
                ]}
              >
                {episode_count} {t("episodes")}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  fontSize(text),
                  {
                    marginLeft: Utils.moderateScale(8),
                    maxWidth: Utils.moderateScale(100),
                  },
                ]}
              >
                {moment(air_date).format("YYYY")}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export default SeasonsWatchProviders
