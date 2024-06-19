import React, { memo } from "react"
import { View } from "react-native"
import moment from "moment"
import tw from "twrnc"
import Movies from "../../lib/class/Movies"
import { movieWatchProviders, releaseDates } from "../../react-query/movies"
import { useQuery } from "react-query"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import { RootState } from "store"

interface Props {
  movie: any
  t: (key: string) => string
  language: string
}

const Production = ({ movie, t, language }: Props) => {
  moment.locale(language)
  const lang = language.toUpperCase()

  let providerLang: string = lang === "EN" ? "US" : lang

  if (lang === "EN") providerLang = "US"

  const { id, budget, revenue, production_companies, production_countries } =
    movie

  const { data: releases } = useQuery(["releases", id], () => releaseDates(id))
  const { data: providers } = useQuery(["providers", id], () =>
    movieWatchProviders(id),
  )

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, borderColor, text } = useDynamicThemeStyles(darkMode)

  return (
    <View style={tw`${background} h-full`}>
      {Movies.plot({ data: movie?.overview, t, borderColor, text })}
      {Movies.releaseByCountry({ data: releases, language: providerLang, t })}
      {Movies.budget(budget, t)}
      {Movies.revenue(revenue, t)}
      {Movies.providersByCountry({
        providers,
        languageKey: providerLang,
        t,
        text,
      })}
      {Movies.productionCompanies(production_companies, t)}
      {Movies.productionCountries(production_countries, t)}
    </View>
  )
}

export default memo(Production)
