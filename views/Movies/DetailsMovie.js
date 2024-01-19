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
  StyleSheet,
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
} from '../../../redux/actions/tmdb/movies'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '../../../utils/RunTime'
import Rate from '../../../utils/Rate'
import details from '../../../styles/pages/details'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'
import button from '../../../styles/components/button'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../../utils/Responsive'
import AddToFavorite from '../../../utils/AddToFavorite'
import Tabs from '../../../components/Tabs'
//import AddToWatchList from '../../../utils/AddToWatchList'
import { resetFavorites } from '../../../redux/actions/favorites'
import { resetWatchLists } from '../../../redux/actions/watchlists'
import Trailer from '../../../utils/Trailer'
import CreatePost from '../../../utils/CreatePost'
import CreateCritic from '../../../utils/CreateCritic'

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
      dispatch(resetFavorites())
      dispatch(resetWatchLists())
    }
  }, [])

  const directors = useMemo(() => {
    return credits?.crew?.map((credit, index) => {
      if (!credit.job === 'Director') return null
      if (credit.job === 'Director') {
        return (
          <Text key={index} style={styles.directorText}>
            {credit.name}
          </Text>
        )
      }
    })
  })

  const genres = useMemo(() => {
    return movie?.genres?.map((genre, index) => (
      <Text key={index} style={styles.genreText}>
        {genre.name}
      </Text>
    ))
  })

  const OverViewMemoized = React.memo(OverView)
  const AddToFavoriteMemoized = React.memo(AddToFavorite)
  //const AddToWatchListMemoized = React.memo(AddToWatchList)

  return (
    <View style={{ flex: 1 }}>
      <Refresh styles={styles.scrollView} onRefresh={onRefresh}>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          movie && (
            <Fragment>
              <View style={styles.mainViewContainer}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                  style={styles.linearGradient}
                />
                <ImageBackground
                  style={styles.imageBackground}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                  }}
                />

                <View style={styles.titleAndDot}>
                  <View>
                    <Text style={[styles.headerTitle, { left: 15, top: 5 }]}>
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
                      style={styles.threeDots}
                      name='dots-three-vertical'
                      size={moderateScale(25)}
                      color='white'
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.headerViewContainer}>
                  <View style={styles.posterViewContainer}>
                    <Image
                      style={styles.posterPath}
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                      }}
                    />
                    <Rate rate={movie.vote_average} />
                  </View>

                  <View style={styles.infoViewContainer}>
                    <Runtime time={movie.runtime} isMovie={true} t={t} />

                    <Text style={styles.directorTitle}>{t('genres')}</Text>

                    <View style={styles.genresViewContainer}>{genres}</View>

                    <Text style={styles.directorTitle}>{t('direction')}</Text>

                    <View style={styles.directorsViewContainer}>
                      {directors}
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <AddToFavoriteMemoized
                        id={id}
                        title={movie?.title}
                        image={movie?.poster_path}
                          type={'movie'}
                          genre={genre}
                      />
{/*                       <AddToWatchListMemoized
                        id={id}
                        title={movie?.title}
                        image={movie?.poster_path}
                        type={'movie'}
                        /> */}
                        <Trailer movie={movie} id={id} />
                    </View>
                  </View>
                </View>

                <OverViewMemoized content={movie.overview} t={t} />
              </View>
              <Tabs id={id} movie={movie} t={t} language={language} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            </Fragment>
          )
        )}
      </Refresh>
      {selectedTab === 'posts' && (<CreatePost tmdbId={id} movie={movie} />)}
      {selectedTab === 'critics' && (<CreateCritic tmdbId={id} movie={movie} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: details.container,
  title: details.title,
  image: details.image,
  flatListViewContainer: details.flatListViewContainer,
  originalTitle: details.originalTitle,
  scrollView: details.scrollView,
  mainViewContainer: details.mainViewContainer,
  linearGradient: details.linearGradient,
  imageBackground: details.imageBackground,
  titleAndDot: details.titleAndDot,
  headerTitle: details.headerTitle,
  headerViewContainer: details.headerViewContainer,
  posterViewContainer: details.posterViewContainer,
  posterPath: details.posterPath,
  releaseDate: details.releaseDate,
  infoViewContainer: details.infoViewContainer,
  genresViewContainer: details.genresViewContainer,
  genreText: details.genreText,
  directorsViewContainer: details.directorsViewContainer,
  directorText: details.directorText,
  directorTitle: details.directorTitle,
  criticButton: button.criticButton,
  buttonText: button.buttonText,
  threeDots: button.threeDots,
})

export default DetailsMovie
