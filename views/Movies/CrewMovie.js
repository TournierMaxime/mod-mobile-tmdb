import React, { memo } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import TMDB from '../../lib/class/TMDB'

const CrewMovie = () => {
  const credits = useSelector((state) => state.movieCrew.data)

  return (
    <View
      style={[tw`flex-1 flex flex-col border-slate-100`, { borderTopWidth: 2 }]}
    >
      {credits?.crew?.map((item, idx) => TMDB.renderItemCastCrew(item, idx))}
    </View>
  )
}

export default memo(CrewMovie)
