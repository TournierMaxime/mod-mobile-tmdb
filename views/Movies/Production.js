import React from 'react'
import { View, Text } from 'react-native'
import Utils from '@mod/mobile-common/lib/class/Utils'
import moment from 'moment'
import Accordion from '../../../components/Accordion'
import { useSelector } from 'react-redux'
import MovieWatchProviders from './MovieWatchProviders'
import tw from 'twrnc'

const Production = ({ id, movie, t, language }) => {
  moment.locale(language)
  const lang = language.toUpperCase()

  const releases = useSelector((state) => state.releaseDates.data.results)

  const productionCompanies = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('producers')}>
        <View style={tw`flex flex-col`}>
          {data?.map((item, index) => {
            return (
              <View key={index} style={tw`flex-col justify-between`}>
                <Text
                  style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  const productionCountries = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('country')}>
        <View style={tw`flex flex-col`}>
          {data?.map((item, index) => {
            return (
              <View key={index} style={tw`flex-col justify-between`}>
                <Text style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}>{item.name}</Text>
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  const releaseByCountry = (releaseDates, language) => {
    switch (language) {
      case 'EN-GB':
        language = 'US'
        break
      case 'ZH-CN':
        language = 'CN'
        break
      case 'JA':
        language = 'JP'
        break
      case 'KO':
        language = 'KR'
        break
    }
    return (
      <Accordion title={t('release')}>
        <View style={tw`flex flex-col`}>
          {releaseDates.map((releaseDate, index) => {
            if (releaseDate.iso_3166_1 !== language) return null
            return (
              <View key={index}>
                {releaseDate.release_dates.map((releaseDate, index) => {
                  return (
                    <View style={tw`flex-col justify-between`} key={index}>
                      <Text style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}>
                        {moment(releaseDate.release_date).format('L')}{' '}
                        {releaseDate.note
                          ? `- ${releaseDate.note}`
                          : `- ${t('nationalRelease')}`}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  const budget = (data) => {
    if (!data) return null
    return (
      <Accordion title={t('budget')}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}>{Utils.numberWithCommas(data)}$</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  const revenue = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('boxOffice')}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text style={[
                    tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                    { color: '#495057', backgroundColor: '#dee2e6' },
                  ]}>{Utils.numberWithCommas(data)}$</Text>
          </View>
        </View>
      </Accordion>
    )
  }

  return (
    <View style={tw`my-4 pb-4`}>
      <View style={tw`flex flex-row my-2`}>
        <Text style={tw`font-medium text-lg m-2`}>{t('production')}</Text>
      </View>
      {releaseByCountry(releases, lang)}
      {budget(movie?.budget)}
      {revenue(movie?.revenue)}
      <MovieWatchProviders id={id} language={lang} t={t} />
      {productionCompanies(movie?.production_companies)}
      {productionCountries(movie?.production_countries)}
    </View>
  )
}

export default Production
