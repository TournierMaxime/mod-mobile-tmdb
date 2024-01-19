import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import {
  Entypo,
  FontAwesome,
  SimpleLineIcons
} from 'react-native-vector-icons'
import Seasons from './Seasons'
import Cast from './Cast'
import Crew from './Crew'
import { useDispatch, useSelector } from 'react-redux'
import { movieDetails } from '../../redux/actions/movies'
import { serieDetails } from '../../redux/actions/series'
import { peopleDetails } from '../../redux/actions/people'
import { useTranslation } from 'react-i18next'
import Utils from '@mod/mobile-common/lib/class/Utils'
import tw from 'twrnc'

const DotDetails = ({ route }) => {
  const { id } = route.params
  const dispatch = useDispatch()
  const serie = useSelector((state) => state.serieDetails.data)
  const movie = useSelector((state) => state.movieDetails.data)
  const people = useSelector((state) => state.peopleDetails.data)

  const { i18n, t } = useTranslation()
  const language = i18n.language

  useEffect(() => {
    if (id === movie.id) {
      dispatch(movieDetails(id, language))
    }
    if (id === serie.id) {
      dispatch(serieDetails(id, language))
    }
    if (id === people.id) {
      dispatch(peopleDetails(id, language))
    }
  }, [dispatch, id])

  return (
    <View style={tw`flex-1 bg-slate-100 items-center justify-between`}>
      <View style={tw`flex w-full`}>
        <Cast id={id} movie={movie} serie={serie} people={people} language={language}>
          <View style={tw`bg-white w-full p-4 flex flex-row items-center justify-between mt-2`}>
            <View style={tw`flex flex-row items-center`}>
              <SimpleLineIcons
                style={tw`mr-4`}
                name='people'
                size={Utils.moderateScale(25)}
                color='black'
              />
              <Text style={tw`font-medium text-lg`}>
                {(movie && movie.id === id) || (serie && serie.id === id)
                  ? t('cast')
                  : t('filmography')}
              </Text>
            </View>
            <Entypo name='chevron-small-right' size={Utils.moderateScale(25)} color='black' />
          </View>
        </Cast>
        {(movie && movie.id === id) || (serie && serie.id === id) ? (
          <Crew id={id} movie={movie} serie={serie}>
            <View style={tw`bg-white w-full p-4 flex flex-row items-center justify-between mt-2`}>
              <View style={tw`flex flex-row items-center`}>
                <SimpleLineIcons
                  style={tw`mr-4`}
                  name='people'
                  size={Utils.moderateScale(25)}
                  color='black'
                />
                <Text style={tw`font-medium text-lg`}>{t('crew')}</Text>
              </View>
              <Entypo name='chevron-small-right' size={Utils.moderateScale(25)} color='black' />
            </View>
          </Crew>
        ) : null}
        {serie.id === id ? (
          <Seasons serie={serie}>
            <View style={tw`bg-white w-full p-4 flex flex-row items-center justify-between mt-2`}>
              <View style={tw`flex flex-row items-center`}>
                <FontAwesome
                  style={tw`mr-4`}
                  name='tv'
                  size={Utils.moderateScale(25)}
                  color='black'
                />
                <Text style={tw`font-medium text-lg`}>{t('seasons')}</Text>
              </View>
              <Entypo name='chevron-small-right' size={Utils.moderateScale(25)} color='black' />
            </View>
          </Seasons>
        ) : null}
      </View>
    </View>
  )
}

export default DotDetails
