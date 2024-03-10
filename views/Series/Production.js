import React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import Series from '../../lib/class/Series'

const Production = ({ serie, t }) => {

  return (
    <View style={tw`bg-white h-full`}>
      {Series.plot(serie?.overview, t)}
      {Series.status(serie?.status, t)}
      {Series.networks(serie?.networks, t)}
      {Series.productionCompanies(serie?.production_companies, t)}
      {Series.productionCountries(serie?.production_countries, t)}
    </View>
  )
}

export default Production
