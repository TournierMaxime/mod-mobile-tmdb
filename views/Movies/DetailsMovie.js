import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  movieDetails,
  resetMovieDetails,
  movieCrew,
  releaseDates,
  movieWatchProviders,
  resetMovieWatchProviders,
} from '../../redux/actions/movies'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '../../lib/components/RunTime'
import Rate from '../../lib/components/Rate'
import Refresh from '@mod/mobile-common/lib/components/utils/Refresh'
import OverView from '../../lib/components/OverView'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Utils from '@mod/mobile-common/lib/class/Utils'
import Tabs from '@mod/mobile-common/lib/components/utils/Tabs'
import Trailer from '../../lib/components/Trailer'
import tw from 'twrnc'

const DetailsMovie = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const movie = useSelector((state) => state.movieDetails.data)
  const credits = useSelector((state) => state.movieCrew.data)
  const { id } = route.params
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('about')
  const genre = movie?.genres?.find((item) => item.name)

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const fetchData = useCallback(async () => {
    setLoading(true)
    await dispatch(movieDetails(id, language))
    await dispatch(movieCrew(id, language))
    await dispatch(releaseDates(id))
    await dispatch(movieWatchProviders(id))
    setLoading(false)
  }, [dispatch, id, language])

  const onRefresh = useCallback(async () => {
    await dispatch(movieDetails(id, language))
    await dispatch(movieCrew(id, language))
    await dispatch(releaseDates(id))
    await dispatch(movieWatchProviders(id))
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    return () => {
      dispatch(resetMovieDetails())
      dispatch(resetMovieWatchProviders())
    }
  }, [])

  const directors = useMemo(() => {
    return credits?.crew?.map((credit, index) => {
      if (!credit.job === 'Director') return null
      if (credit.job === 'Director') {
        return (
          <Text
            key={index}
            style={[
              tw`font-medium text-lg rounded-sm m-4 px-4 text-center`,
              { color: '#495057', backgroundColor: '#dee2e6' },
            ]}
          >
            {credit.name}
          </Text>
        )
      }
    })
  })

  const genres = useMemo(() => {
    return movie?.genres?.map((genre, index) => (
      <Text
        key={index}
        style={[
          tw`font-medium text-lg rounded-sm m-4 px-4 text-center`,
          { color: '#495057', backgroundColor: '#dee2e6' },
        ]}
      >
        {genre.name}
      </Text>
    ))
  })

  const OverViewMemoized = React.memo(OverView)
  const AddToFavoriteMemoized = React.memo(AddToFavorite)
  //const AddToWatchListMemoized = React.memo(AddToWatchList)

  return (
    <View style={tw`flex-1`}>
      <Refresh styles={tw`flex w-full h-full relative`} onRefresh={onRefresh}>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          movie && (
            <Fragment>
              <View style={tw`flex relative w-full h-60`}>
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
                        tw`font-medium text-lg text-white my-4 w-25`,
                        { left: 15, top: 5 },
                      ]}
                    >
                      {movie.title}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DotDetails', {
                        id,
                        title: movie?.title,
                      })
                    }
                  >
                    <Entypo
                      style={[tw`p-4`, { right: 0, top: 5 }]}
                      name='dots-three-vertical'
                      size={Utils.moderateScale(25)}
                      color='white'
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    tw`absolute flex-row justify-around items-start flex mt-4`,
                    { top: '10%', left: 0, right: 0, bottom: 0 },
                  ]}
                >
                  <View style={tw`flex flex-col items-center`}>
                    <Image
                      style={[tw`w-14 h-20 rounded-sm`, { resizeMode: 'cover' }]}
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                      }}
                    />
                    <Rate rate={movie.vote_average} />
                  </View>

                  <View style={tw`flex flex-col w-1/2`}>
                    <Runtime time={movie.runtime} isMovie={true} t={t} />

                    <Text style={tw`font-medium text-lg text-white mt-2`}>{t('genres')}</Text>

                    <View style={tw`flex flex-row flex-wrap`}>{genres}</View>

                    <Text style={tw`font-medium text-lg text-white mt-2`}>{t('direction')}</Text>

                    <View style={tw`flex flex-row flex-wrap`}>
                      {directors}
                    </View>
                    <View style={tw`flex-row`}>
                      <AddToFavoriteMemoized
                        id={id}
                        title={movie?.title}
                        image={movie?.poster_path}
                        type={'movie'}
                        genre={genre}
                      />
                      <Trailer movie={movie} id={id} />
                    </View>
                  </View>
                </View>

                <OverViewMemoized content={movie.overview} t={t} />
              </View>
              <Tabs
                id={id}
                movie={movie}
                t={t}
                language={language}
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

export default DetailsMovie
