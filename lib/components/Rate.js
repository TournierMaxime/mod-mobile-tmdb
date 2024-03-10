import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc'

const Rate = ({ rate }) => {
  const percent = (rate * 10).toFixed(0);

  const rating = (percent) => {
    if (percent > 1 && percent <= 50) {
        return (
            <View style={tw`w-8 h-8 text-center justify-center items-center rounded-md bg-red-500`}>
                <Text style={tw`font-medium text-lg text-white`}>{percent}</Text>
            </View>
          )
    } else if (percent > 50 && percent <= 70) {
        return (
            <View style={tw`w-8 h-8 text-center justify-center items-center rounded-md bg-orange-500`}>
                <Text style={tw`font-medium text-lg text-white`}>{percent}</Text>
            </View>
          )
    } else if (percent > 70 && percent <= 100) {
      return (
        <View style={tw`w-8 h-8 text-center justify-center items-center rounded-md bg-green-500`}>
            <Text style={tw`font-medium text-lg text-white`}>{percent}</Text>
        </View>
      )
    } else {
      return <Text style={tw`font-medium text-lg text-white`}>{percent}</Text>
    }
  };
  return rating(percent);
}

export default Rate