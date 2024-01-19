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
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  serieDetails,
  resetSerieDetails,
  serieCrew,
} from '../../../redux/actions/tmdb/series'
import { LinearGradient } from 'expo-linear-gradient'
import Runtime from '../../../utils/RunTime'
import Rate from '../../../utils/Rate'
import details from '../../../styles/pages/details'
import Tabs from '../../../components/Tabs'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'
import button from '../../../styles/components/button'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../../utils/Responsive'
import AddToFavorite from '../../../utils/AddToFavorite'
//import AddToWatchList from '../../../utils/AddToWatchList'
import { resetFavorites } from '../../../redux/actions/favorites'
import { resetWatchLists } from '../../../redux/actions/watchlists'
import Trailer from '../../../utils/Trailer'
import CreatePost from '../../../utils/CreatePost'
import CreateCritic from '../../../utils/CreateCritic'

const DetailsSerie = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const serie = useSelector((state) => state.serieDetails.data)
  const { id } = route.params
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('about')
  const genre = serie?.genres?.find((item) => item.name)

  const { i18n, t } = useTranslation()
  const language = i18n.language

  const fetchData = useCallback(async () => {
    setLoading(true)
    await dispatch(serieDetails(id, language))
    await dispatch(serieCrew(id, language))
    setLoading(false)
  }, [dispatch, id, language])

  const onRefresh = useCallback(async () => {
    await dispatch(serieDetails(id, language))
    await dispatch(serieCrew(id, language))
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    return () => {
      dispatch(resetSerieDetails())
      dispatch(resetFavorites())
      dispatch(resetWatchLists())
    }
  }, [])

  const creators = useMemo(() => {
    return serie?.created_by?.map((credit, index) => {
      if (!credit.name) return null
      return (
        <Text key={index} style={styles.directorText}>
          {credit.name}
        </Text>
      )
    })
  })

  const genres = useMemo(() => {
    return serie?.genres?.map((genre, index) => (
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
          serie && (
            <Fragment>
              <View style={styles.mainViewContainer}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                  style={styles.linearGradient}
                />
                <ImageBackground
                  style={styles.imageBackground}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${serie?.backdrop_path}`,
                  }}
                />

                <View style={styles.titleAndDot}>
                  <View>
                    <Text style={[styles.headerTitle, { left: 15, top: 5 }]}>
                      {serie.name}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DotDetails', {
                        id,
                        title: serie?.name,
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
                        uri: `https://image.tmdb.org/t/p/original${serie?.poster_path}`,
                      }}
                    />
                    <Rate rate={serie.vote_average} />
                  </View>

                  <View style={styles.infoViewContainer}>
                    <Runtime
                      time={serie.episode_run_time}
                      isMovie={false}
                      t={t}
                    />

                    <Text style={styles.directorTitle}>{t('genres')}</Text>

                    <View style={styles.genresViewContainer}>{genres}</View>

                    <Text style={styles.directorTitle}>{t('direction')}</Text>

                    <View style={styles.directorsViewContainer}>
                      {creators}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <AddToFavoriteMemoized
                        id={id}
                        title={serie?.name}
                        image={serie?.poster_path}
                        type={'serie'}
                        genre={genre}
                      />
                      {/*                       <AddToWatchListMemoized
                        id={id}
                        title={serie?.name}
                        image={serie?.poster_path}
                        type={'serie'}
                      /> */}
                      <Trailer serie={serie} id={id} />
                    </View>
                  </View>
                </View>

                <OverViewMemoized content={serie.overview} t={t} />
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
      {selectedTab === 'posts' && <CreatePost tmdbId={id} serie={serie} />}
      {selectedTab === 'critics' && <CreateCritic tmdbId={id} serie={serie} />}
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

export default DetailsSerie
