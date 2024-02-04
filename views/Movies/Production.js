import React, { memo } from 'react'
import { View } from 'react-native'
import moment from 'moment'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import Movies from '../../lib/class/Movies'

const Production = ({ movie, t, language }) => {
  moment.locale(language)
  const lang = language.toUpperCase()

  const releases = useSelector((state) => state.releaseDates.data.results)

    const providers = useSelector(
    (state) => state.movieWatchProviders.data.results
    )

  return (
    <View style={tw`pb-4 bg-white h-full`}>
      {Movies.releaseByCountry(releases, lang, t)}
      {Movies.budget(movie?.budget, t)}
      {Movies.revenue(movie?.revenue, t)}
      {Movies.providersByCountry(providers, lang, t)}
      {Movies.productionCompanies(movie?.production_companies, t)}
      {Movies.productionCountries(movie?.production_countries, t)}
    </View>
  )
}

export default memo(Production)
