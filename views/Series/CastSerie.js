import React, { memo } from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import TMDB from '../../lib/class/TMDB'

const CastSerie = ({ credits }) => {
  return (
    <View
      style={[tw`flex-1 flex flex-col border-slate-100`, { borderTopWidth: 2 }]}
    >
      {credits?.cast?.map((item, idx) => TMDB.renderItemCastCrew(item, idx))}
    </View>
  )
}

export default memo(CastSerie)
