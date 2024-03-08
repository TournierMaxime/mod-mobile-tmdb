import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'twrnc'
import { updateUser } from "@mod/mobile-user/redux/actions/users"
import { useDispatch, useSelector } from 'react-redux'

export default function Languages({ i18n }) {

  const [lang, setLang] = useState(i18n.language)
  const userId = useSelector((state) => state.auth.data.user.userId)

  const dispatch = useDispatch()

  const itemsPicker = [
    { label: 'German', value: 'de' },
    { label: 'English', value: 'en-gb' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'Italian', value: 'it' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Dutch', value: 'nl' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Chinese', value: 'zh-cn' },
  ]

  useEffect(() => {
    const updateLanguage = async () => {
      const storedLang = await AsyncStorage.getItem('lang')
      if (storedLang) {
        setLang(storedLang)
        i18n.changeLanguage(storedLang)
      }
    }

    updateLanguage()
  }, [lang])

  const changeLanguage = async (itemValue) => {
    setLang(itemValue)
    i18n.changeLanguage(itemValue)
    await AsyncStorage.setItem('lang', itemValue)
    await dispatch(updateUser({
      lang: itemValue.slice(0, 2)
    }, userId))
  }

  return (
    <View style={tw`bg-white`}>
      <Picker selectedValue={lang} onValueChange={changeLanguage}>
        {itemsPicker.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  )
}
