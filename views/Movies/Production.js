import React, { memo } from 'react'
import { View } from 'react-native'
import moment from 'moment'
import tw from 'twrnc'
import Movies from '../../lib/class/Movies'
import {
  movieWatchProviders,
  releaseDates,
} from '../../../../react-query/movies'
import { useQuery } from 'react-query'

const Production = ({ movie, t, language }) => {
  moment.locale(language)
  const lang = language.toUpperCase()

  const { id, budget, revenue, production_companies, production_countries } = movie

  const { data: releases } = useQuery(['releases', id], () =>
    releaseDates(id)
  )
  const { data: providers } = useQuery(['providers', id], () =>
    movieWatchProviders(id)
  )

  return (
    <View style={tw`pb-4 bg-white h-full`}>
      {Movies.releaseByCountry(releases, lang, t)}
      {Movies.budget(budget, t)}
      {Movies.revenue(revenue, t)}
      {Movies.providersByCountry(providers, lang, t)}
      {Movies.productionCompanies(production_companies, t)}
      {Movies.productionCountries(production_countries, t)}
    </View>
  )
}

export default memo(Production)
