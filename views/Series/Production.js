import React from 'react'
import { View, Text } from 'react-native'
import Accordion from '@mod/mobile-common/lib/components/utils/Accordion'
import tw from 'twrnc'

const Production = ({ serie, t }) => {
  const status = (data) => {
    if (!data) return null

    const statusSerie = () => {
      switch (data) {
        case 'Returning Series':
          return <Text style={[tw`font-medium text-lg rounded-md ml-4 mr-auto w-auto py-2 px-4 text-center leading-7`, { color: '#495057', backgroundColor: '#dee2e6' }]}>{t('returningSeries')}</Text>
        case 'Ended':
          return <Text style={[tw`font-medium text-lg rounded-md ml-4 mr-auto w-auto py-2 px-4 text-center leading-7`, { color: '#495057', backgroundColor: '#dee2e6' }]}>{t('ended')}</Text>
      }
    }

    return (
      <Accordion title={t('status')}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>{statusSerie()}</View>
        </View>
      </Accordion>
    )
  }

  const networks = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('diffusers')}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={[tw`font-medium text-lg rounded-md ml-4 mr-auto w-auto py-2 px-4 text-center leading-7`, { color: '#495057', backgroundColor: '#dee2e6' }]}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  const productionCompanies = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('producers')}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={[tw`font-medium text-lg rounded-md ml-4 mr-auto w-auto py-2 px-4 text-center leading-7`, { color: '#495057', backgroundColor: '#dee2e6' }]}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  const productionCountries = (data) => {
    if (!data) return null

    return (
      <Accordion title={t('country')}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={[tw`font-medium text-lg rounded-md ml-4 mr-auto w-auto py-2 px-4 text-center leading-7`, { color: '#495057', backgroundColor: '#dee2e6' }]}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  return (
    <View style={tw`my-4 pb-4`}>
      <View style={tw`flex flex-row my-2`}>
        <Text style={tw`font-medium text-lg m-2`}>{t('production')}</Text>
      </View>
      {status(serie?.status)}
      {networks(serie?.networks)}
      {productionCompanies(serie?.production_companies)}
      {productionCountries(serie?.production_countries)}
    </View>
  )
}

export default Production
