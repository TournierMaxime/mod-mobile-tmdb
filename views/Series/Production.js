import React from "react"
import { View } from "react-native"
import tw from "twrnc"
import Series from "../../lib/class/Series"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"

const Production = ({ serie, t }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  return (
    <View style={tw`${background} h-full`}>
      {Series.plot(serie?.overview, t, borderColor, text)}
      {Series.status(serie?.status, t)}
      {Series.networks(serie?.networks, t)}
      {Series.productionCompanies(serie?.production_companies, t)}
      {Series.productionCountries(serie?.production_countries, t)}
    </View>
  )
}

export default Production
