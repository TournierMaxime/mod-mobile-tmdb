import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  serieDetails,
  serieCrew,
} from '../../redux/actions/series'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '@mod/mobile-tmdb/lib/components/RunTime'
import Rate from '@mod/mobile-tmdb/lib/components/Rate'
import Tabs from '@mod/mobile-common/lib/components/utils/Tabs'
import Refresh from '@mod/mobile-common/lib/components/utils/Refresh'
import OverView from '@mod/mobile-tmdb/lib/components/OverView'
import { useTranslation } from 'react-i18next'
import Utils from '@mod/mobile-common/lib/class/Utils'
import Trailer from '@mod/mobile-tmdb/lib/components/Trailer'
import tw from 'twrnc'

const DetailsSerie = ({ route }) => {
  const dispatch = useDispatch()
  const serie = useSelector((state) => state.serieDetails.data)
  const loading = useSelector((state) => state.serieDetails.loading)
  const { id } = route.params
  const [selectedTab, setSelectedTab] = useState('about')

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const fetchData = useCallback(async () => {
    await dispatch(serieDetails(id, language))
    await dispatch(serieCrew(id, language))
  }, [dispatch, id, language])

  const onRefresh = useCallback(async () => {
    await dispatch(serieDetails(id, language))
    await dispatch(serieCrew(id, language))
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const creators = useMemo(() => {
    return serie?.created_by?.map((credit, index) => {
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
    })
  })

  const genres = useMemo(() => {
    return serie?.genres?.map((genre, index) => (
      <Text
        key={index}
        style={[
          tw`font-medium text-lg rounded-sm m-1 px-4 text-center`,
          { color: '#495057', backgroundColor: '#dee2e6' },
        ]}
      >
        {genre.name}
      </Text>
    ))
  })

  return (
    <View style={tw`flex-1`}>
      <Refresh styles={tw`flex w-full h-full relative`} onRefresh={onRefresh}>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          serie && (
            <Fragment>
              <View style={[tw`flex relative w-full`, { height: Utils.moderateScale(550) }]}>
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

                    <Text style={tw`font-medium text-lg text-white my-2`}>{t('utils.genres')}</Text>

                    <View style={tw`flex flex-row flex-wrap`}>{genres}</View>

                    <Text style={tw`font-medium text-lg text-white my-2`}>{t('utils.direction')}</Text>

                    <View style={tw`flex flex-row flex-wrap`}>
                      {creators}
                    </View>
                    <View style={tw`flex-row`}>
                      <Trailer serie={serie} id={id} />
                    </View>
                  </View>
                </View>

                <OverView content={serie.overview} t={t} />
              </View>
              <Tabs
                serie={serie}
                t={t}
                language={language}
                id={id}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            </Fragment>
          )
        )}
      </Refresh>
    </View>
  )
}

export default DetailsSerie
