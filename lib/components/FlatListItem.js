import React, { memo } from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import tw from "twrnc"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const FlatListItem = memo(({ item, idx, type }) => {
  const navigation = useNavigation()
  const { imagePoster } = useResponsive()

  const handlePress = () => {
    if (item.media_type === "movie" || type === "movie") {
      navigation.navigate("MoviesTab", {
        screen: "DetailsMovie",
        params: { id: item.id },
      })
    } else if (item.media_type === "tv" || type === "tv") {
      navigation.navigate("SeriesTab", {
        screen: "DetailsSerie",
        params: { id: item.id },
      })
    }
  }

  return (
    <View key={idx} style={tw`flex-col justify-between`}>
      <TouchableOpacity onPress={() => handlePress()}>
        <Image
          style={imagePoster()}
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
          }}
        />
      </TouchableOpacity>
    </View>
  )
})

export default FlatListItem
