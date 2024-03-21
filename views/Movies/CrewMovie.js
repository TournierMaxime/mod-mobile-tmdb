import React, { memo } from "react"
import { View } from "react-native"
import tw from "twrnc"
import TMDB from "../../lib/class/TMDB"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"

const CrewMovie = ({ credits }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { borderColor } = useDynamicThemeStyles(darkMode)

  return (
    <View
      style={[tw`flex-1 flex flex-col ${borderColor}`, { borderTopWidth: 2 }]}
    >
      {credits?.crew
        ?.map((item, idx) => TMDB.renderItemCastCrew(item, idx))
        .slice(0, 20)}
    </View>
  )
}

export default memo(CrewMovie)
