import React, { Fragment, useEffect, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { useSelector } from 'react-redux'
import { serieDetails, serieCrew } from '../../react-query/series'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '@mod/mobile-tmdb/lib/components/RunTime'
import Rate from '@mod/mobile-tmdb/lib/components/Rate'
import Tabs from '@mod/mobile-common/lib/components/utils/Tabs'
import OverView from '@mod/mobile-tmdb/lib/components/OverView'
import { useTranslation } from 'react-i18next'
import Utils from '@mod/mobile-common/lib/class/Utils'
import tw from 'twrnc'
import useHandleFavorites from '@mod/mobile-common/lib/hooks/utils/useHandleFavorites'
import AddToFavorite from '../../lib/components/AddToFavorite'
import { useQuery } from 'react-query'
import Series from '../../lib/class/Series'
import SerieTrailer from './SerieTrailer'

const DetailsSerie = ({ route }) => {
  const { id } = route.params

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const { data: serie, isLoading } = useQuery(['serie', id, language], () =>
    serieDetails(id, language)
  )

  const { data: credits } = useQuery(['serieCrew', id, language], () =>
    serieCrew(id, language)
  )

  const [selectedTab, setSelectedTab] = useState('about')

  const favorites = useSelector((state) => state.favorites.data)

  const { setItem, handleFavorite, isFavorite } = useHandleFavorites({
    favorites,
    data: {
      id,
      name: serie?.original_name,
      image: serie?.poster_path,
      type: 'serie',
      recommendationId: '',
    },
  })

  useEffect(() => {
    setItem()
  }, [favorites])

  return (
    <ScrollView style={tw`flex-1`}>
      {isLoading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        serie && (
          <Fragment>
            <View
              style={[
                tw`flex relative w-full`,
                { height: Utils.moderateScale(550) },
              ]}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                style={tw`flex w-full h-full relative`}
              />
              <ImageBackground
                style={[
                  tw`w-full h-full absolute`,
                  {
                    resizeMode: 'contain',
                    opacity: 0.3,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                ]}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${serie?.backdrop_path}`,
                }}
              />

              <View
                style={tw`flex flex-row absolute items-center justify-between w-full`}
              >
                <View>
                  <Text
                    style={[
                      tw`font-medium text-lg text-white my-4 w-full`,
                      { left: 15, top: 5 },
                    ]}
                  >
                    {serie.name}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  tw`absolute flex-row justify-around items-start flex mt-4`,
                  { top: '10%', left: 0, right: 0, bottom: 0 },
                ]}
              >
                <View style={tw`flex flex-col items-center`}>
                  <Image
                    style={[tw`w-30 h-50 rounded-md`, { resizeMode: 'cover' }]}
                    source={{
                      uri: `https://image.tmdb.org/t/p/original${serie?.poster_path}`,
                    }}
                  />
                  <Rate rate={serie.vote_average} />
                </View>

                <View style={tw`flex flex-col w-1/2`}>
                  <Runtime
                    time={serie.episode_run_time}
                    isMovie={false}
                    t={t}
                  />

                  <Text style={tw`font-medium text-lg text-white my-2`}>
                    {t('utils.genres')}
                  </Text>

                  <View style={tw`flex flex-row flex-wrap`}>
                    {Series.genres(serie)}
                  </View>

                  <Text style={tw`font-medium text-lg text-white my-2`}>
                    {t('utils.direction')}
                  </Text>

                  <View style={tw`flex flex-row flex-wrap`}>
                    {Series.creators(serie)}
                  </View>
                  <View style={tw`flex-row`}>
                    <SerieTrailer id={id} />
                    <AddToFavorite
                      isFavorite={isFavorite}
                      handleFavorite={handleFavorite}
                    />
                  </View>
                </View>
              </View>

              <OverView content={serie.overview} t={t} />
            </View>
            <Tabs
              serie={serie}
              credits={credits}
              t={t}
              language={language}
              id={id}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Fragment>
        )
      )}
    </ScrollView>
  )
}

export default DetailsSerie
