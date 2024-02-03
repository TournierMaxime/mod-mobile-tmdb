import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  peopleDetails,
  peopleExternalIds,
  peopleCareer
} from '../../redux/actions/people'
import { LinearGradient } from 'expo-linear-gradient'
import Refresh from '@mod/mobile-common/lib/components/utils/Refresh'
import OverView from '@mod/mobile-tmdb/lib/components/OverView'
import moment from 'moment'
import SVGImdb from '../../lib/components/SVGImdb'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'
import Utils from '@mod/mobile-common/lib/class/Utils'
import Tabs from '@mod/mobile-common/lib/components/utils/Tabs'
import People from '../../lib/class/People'

const DetailsPeople = ({ route }) => {
  const dispatch = useDispatch()
  const { id } = route.params
  const people = useSelector((state) => state.peopleDetails.data)
  const externalIds = useSelector((state) => state.peopleExternalIds.data)
  const loading = useSelector((state) => state.peopleDetails.loading)

  const [selectedTab, setSelectedTab] = useState('people')

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const fetchData = useCallback(async () => {
    await dispatch(peopleDetails(id, language))
    await dispatch(peopleExternalIds(id))
    await dispatch(peopleCareer(id, language))
  }, [dispatch, id, language])

  const onRefresh = useCallback(async () => {
    await dispatch(peopleDetails(id, language))
    await dispatch(peopleCareer(id, language))
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <View style={tw`flex-1`}>
      <Refresh styles={tw`w-full h-full flex relative`} onRefresh={onRefresh}>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          people && (
            <Fragment>
              <View style={[tw`flex relative w-full`, { height: Utils.moderateScale(550) }]}>
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
                        tw`font-medium text-lg w-full my-4 text-white`,
                        { left: 15, top: 5 },
                      ]}
                    >
                      {people.name}
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
                        uri: `https://image.tmdb.org/t/p/original${people.profile_path}`,
                      }}
                    />
                  </View>
                  <View style={tw`flex flex-col w-1/2`}>
                    {People.birth(people, t, i18n)}

                    {people.deathday ? null : People.currentAge(people, t)}

                    {people.deathday ? People.ageDeath(people, t) : null}

                    <TouchableOpacity onPress={() => People.imdb(people)}>
                      <SVGImdb />
                    </TouchableOpacity>
                  </View>
                </View>
                <OverView
                  isBiography={true}
                  content={people.biography}
                  t={t}
                />
              </View>
              <Tabs people={people} t={t} language={language} id={id} selectedTab={selectedTab} setSelectedTab={setSelectedTab} externalIds={externalIds} />
            </Fragment>
          )
        )}
      </Refresh>
    </View>
  )
}

export default DetailsPeople
