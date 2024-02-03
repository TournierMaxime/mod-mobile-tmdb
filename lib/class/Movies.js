import React from 'react'
import { View, Text } from 'react-native'
import Utils from '@mod/mobile-common/lib/class/Utils'
import Accordion from '../../../../lib/components/utils/Accordion'
import tw from 'twrnc'
import moment from 'moment'

class Movies {
  static productionCompanies = (data, t) => {
    if (!data) return null
    return (
      <Accordion title={t('utils.producers')}>
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

  static productionCountries = (data, t) => {
    if (!data) return null
    return (
      <Accordion title={t('utils.country')}>
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

  static releaseByCountry = (releaseDates, language, t) => {
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
      <View style={[tw`border-slate-100`, { borderTopWidth: 2 }]}>
        <Accordion title={t('utils.release')}>
          <View style={tw`flex flex-col`}>
            {releaseDates.map((releaseDate, index) => {
              if (releaseDate.iso_3166_1 !== language) return null
              return (
                <View key={index}>
                  {releaseDate.release_dates.map((releaseDate, index) => {
                    return (
                      <View style={tw`flex-col justify-between`} key={index}>
                        <Text
                          style={[
                            tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                            { color: '#495057', backgroundColor: '#dee2e6' },
                          ]}
                        >
                          {moment(releaseDate.release_date).format('L')}{' '}
                          {releaseDate.note
                            ? `- ${releaseDate.note}`
                            : `- ${t('utils.nationalRelease')}`}
                        </Text>
                      </View>
                    )
                  })}
                </View>
              )
            })}
          </View>
        </Accordion>
      </View>
    )
  }

  static budget = (data, t) => {
    if (!data) return null
    return (
      <Accordion title={t('utils.budget')}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: '#495057', backgroundColor: '#dee2e6' },
              ]}
            >
              {Utils.numberWithCommas(data)}$
            </Text>
          </View>
        </View>
      </Accordion>
    )
  }

  static revenue = (data, t) => {
    if (!data) return null

    return (
      <Accordion title={t('utils.boxOffice')}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text
              style={[
                tw`font-medium text-lg rounded-md ml-4 mr-auto my-2 w-auto py-2 px-4 text-center leading-7`,
                { color: '#495057', backgroundColor: '#dee2e6' },
              ]}
            >
              {Utils.numberWithCommas(data)}$
            </Text>
          </View>
        </View>
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

    if (!providers?.[language]?.flatrate) {
      return null
    }

    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4`}>{t('utils.flatrate')}</Text>
        {providers?.[language]?.flatrate?.map((provider, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text
                style={[
                  tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                  { color: '#495057', backgroundColor: '#dee2e6' },
                ]}
              >
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
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
    if (!providers?.[language]?.buy) {
      return null
    }

    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4`}>{t('utils.buy')}</Text>
        {providers?.[language]?.buy?.map((provider, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text
                style={[
                  tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                  { color: '#495057', backgroundColor: '#dee2e6' },
                ]}
              >
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  static rent = (providers, languageKey, t) => {
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
    if (!providers?.[language]?.rent) {
      return null
    }

    return (
      <View>
        <Text style={tw`font-medium text-lg ml-4`}>{t('utils.rent')}</Text>
        {providers?.[language]?.buy?.map((provider, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text
                style={[
                  tw`font-medium text-lg py-2 px-4 text-justify leading-7 rounded-md ml-4 mr-auto my-2 w-auto`,
                  { color: '#495057', backgroundColor: '#dee2e6' },
                ]}
              >
                {provider.provider_name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  static providersByCountry = (providers, language, t) => {
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
      <Accordion title={t('utils.available')}>
        <View style={tw`flex flex-col`}>
          <Text style={tw`font-medium text-lg ml-4 mb-4`}>
            {t('utils.contentPoweredByJustWatch')}
          </Text>
          {this.flatrate(providers, language, t)}
          {this.buy(providers, language, t)}
          {this.rent(providers, language, t)}
        </View>
      </Accordion>
    )
  }
}

export default Movies
