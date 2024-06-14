import React from "react"
import { TouchableOpacity, View, Image, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"

const RenderItemCastCrew = ({ item, idx }) => {
  const navigation = useNavigation()
  const { id, name, profile_path, character, job, department } = item

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { borderColor, background, text } = useDynamicThemeStyles(darkMode)

  const { imageDetails, fontSize, detailsRole } = useResponsive()

  return (
    <TouchableOpacity
      key={idx}
      style={[tw`${borderColor}`, { borderBottomWidth: 2 }]}
      onPress={() =>
        navigation.navigate("DetailsPeople", {
          id,
        })
      }
    >
      <View style={tw`flex flex-col ${background} p-4`}>
        {profile_path ? (
          <View>
            <Image
              style={imageDetails()}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${profile_path}`,
              }}
            />
            <View
              style={tw`border-b border-r border-l border-slate-200 rounded-b-md max-w-90 h-40`}
            >
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
              <Text style={detailsRole(text)}>{character}</Text>
              {job ? <Text style={detailsRole(text)}>{job}</Text> : null}
              {department ? (
                <Text style={detailsRole(text)}>{department}</Text>
              ) : null}
            </View>
          </View>
        ) : (
          <View>
            <Image
              style={imageDetails()}
              source={require("../../../../assets/images/No_Image_Available.jpg")}
            />
            <View
              style={tw`border-b border-r border-l border-slate-200 rounded-b-md max-w-90 h-40`}
            >
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
              <Text style={detailsRole(text)}>{character}</Text>
              {job ? <Text style={detailsRole(text)}>{job}</Text> : null}
              {department ? (
                <Text style={detailsRole(text)}>{department}</Text>
              ) : null}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default RenderItemCastCrew
