import React, { memo } from "react"
import { TouchableOpacity, View, Image, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import tw from "twrnc"
import moment from "moment"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"

const RenderItemPeople = ({ item, idx }) => {
  const navigation = useNavigation()
  const {
    original_title,
    id,
    title,
    poster_path,
    release_date,
    character,
    name,
    first_air_date,
  } = item

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { borderColor, background, text } = useDynamicThemeStyles(darkMode)

  const { imageDetails, detailsRole, fontSize, cardDetails } = useResponsive()

  const handlePress = () => {
    const screen = original_title ? "MoviesTab" : "SeriesTab"
    const detailsScreen = original_title ? "DetailsMovie" : "DetailsSerie"
    navigation.navigate(screen, { screen: detailsScreen, params: { id } })
  }

  const renderText = (content, marginTop = Utils.moderateScale(10)) => (
    <Text
      style={[
        fontSize(text),
        {
          marginLeft: Utils.moderateScale(8),
          marginTop,
          maxWidth: Utils.moderateScale(100),
        },
      ]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {content}
    </Text>
  )

  const renderItemContent = (titleOrName, date) => (
    <View>
      <Image
        style={imageDetails()}
        source={
          poster_path
            ? { uri: `https://image.tmdb.org/t/p/original/${poster_path}` }
            : require("../../../../assets/images/No_Image_Available.jpg")
        }
      />
      <View style={cardDetails()}>
        {renderText(titleOrName)}
        {renderText(moment(date).format("YYYY"))}
        <Text style={detailsRole(text)}>{character}</Text>
      </View>
    </View>
  )

  return (
    <TouchableOpacity
      key={idx}
      style={[tw`${borderColor}`, { borderBottomWidth: 2 }]}
      onPress={handlePress}
    >
      <View style={tw`flex flex-col p-4 ${background}`}>
        {original_title
          ? renderItemContent(title, release_date)
          : renderItemContent(name, first_air_date)}
      </View>
    </TouchableOpacity>
  )
}

export default memo(RenderItemPeople)
