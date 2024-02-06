import React, { Fragment, useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import OverView from '@mod/mobile-tmdb/lib/components/OverView'
import moment from 'moment'
import SVGImdb from '../../lib/components/SVGImdb'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'
import Utils from '@mod/mobile-common/lib/class/Utils'
import Tabs from '@mod/mobile-common/lib/components/utils/Tabs'
import People from '../../lib/class/People'
import useHandleFavorites from '@mod/mobile-common/lib/hooks/utils/useHandleFavorites'
import AddToFavorite from '../../lib/components/AddToFavorite'
import { useQuery } from 'react-query'
import {
  peopleCareer,
  peopleDetails,
  peopleExternalIds,
} from '../../../../react-query/people'

const DetailsPeople = ({ route }) => {
  const { id } = route.params

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const { data: people, isLoading } = useQuery(['people', id, language], () =>
    peopleDetails(id, language)
  )
  const { data: career } = useQuery(['career', id, language], () =>
    peopleCareer(id, language)
  )
  const { data: externalIds } = useQuery(['externalIds', id, language], () =>
    peopleExternalIds(id, language)
  )

  const favorites = useSelector((state) => state.favorites.data)

  const { setItem, handleFavorite, isFavorite } = useHandleFavorites({
    favorites,
    data: {
      id,
      name: people?.name,
      image: people?.profile_path,
      type: 'people',
    },
  })

  useEffect(() => {
    setItem()
  }, [favorites])

  const [selectedTab, setSelectedTab] = useState('people')

  return (
    <View style={tw`flex-1`}>
      <ScrollView styles={tw`w-full h-full flex relative`}>
        {isLoading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          people && (
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
                      style={[
                        tw`w-30 h-50 rounded-md`,
                        { resizeMode: 'cover' },
                      ]}
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${people.profile_path}`,
                      }}
                    />
                  </View>
                  <View style={tw`flex flex-col w-1/2`}>
                    {People.birth(people, t, i18n)}

                    {people.deathday ? null : People.currentAge(people, t)}

                    {people.deathday ? People.ageDeath(people, t) : null}

                    <View style={tw`flex-row`}>
                      <View style={tw`mt-4`}>
                        <TouchableOpacity
                          style={tw`mr-2 items-center justify-center`}
                          onPress={() => People.imdb(people)}
                        >
                          <SVGImdb />
                        </TouchableOpacity>
                      </View>
                      <AddToFavorite
                        isFavorite={isFavorite}
                        handleFavorite={handleFavorite}
                      />
                    </View>
                  </View>
                </View>
                <OverView isBiography={true} content={people.biography} t={t} />
              </View>
              <Tabs
                people={people}
                career={career}
                t={t}
                language={language}
                id={id}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                externalIds={externalIds}
              />
            </Fragment>
          )
        )}
      </ScrollView>
    </View>
  )
}

export default DetailsPeople
