import React from 'react'
import { View } from 'react-native'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import SeasonsWatchProviders from './SeasonsWatchProviders'
import tw from 'twrnc'

const AllSeasons = ({ serie }) => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  return (
    <View
      style={[tw`flex-1 flex flex-col border-slate-200`, { borderTopWidth: 2 }]}
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
