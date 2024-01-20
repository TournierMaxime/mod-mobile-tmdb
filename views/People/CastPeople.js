import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { peopleCareer, resetPeopleCareer } from '../../redux/actions/people'
import tw from 'twrnc'

const CastPeople = ({ route }) => {
  const { id, name } = route.params
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const career = useSelector((state) => state.peopleCareer.data)

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const sortedCareer = career?.cast?.sort((a, b) => {
    const dateA = moment(a.release_date || a.first_air_date)
    const dateB = moment(b.release_date || b.first_air_date)
    return dateB.diff(dateA)
  })

  const renderItem = (item) => {
    return item.original_title ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailsMovie', {
            id: item.id,
            title: item.title,
          })
        }
      >
        <View style={tw`flex flex-row justify-start bg-white my-4 p-4`}>
          {item.poster_path ? (
            <Image
              style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
            />
          ) : (
            <Image
              style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
              source={require('../../assets/images/No_Image_Available.jpg')}
            />
          )}
          <View style={tw`flex-1 w-full`}>
            <Text style={tw`font-medium text-lg ml-4`}>
              {item.title} | {moment(item.release_date).format('YYYY')}{' '}
            </Text>
            <Text style={tw`font-medium text-lg p-4 text-justify leading-7`}>{item.character}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailsSerie', {
            id: item.id,
            title: item.name,
          })
        }
      >
        <View style={tw`flex flex-row justify-start bg-white my-4 p-4`}>
          {item.poster_path ? (
            <Image
              style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
            />
          ) : (
            <Image
              style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
              source={require('../../assets/images/No_Image_Available.jpg')}
            />
          )}
          <View style={tw`flex-1 w-full`}>
            <Text style={tw`font-medium text-lg ml-4`}>{item.name}</Text>
            <Text style={tw`font-medium text-lg p-4 text-justify leading-7`}>{item.character}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    dispatch(peopleCareer(id, language))
  }, [id])

    useEffect(() => {
    return () => {
      dispatch(resetPeopleCareer())
    }
  }, [])

  return (
    <View style={tw`flex-1 flex flex-col mt-4`}>
      <Text style={tw`text-center font-medium text-lg mb-4`}>{t('filmographyOf')} {name}</Text>
      <FlatList
        data={sortedCareer}
        keyExtractor={(item) => item.credit_id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

export default CastPeople
