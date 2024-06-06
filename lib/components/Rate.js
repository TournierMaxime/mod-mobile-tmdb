import React from "react"
import { Text, View } from "react-native"
import tw from "twrnc"
import Utils from "@mod/mobile-common/lib/class/Utils"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const Rate = ({ rate }) => {
  const percent = (rate * 10).toFixed(0)

  const { fontSize } = useResponsive()

  const rating = (percent) => {
    if (percent > 1 && percent <= 50) {
      return (
        <View
          style={[
            tw`text-center justify-center items-center rounded-md bg-red-500`,
            { width: Utils.moderateScale(25), height: Utils.moderateScale(25) },
          ]}
        >
          <Text style={fontSize(`text-white`)}>{percent}</Text>
        </View>
      )
    } else if (percent > 50 && percent <= 70) {
      return (
        <View
          style={[
            tw`text-center justify-center items-center rounded-md bg-orange-500`,
            { width: Utils.moderateScale(25), height: Utils.moderateScale(25) },
          ]}
        >
          <Text style={fontSize(`text-white`)}>{percent}</Text>
        </View>
      )
    } else if (percent > 70 && percent <= 100) {
      return (
        <View
          style={[
            tw`text-center justify-center items-center rounded-md bg-green-500`,
            { width: Utils.moderateScale(25), height: Utils.moderateScale(25) },
          ]}
        >
          <Text style={fontSize(`text-white`)}>{percent}</Text>
        </View>
      )
    } else {
      return <Text style={fontSize(`text-white`)}>{percent}</Text>
    }
  }
  return rating(percent)
}

export default Rate
