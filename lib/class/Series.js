import React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import Accordion from '@mod/mobile-common/lib/components/utils/Accordion'

class Series {
  static status = (data, t) => {
    if (!data) return null

    const statusSerie = () => {
      switch (data) {
        case 'Returning Series':
          return (
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: '#495057', backgroundColor: '#dee2e6' },
              ]}
            >
              {t('utils.returningSeries')}
            </Text>
          )
        case 'Ended':
          return (
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: '#495057', backgroundColor: '#dee2e6' },
              ]}
            >
              {t('utils.ended')}
            </Text>
          )
      }
    }

    return (
      <View style={[tw`border-slate-100`, { borderTopWidth: 2 }]}>
        <Accordion title={t('utils.status')}>
          <View style={tw`flex flex-col`}>
            <View style={tw`flex-col justify-between`}>{statusSerie()}</View>
          </View>
        </Accordion>
      </View>
    )
  }

  static networks = (data, t) => {
    if (!data) return null

    return (
      <Accordion title={t('utils.diffusers')}>
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
      </Accordion>
    )
  }

  static productionCompanies = (data, t) => {
    if (!data) return null

    return (
      <Accordion title={t('utils.producers')}>
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
      </Accordion>
    )
  }

  static productionCountries = (data, t) => {
    if (!data) return null

    return (
      <Accordion title={t('utils.country')}>
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
      </Accordion>
    )
  }

  static flatrate = (providers, languageKey, t) => {
    let language = languageKey

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

    if (!providers?.watchProviders?.results[language]?.flatrate) {
      return null
    }
    if (providers.seasonNumber !== seasonNumber) return null
    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4`}>{t('flatrate')}</Text>
        {providers.watchProviders.results[language]?.flatrate?.map(
          (provider, index) => {
            return (
              <Text
                style={[
                  tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                  { color: '#495057', backgroundColor: '#dee2e6' },
                ]}
                key={index}
              >
                {provider.provider_name}
              </Text>
            )
          }
        )}
      </View>
    )
  }

  static buy = (providers, languageKey, t) => {
    let language = languageKey

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
    if (!providers?.watchProviders?.results[language]?.buy) {
      return null
    }
    if (providers.seasonNumber !== seasonNumber) return null
    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4`}>{t('buy')}</Text>
        {providers.watchProviders.results[language]?.buy?.map(
          (provider, index) => {
            return (
              <Text
                style={[
                  tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                  { color: '#495057', backgroundColor: '#dee2e6' },
                ]}
                key={index}
              >
                {provider.provider_name}
              </Text>
            )
          }
        )}
      </View>
    )
  }

  static providersByCountry = (providers, lang) => {
    switch (lang) {
      case 'EN-GB':
        lang = 'US'
        break
      case 'ZH-CN':
        lang = 'CN'
        break
      case 'JA':
        lang = 'JP'
        break
      case 'KO':
        lang = 'KR'
        break
    }

    const seasonProviders = providers.find(
      (provider) => provider.seasonNumber === seasonNumber
    )

    return (
      <View>
        {this.flatrate(seasonProviders, lang)}
        {this.buy(seasonProviders, lang)}
      </View>
    )
  }

  static creators = (data) => {
    return data?.created_by?.map((credit, index) => {
      if (!credit.name) return null
      return (
        <Text
          key={index}
          style={[
            tw`font-medium text-lg rounded-sm m-1 px-4 text-center`,
            { color: '#495057', backgroundColor: '#dee2e6' },
          ]}
        >
          {credit.name}
        </Text>
      )
    }).slice(0, 1)
  }

  static genres = (data) => {
    return data?.genres?.map((genre, index) => (
      <Text
        key={index}
        style={[
          tw`font-medium text-lg rounded-sm m-1 px-4 text-center`,
          { color: '#495057', backgroundColor: '#dee2e6' },
        ]}
      >
        {genre.name}
      </Text>
    )).slice(0, 2)
  }
}

export default Series
