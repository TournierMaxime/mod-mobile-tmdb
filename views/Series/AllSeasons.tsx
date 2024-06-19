import React from "react"
import { View, FlatList } from "react-native"
import moment from "moment"
import { useTranslation } from "react-i18next"
import SeasonsWatchProviders from "./SeasonsWatchProviders"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import { RootState } from "store"

interface AllSeasonsProps {
  serie: SerieProps
}

interface SerieProps {
  id: number
  index: number
  vote_average: number
  seasons: []
}

const AllSeasons: React.FC<AllSeasonsProps> = ({ serie }) => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const { id, seasons } = serie

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { borderColor } = useDynamicThemeStyles(darkMode)

  return (
    <View
      style={[tw`flex-1 flex flex-col ${borderColor}`, { borderTopWidth: 2 }]}
    >
      <FlatList
        data={seasons}
        horizontal
        renderItem={({ item, index }) => (
          <SeasonsWatchProviders
            index={index}
            item={item}
            id={id}
            language={language}
            t={t}
          />
        )}
      />
    </View>
  )
}

export default AllSeasons
