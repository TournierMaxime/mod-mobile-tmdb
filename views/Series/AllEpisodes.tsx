import React, { useEffect } from "react"
import { Text, View, FlatList, Image } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { seasonDetails, reset } from "../../redux/actions/series"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { AppDispatch, RootState } from "store"
import { NavigationProp } from "@react-navigation/native"
import { SerieStackParamList } from "navigators/SerieStackNavigator"

interface AllEpisodesProps {
  i18n: any
  t: any
  navigation: NavigationProp<SerieStackParamList, "AllEpisodes">
  route: any
}

interface Item {
  id: number
  still_path: string
  episode_number: number
  name: string
  air_date: string
  overview: string
}

interface Season {
  episodes: Item[]
}

const AllEpisodes: React.FC<AllEpisodesProps> = ({ route }) => {
  const { id, seasonNumber } = route.params

  const dispatch: AppDispatch = useDispatch()

  const season = useSelector((state: RootState) => state.seasonDetails.data)

  const { episodeDetails, fontSize, plotAndBio } = useResponsive()

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  useEffect(() => {
    dispatch(seasonDetails(id, seasonNumber, language))
  }, [id, seasonNumber])

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [])

  const { episodes } = season

  const renderItem = (item: Item, index: number) => {
    const { still_path, episode_number, name, overview } = item
    return (
      <View key={index} style={[tw`${borderColor}`, { borderBottomWidth: 2 }]}>
        <View style={tw`flex flex-row justify-start ${background} p-4`}>
          {still_path ? (
            <Image
              style={episodeDetails()}
              source={{
                uri: `https://image.tmdb.org/t/p/original${item.still_path}`,
              }}
            />
          ) : (
            <Image
              style={episodeDetails()}
              source={require("../../../../assets/images/No_Image_Available.jpg")}
            />
          )}

          <View style={tw`flex-1 w-full`}>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
            >
              {t("Episode")} {episode_number}
            </Text>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
            >
              {name}
            </Text>
          </View>
        </View>
        <Text style={plotAndBio(text)}>{overview}</Text>
      </View>
    )
  }

  return (
    <View
      style={[
        tw`${background} flex-1 flex flex-col ${borderColor}`,
        { borderTopWidth: 2 },
      ]}
    >
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </View>
  )
}

export default AllEpisodes
