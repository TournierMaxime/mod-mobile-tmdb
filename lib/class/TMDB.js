import React from "react"
import { TouchableOpacity, View, Image, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import tw from "twrnc"
import moment from "moment"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"

class TMDB {
  static renderItemCastCrew = (item, idx) => {
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
        <View style={tw`flex flex-row justify-start ${background} p-4`}>
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
          <View style={tw`flex-1 w-full`}>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
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
      </TouchableOpacity>
    )
  }

  static renderItemPeople = (item, idx) => {
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

    const { imageDetails, detailsRole, fontSize } = useResponsive()

    return original_title ? (
      <TouchableOpacity
        key={idx}
        style={[tw`${borderColor}`, { borderBottomWidth: 2 }]}
        onPress={() =>
          navigation.navigate("DetailsMovie", {
            id,
          })
        }
      >
        <View style={tw`flex flex-row justify-start p-4 ${background}`}>
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
          <View style={tw`flex-1 w-full`}>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
            >
              {title}
            </Text>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
            >
              {moment(release_date).format("YYYY")}{" "}
            </Text>
            <Text style={detailsRole(text)}>{character}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        key={idx}
        onPress={() =>
          navigation.navigate("DetailsSerie", {
            id,
          })
        }
      >
        <View style={tw`flex flex-row justify-start ${background} p-4`}>
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
          <View style={tw`flex-1 w-full`}>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
            >
              {name}
            </Text>
            <Text
              style={[fontSize(text), { marginLeft: Utils.moderateScale(8) }]}
            >
              {moment(first_air_date).format("YYYY")}{" "}
            </Text>
            <Text style={detailsRole(text)}>{character}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default TMDB
