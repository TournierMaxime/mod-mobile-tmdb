import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  peopleDetails,
  resetPeopleDetails,
  peopleExternalIds,
} from '../../redux/actions/people'
import { LinearGradient } from 'expo-linear-gradient'
import Refresh from '@mod/mobile-common/lib/components/utils/Refresh'
import OverView from '../../lib/components/OverView'
import moment from 'moment'
import SVGImdb from '../../lib/components/SVGImdb'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Informations from './Informations'
import tw from 'twrnc'

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
      <Text style={tw`font-medium text-lg w-full my-2 text-white`}>
        {t('age')} {currentAge} {t('years')}
      </Text>
    )
  })

  const ageDeath = useCallback(() => {
    const yearBirthDay = moment(people.birthday).format('YYYY')
    const yearDeathDay = moment(people.deathday).format('YYYY')
    const ageDeath = yearDeathDay - yearBirthDay

    return (
      <Text style={tw`font-medium text-lg w-full my-2 text-white`}>
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
        <Text style={tw`font-medium text-lg w-full my-2 text-white`}>
          {t('born')} {birthDay} {t('at')} {placeOfBirth}
        </Text>
      )
    } else if (gender === 2) {
      return (
        <Text style={tw`font-medium text-lg w-full my-2 text-white`}>
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
    <View style={tw`flex-1`}>
      <Refresh styles={tw`w-full h-full flex relative`} onRefresh={onRefresh}>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          people && (
            <Fragment>
              <View style={tw`flex relative w-full h-60`}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                  style={tw`w-full h-full relative flex`}
                />

                <View
                  style={tw`flex flex-row absolute items-center justify-between w-full`}
                >
                  <View>
                    <Text
                      style={[
                        tw`font-medium text-lg w-full my-2 text-white`,
                        { left: 15, top: 5 },
                      ]}
                    >
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
                      style={[tw`p-4`, { right: 0, top: 5 }]}
                      name='dots-three-vertical'
                      size={moderateScale(25)}
                      color='white'
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    tw`absolute flex-row justify-between items-start flex mt-4`,
                    { top: '10%', left: 0, right: 0, bottom: 0 },
                  ]}
                >
                  <View style={tw`flex flex-col items-center`}>
                    <Image
                      style={[tw`w-14 h-20 rounded-sm`, { resizeMode: 'cover' }]}
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${people.profile_path}`,
                      }}
                    />
                  </View>
                  <View style={tw`flex flex-col w-1/2`}>
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

export default DetailsPeople
