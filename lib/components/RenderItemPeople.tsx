import React, { memo } from "react"
import { TouchableOpacity, View, Image, Text } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import tw from "twrnc"
import moment from "moment"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { RootState } from "store"
import { MovieStackParamList } from "navigators/MovieStackNavigator"
import { SerieStackParamList } from "navigators/SerieStackNavigator"

interface Item {
  id: number
  original_title: string
  title: string
  poster_path: string
  release_date: string
  character: string
  name: string
  first_air_date: string
}

interface Props {
  item: Item
  index: number
}

const RenderItemPeople = ({ item, index }: Props) => {
  const navigation =
    useNavigation<NavigationProp<MovieStackParamList & SerieStackParamList>>()
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

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text } = useDynamicThemeStyles(darkMode)

  const { imageDetails, detailsRole, cardDetails, fontSize } = useResponsive()

  const handlePress = () => {
    const screen = original_title ? "MoviesTab" : "SeriesTab"
    const detailsScreen = original_title ? "DetailsMovie" : "DetailsSerie"
    navigation.navigate(screen, { screen: detailsScreen, params: { id } })
  }

  const renderItemContent = (titleOrName: string, date: string) => (
    <View>
      <Image
        style={[imageDetails(), { marginBottom: Utils.moderateScale(8) }]}
        source={
          poster_path
            ? { uri: `https://image.tmdb.org/t/p/original/${poster_path}` }
            : require("../../../../assets/images/No_Image_Available.jpg")
        }
      />
      <View style={cardDetails()}>
        <Text style={detailsRole(text)}>{titleOrName}</Text>
        <Text style={detailsRole(text)}>{character}</Text>
        <Text style={detailsRole(text)}>{moment(date).format("YYYY")}</Text>
      </View>
    </View>
  )

  return (
    <TouchableOpacity key={index} onPress={handlePress}>
      <View style={tw`flex flex-col p-4 ${background}`}>
        {renderItemContent(title ?? name, release_date ?? first_air_date)}
      </View>
    </TouchableOpacity>
  )
}

export default memo(RenderItemPeople)
