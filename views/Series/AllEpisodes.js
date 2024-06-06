import React, { useEffect } from "react"
import { Text, View, FlatList, Image } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import { seasonDetails, resetSeasonDetails } from "../../redux/actions/series"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"

const AllEpisodes = ({ route }) => {
  const { id, seasonNumber } = route.params
  const dispatch = useDispatch()
  const season = useSelector((state) => state.seasonDetails.data)

  const { imageDetails, fontSize, plotAndBio } = useResponsive()

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  useEffect(() => {
    dispatch(seasonDetails(id, seasonNumber, language))
  }, [id, seasonNumber])

  useEffect(() => {
    return () => {
      dispatch(resetSeasonDetails())
    }
  }, [])

  const renderItem = (item) => {
    return (
      <View style={[tw`${borderColor}`, { borderBottomWidth: 2 }]}>
        <View style={tw`flex flex-row justify-start ${background} p-4`}>
          {item.still_path ? (
            <Image
              style={imageDetails()}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.still_path}`,
              }}
            />
          ) : (
            <Image
              style={imageDetails()}
              source={require("../../../../assets/images/No_Image_Available.jpg")}
            />
          )}

          <View style={tw`flex-1 w-full`}>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
            >
              {t("Episode")} {item.episode_number}
            </Text>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
            >
              {item.name}
            </Text>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
            >
              {moment(item.air_date).format("LL")}
            </Text>
          </View>
        </View>
        <Text style={plotAndBio(text)}>{item.overview}</Text>
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
        data={season?.episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

export default AllEpisodes
