import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'react-native'
import Accordion from '@mod/mobile-common/lib/components/utils/Accordion'
import tw from 'twrnc'

const MovieWatchProviders = ({ language, t }) => {
  const providers = useSelector(
    (state) => state.movieWatchProviders.data.results
  )

  const flatrate = (providers, languageKey) => {
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
        <Text style={tw`font-medium text-lg ml-4`}>{t('flatrate')}</Text>
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

  const buy = (providers, languageKey) => {
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
        <Text style={tw`font-medium text-lg ml-4`}>{t('buy')}</Text>
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

  const rent = (providers, languageKey) => {
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
        <Text style={tw`font-medium text-lg ml-4`}>{t('rent')}</Text>
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

  const providersByCountry = (providers, language) => {
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
      <Fragment>
        {flatrate(providers, language)}
        {buy(providers, language)}
        {rent(providers, language)}
      </Fragment>
    )
  }

  return (
    <Accordion title={t('available')}>
      <View style={tw`flex flex-col`}>
        <Text style={tw`font-medium text-lg ml-4 mb-4`}>
          {t('contentPoweredByJustWatch')}
        </Text>
        <View>{providersByCountry(providers, language)}</View>
      </View>
    </Accordion>
  )
}

export default MovieWatchProviders
