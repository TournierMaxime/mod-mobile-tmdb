import React from "react"
import { TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import Utils from "@mod/mobile-common/lib/class/Utils"
import tw from "twrnc"
import { useSelector } from "react-redux"
import { RootState } from "store"

interface Props {
  isFavorite: boolean
  handleFavorite: () => void
}

const AddToFavorite = ({ isFavorite, handleFavorite }: Props) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )
  if (!isAuthenticated) return
  return (
    <View style={tw`mt-4`}>
      <TouchableOpacity
        style={tw`items-center justify-center`}
        onPress={() => handleFavorite()}
      >
        {isFavorite ? (
          <MaterialIcons
            name="favorite"
            size={Utils.moderateScale(35)}
            color="red"
          />
        ) : (
          <MaterialIcons
            name="favorite-outline"
            size={Utils.moderateScale(35)}
            color="white"
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default AddToFavorite
