import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc'
import moment from 'moment'

class TMDB {
  static renderItemCastCrew = (item, idx) => {
    const navigation = useNavigation()
    const { id, name, profile_path, character, job, department } = item
    return (
      <TouchableOpacity
        key={idx}
        style={[tw`border-slate-100`, { borderBottomWidth: 2 }]}
        onPress={() =>
          navigation.navigate('DetailsPeople', {
            id,
          })
        }
      >
        <View style={tw`flex flex-row justify-start bg-white p-4`}>
          {profile_path ? (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${profile_path}`,
              }}
            />
          ) : (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={require('../../../../assets/images/No_Image_Available.jpg')}
            />
          )}
          <View style={tw`flex-1 w-full`}>
            <Text style={tw`font-medium text-lg ml-4`}>{name}</Text>
            <Text style={tw`font-medium text-base px-4 text-justify leading-7`}>
              {character}
            </Text>
            {job ? (
              <Text
                style={tw`font-medium text-base px-4 text-justify leading-7`}
              >
                {job}
              </Text>
            ) : null}
            {department ? (
              <Text
                style={tw`font-medium text-base px-4 text-justify leading-7`}
              >
                {department}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  static renderItemPeople = (item, idx) => {
    const navigation = useNavigation()
    const {
      original_title,
      id,
      title,
      poster_path,
      release_date,
      character,
      name,
      first_air_date,
    } = item
    return original_title ? (
      <TouchableOpacity
        key={idx}
        style={[tw`border-slate-100`, { borderBottomWidth: 2 }]}
        onPress={() =>
          navigation.navigate('DetailsMovie', {
            id,
          })
        }
      >
        <View style={tw`flex flex-row justify-start bg-white p-4`}>
          {poster_path ? (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
              }}
            />
          ) : (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={require('../../../../assets/images/No_Image_Available.jpg')}
            />
          )}
          <View style={tw`flex-1 w-full`}>
            <Text style={tw`font-medium text-lg ml-4`}>{title}</Text>
            <Text style={tw`font-medium text-base ml-4`}>
              {moment(release_date).format('YYYY')}{' '}
            </Text>
            <Text style={tw`font-medium text-base px-4 text-justify leading-7`}>
              {character}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        key={idx}
        onPress={() =>
          navigation.navigate('DetailsSerie', {
            id,
          })
        }
      >
        <View style={tw`flex flex-row justify-start bg-white p-4`}>
          {poster_path ? (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
              }}
            />
          ) : (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={require('../../../../assets/images/No_Image_Available.jpg')}
            />
          )}
          <View style={tw`flex-1 w-full`}>
            <Text style={tw`font-medium text-lg ml-4`}>{name}</Text>
            <Text style={tw`font-medium text-base ml-4`}>
              {moment(first_air_date).format('YYYY')}{' '}
            </Text>
            <Text style={tw`font-medium text-base px-4 text-justify leading-7`}>
              {character}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default TMDB
