import React, { Fragment, useEffect, useState, memo } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '../../lib/components/RunTime'
import Rate from '../../lib/components/Rate'
import OverView from '../../lib/components/OverView'
import { useTranslation } from 'react-i18next'
import Utils from '@mod/mobile-common/lib/class/Utils'
import Tabs from '@mod/mobile-common/lib/components/utils/Tabs'
import MovieTrailer from './MovieTrailer'
import tw from 'twrnc'
import useHandleFavorites from '@mod/mobile-common/lib/hooks/utils/useHandleFavorites'
import AddToFavorite from '../../lib/components/AddToFavorite'
import { movieDetails, movieCrew } from '../../react-query/movies'
import { useQuery } from 'react-query'
import Movies from '../../lib/class/Movies'

const DetailsMovie = ({ route }) => {
  const { id } = route.params
  const [selectedTab, setSelectedTab] = useState('about')

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const { data: movie, isLoading } = useQuery(['movie', id, language], () =>
    movieDetails(id, language)
  )
  const { data: credits } = useQuery(['credits', id, language], () =>
    movieCrew(id, language)
  )

  const favorites = useSelector((state) => state.favorites.data)

  const { setItem, handleFavorite, isFavorite } = useHandleFavorites({
    favorites,
    data: {
      id,
      name: movie?.original_title,
      image: movie?.poster_path,
      type: 'movie',
      recommendationId: ""
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
        movie && (
          <Fragment>
            <View
              style={[
                tw`flex relative w-full`,
                { height: Utils.moderateScale(550) },
              ]}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                style={tw`w-full h-full relative flex`}
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
                  uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                }}
              />

              <View
                style={tw`flex flex-row absolute items-center justify-between w-full`}
              >
                <View>
                  <Text
                    style={[
                      tw`font-medium text-xl text-white my-4 w-full`,
                      { left: 15, top: 5 },
                    ]}
                  >
                    {movie.title}
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
                      uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                    }}
                  />
                  <Rate rate={movie.vote_average} />
                </View>

                <View style={tw`flex flex-col w-1/2`}>
                  <Runtime time={movie.runtime} isMovie={true} t={t} />

                  <Text style={tw`font-medium text-xl text-white my-2`}>
                    {t('utils.genres')}
                  </Text>

                  <View style={tw`flex flex-row flex-wrap`}>{Movies.genres(movie)}</View>

                  <Text style={tw`font-medium text-xl text-white my-2`}>
                    {t('utils.direction')}
                  </Text>

                  <View style={tw`flex flex-row flex-wrap`}>{Movies.directors(credits)}</View>
                  <View style={tw`flex-row`}>
                    <MovieTrailer id={id} />
                    <AddToFavorite
                      isFavorite={isFavorite}
                      handleFavorite={handleFavorite}
                    />
                  </View>
                </View>
              </View>

              <OverView content={movie.overview} t={t} />
            </View>
            <Tabs
              id={id}
              movie={movie}
              credits={credits}
              t={t}
              language={language}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Fragment>
        )
      )}
    </ScrollView>
  )
}

export default memo(DetailsMovie)
