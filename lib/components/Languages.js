import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { Picker } from "@react-native-picker/picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import tw from "twrnc"
import { updateUser } from "@mod/mobile-user/redux/actions/users"
import { useDispatch, useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"

export default function Languages({ i18n }) {
  const dispatch = useDispatch()

  const [lang, setLang] = useState(i18n.language)
  const userId = useSelector((state) => state.auth.data.user.userId)

  const darkMode = useSelector((state) => state.theme.darkMode)

  const { background, text, dropdownIconColor } =
    useDynamicThemeStyles(darkMode)

  const itemsPicker = [
    /*     { label: 'German', value: 'de' }, */
    { label: "English", value: "en" },
    /*     { label: 'Spanish', value: 'es' }, */
    { label: "French", value: "fr" },
    /*     { label: 'Italian', value: 'it' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Dutch', value: 'nl' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Chinese', value: 'zh-cn' }, */
  ]

  useEffect(() => {
    const updateLanguage = async () => {
      const storedLang = await AsyncStorage.getItem("lang")
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
    await AsyncStorage.setItem("lang", itemValue)
    await dispatch(
      updateUser(
        {
          lang: itemValue.slice(0, 2),
        },
        userId,
      ),
    )
  }

  return (
    <View style={tw`${background} ${text}`}>
      <Picker
        style={tw`${background} ${text}`}
        selectedValue={lang}
        onValueChange={changeLanguage}
        mode="dropdown"
        dropdownIconColor={dropdownIconColor}
      >
        {itemsPicker.map((item, index) => (
          <Picker.Item
            style={tw`${background} ${text}`}
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  )
}
