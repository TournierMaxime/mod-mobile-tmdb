import React, { memo } from "react"
import { View } from "react-native"
import moment from "moment"
import tw from "twrnc"
import TMDB from "../../lib/class/TMDB"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"

const CastPeople = ({ career }) => {
  const sortedCareer = career?.cast?.sort((a, b) => {
    const dateA = moment(a.release_date || a.first_air_date)
    const dateB = moment(b.release_date || b.first_air_date)
    return dateB.diff(dateA)
  })

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { borderColor } = useDynamicThemeStyles(darkMode)

  return (
    <View
      style={[tw`flex-1 flex flex-col ${borderColor}`, { borderTopWidth: 2 }]}
    >
      {sortedCareer?.map((item, idx) => TMDB.renderItemPeople(item, idx))}
    </View>
  )
}

export default memo(CastPeople)
