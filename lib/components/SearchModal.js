import React, { useState, useEffect } from 'react'
import {
  Modal,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Text,
} from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { search } from '../../redux/actions/search'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'
import Utils from '@mod/mobile-common/lib/class/Utils'

const SearchModal = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const data = useSelector((state) => state.search.data)
  const searchResults = useSelector((state) => state.search.data.results)
  const [query, setQuery] = useState('')

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const resetSearch = () => {
    setQuery('')
    dispatch({ type: 'SEARCH_RESET_REQUEST' })
  }

  const handleSearch = async () => {
    try {
      await dispatch(search(data.page, query, language))
    } catch (error) {
      console.log(error)
    }
  }

  const renderItemContent = (item) => {
    if (item.original_title && item.media_type === 'movie') {
      return (
        <TouchableOpacity
          style={[tw`w-full border-slate-100 p-6`, { borderBottomWidth: 2 }]}
          onPress={() => {
            navigation.navigate('DetailsMovie', {
              id: item.id,
              title: item.original_title,
            }),
              resetSearch()
            setVisible(false)
          }}
        >
          <Text style={tw`w-full font-medium text-lg`}>{`${
            item.original_title
          } (${moment(item.release_date).format('YYYY')}) / ${t(
            'utils.film'
          )}`}</Text>
        </TouchableOpacity>
      )
    } else if (item.name) {
      if (item.media_type === 'tv') {
        return (
          <TouchableOpacity
            style={[tw`w-full border-slate-100 p-6`, { borderBottomWidth: 2 }]}
            onPress={() => {
              navigation.navigate('DetailsSerie', {
                id: item.id,
                title: item.original_name,
              }),
                resetSearch()
              setVisible(false)
            }}
          >
            <Text style={tw`w-full font-medium text-lg`}>{`${
              item.name
            } (${moment(item.first_air_date).format('YYYY')}) / ${t(
              'utils.serie'
            )}`}</Text>
          </TouchableOpacity>
        )
      }
      if (item.media_type === 'person') {
        return (
          <TouchableOpacity
            style={[tw`w-full border-slate-100 p-6`, { borderBottomWidth: 2 }]}
            onPress={() => {
              navigation.navigate('DetailsPeople', {
                id: item.id,
                name: item.name,
              }),
                resetSearch()
              setVisible(false)
            }}
          >
            <Text style={tw`w-full font-medium text-lg`}>{`${item.name} / ${t(
              'utils.celebrity'
            )}`}</Text>
          </TouchableOpacity>
        )
      }
    }
    return null
  }

  const handleModalClose = () => {
    setVisible(false)
    setQuery('')
    resetSearch()
  }

  useEffect(() => {
    if (!visible) {
      resetSearch()
    }
  }, [visible])

  return (
    <View style={tw`flex-1 items-end`}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={visible}
        onRequestClose={handleModalClose}
      >
        <View style={tw`flex-1 justify-start items-stretch bg-white`}>
          <View
            style={tw`flex-row justify-end items-center px-4 pt-4 mt-4 w-full`}
          >
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Ionicons
                style={tw`text-black`}
                name='close'
                size={Utils.moderateScale(40)}
              />
            </TouchableOpacity>
          </View>
          <View style={tw`px-4 mt-4 relative`}>
            <TextInput
              style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
              placeholder={t('utils.search')}
              onChangeText={(text) => setQuery(text)}
              value={query}
              onSubmitEditing={handleSearch}
            />
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={tw`ml-auto mr-auto flex-wrap w-full`}>
                    {renderItemContent(item)}
                  </View>
                )
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default SearchModal
