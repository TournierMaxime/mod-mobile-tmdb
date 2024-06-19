import React, { memo } from "react"
import { TouchableOpacity, View, Image, Text } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { RootState } from "store"
import { MovieStackParamList } from "navigators/MovieStackNavigator"
import { SerieStackParamList } from "navigators/SerieStackNavigator"

interface Item {
  id: number
  name: string
  profile_path: string
  character: string
  job: string
  department: string
}

interface Props {
  item: Item
  index: number
}

const RenderItemCastCrew = ({ item, index }: Props) => {
  const navigation =
    useNavigation<NavigationProp<MovieStackParamList & SerieStackParamList>>()
  const { id, name, profile_path, character, job, department } = item

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { borderColor, background, text } = useDynamicThemeStyles(darkMode)

  const { imageDetails, fontSize, detailsRole, cardDetails } = useResponsive()

  return (
    <TouchableOpacity
      key={index}
      style={[tw`${borderColor}`, { borderBottomWidth: 2 }]}
      onPress={() =>
        navigation.navigate("DetailsPeople", {
          id,
        })
      }
    >
      <View style={tw`flex flex-col ${background} p-4`}>
        {item ? (
          <View>
            {profile_path ? (
              <Image
                style={imageDetails()}
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${profile_path}`,
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
              {character ? (
                <Text
                  style={detailsRole(text)}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {character}
                </Text>
              ) : null}
              {job ? (
                <Text
                  style={detailsRole(text)}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {job}
                </Text>
              ) : null}
              {department ? (
                <Text
                  style={detailsRole(text)}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {department}
                </Text>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export default memo(RenderItemCastCrew)
