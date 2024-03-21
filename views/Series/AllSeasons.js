import React from "react"
import { View } from "react-native"
import moment from "moment"
import { useTranslation } from "react-i18next"
import SeasonsWatchProviders from "./SeasonsWatchProviders"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"

const AllSeasons = ({ serie }) => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { borderColor } = useDynamicThemeStyles(darkMode)

  return (
    <View
      style={[tw`flex-1 flex flex-col ${borderColor}`, { borderTopWidth: 2 }]}
    >
      {serie?.seasons?.map((item, idx) => (
        <SeasonsWatchProviders
          key={idx}
          item={item}
          id={serie?.id}
          language={language}
          t={t}
        />
      ))}
    </View>
  )
}

export default AllSeasons
