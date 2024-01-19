import React from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'

const CrewMovie = ({ route }) => {
  const { title } = route.params
  const navigation = useNavigation()
  const credits = useSelector((state) => state.movieCrew.data)

  const { t } = useTranslation()

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailsPeople', {
            id: item.id,
            name: item.name,
          })
        }
      >
        <View style={tw`flex flex-row justify-start bg-white my-4 p-4`}>
          {item.profile_path ? (
            <Image
              style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`,
              }}
            />
          ) : (
            <Image
              style={[tw`w-20 h-30 rounded-md ml-4 mb-2`, { resizeMode: 'cover' }]}
              source={require('../../../assets/image/No_Image_Available.jpg')}
            />
          )}
          <View style={tw`flex-1 w-full`}>
            <Text style={tw`font-medium text-lg ml-4`}>
              {item.name} | {item.job}
            </Text>
            <Text style={tw`font-medium text-lg p-4 text-justify leading-7`}>
              {item.department}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={tw`flex-1 flex flex-col mt-4`}>
      <Text style={tw`text-center font-medium text-lg mb-4`}>{t('crewOf')} {title}</Text>
      <FlatList
        data={credits?.crew}
        keyExtractor={(item) => item.credit_id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

export default CrewMovie
