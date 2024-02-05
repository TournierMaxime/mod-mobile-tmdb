import React, { memo } from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import TMDB from '../../lib/class/TMDB'

const CastMovie = ({ credits }) => {
  return (
    <View
      style={[tw`flex-1 flex flex-col border-slate-100`, { borderTopWidth: 2 }]}
    >
      {credits?.cast?.map((item, idx) => TMDB.renderItemCastCrew(item, idx)).slice(0, 20)}
    </View>
  )
}

export default memo(CastMovie)
