import React from 'react'
import {
  Text,
  View,
  FlatList
} from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import SeasonsWatchProviders from './SeasonsWatchProviders'
import tw from 'twrnc'
 
const AllSeasons = ({ route }) => {
  const { title, id } = route.params
  const serie = useSelector((state) => state.serieDetails.data)

  const { t, i18n } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  return (
    <View style={tw`flex-1 flex flex-col mt-4`}>
      <Text style={tw`text-center font-medium text-lg mb-4`}>
        {t('seasonsOf')} {title}
      </Text>
      <FlatList
        data={serie?.seasons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SeasonsWatchProviders item={item} id={id} language={language} t={t} />}
      />
    </View>
  )
}

export default AllSeasons
