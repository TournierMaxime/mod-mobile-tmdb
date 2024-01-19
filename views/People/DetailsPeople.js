import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  peopleDetails,
  resetPeopleDetails,
  peopleExternalIds,
} from '../../../redux/actions/tmdb/people'
import { LinearGradient } from 'expo-linear-gradient'
import details from '../../../styles/pages/details'
import Refresh from '../../../utils/Refresh'
import OverView from '../../../utils/OverView'
import moment from 'moment'
import SVGImdb from '../../../utils/SVGImdb'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../../utils/Responsive'
import button from '../../../styles/components/button'
import Informations from './Informations'
import AddToFavorite from '../../../utils/AddToFavorite'

const DetailsPeople = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { id } = route.params
  const people = useSelector((state) => state.peopleDetails.data)
  const externalIds = useSelector((state) => state.peopleExternalIds.data)
  const [loading, setLoading] = useState(false)

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const currentAge = useCallback(() => {
    const currentYear = moment().format('YYYY')
    const yearBirthDay = moment(people.birthday).format('YYYY')
    const currentAge = currentYear - yearBirthDay

    return (
      <Text style={styles.headerTitle}>
        {t('age')} {currentAge} {t('years')}
      </Text>
    )
  })

  const ageDeath = useCallback(() => {
    const yearBirthDay = moment(people.birthday).format('YYYY')
    const yearDeathDay = moment(people.deathday).format('YYYY')
    const ageDeath = yearDeathDay - yearBirthDay

    return (
      <Text style={styles.headerTitle}>
        {t('deadAt')} {ageDeath} {t('years')}
      </Text>
    )
  })

  const birth = useCallback(() => {
    const birthDay = moment(people.birthday).locale(i18n.language).format('LL')
    const placeOfBirth = people.place_of_birth
    const gender = people.gender

    if (gender === 1) {
      return (
        <Text style={styles.headerTitle}>
          {t('born')} {birthDay} {t('at')} {placeOfBirth}
        </Text>
      )
    } else if (gender === 2) {
      return (
        <Text style={styles.headerTitle}>
          {t('born')} {birthDay} {t('at')} {placeOfBirth}
        </Text>
      )
    }
  })

  const imdb = useCallback(() => {
    if (!people.imdb_id) return null
    const url = `https://www.imdb.com/name/${people.imdb_id}`
    Linking.openURL(url)
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    await dispatch(peopleDetails(id, language))
    await dispatch(peopleExternalIds(id))
    setLoading(false)
  }, [dispatch, id, language])

  const onRefresh = useCallback(async () => {
    await dispatch(peopleDetails(id, language))
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    return () => {
      dispatch(resetPeopleDetails())
    }
  }, [])

  const OverViewMemoized = React.memo(OverView)
  const AddToFavoriteMemoized = React.memo(AddToFavorite)
  const InformationsMemoized = React.memo(Informations)

  return (
    <View style={{ flex: 1 }}>
      <Refresh styles={styles.scrollView} onRefresh={onRefresh}>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          people && (
            <Fragment>
              <View style={styles.mainViewContainer}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                  style={styles.linearGradient}
                />

                <View style={styles.titleAndDot}>
                  <View>
                    <Text style={[styles.headerTitle, { left: 15, top: 5 }]}>
                      {people.name}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DotDetails', {
                        id,
                        title: people?.name,
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
                        uri: `https://image.tmdb.org/t/p/original${people.profile_path}`,
                      }}
                    />
                  </View>
                  <View style={styles.infoViewContainer}>
                    {birth()}

                    {people.deathday ? null : currentAge()}

                    {people.deathday ? ageDeath() : null}

                    <TouchableOpacity onPress={() => imdb()}>
                      <SVGImdb />
                    </TouchableOpacity>
                    <AddToFavoriteMemoized
                      id={id}
                      title={people?.name}
                      image={people?.profile_path}
                      type={'person'}
                    />
                  </View>
                </View>
                <OverViewMemoized
                  isBiography={true}
                  content={people.biography}
                  t={t}
                />
              </View>
              <InformationsMemoized t={t} externalIds={externalIds} />
            </Fragment>
          )
        )}
      </Refresh>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: details.scrollView,
  mainViewContainer: details.mainViewContainer,
  linearGradient: details.linearGradient,
  headerViewContainer: details.headerViewContainer,
  posterViewContainer: details.posterViewContainer,
  posterPath: details.posterPath,
  infoViewContainer: details.infoViewContainer,
  viewOverviewContainer: details.viewOverviewContainer,
  headerTitle: {
    fontSize: moderateScale(20),
    color: 'white',
    marginVertical: 5,
    width: '100%',
  },
  textOverview: details.textOverview,
  titleAndDot: details.titleAndDot,
  threeDots: button.threeDots,
})

export default DetailsPeople
