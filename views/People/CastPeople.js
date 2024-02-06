import React, { memo } from 'react'
import { View } from 'react-native'
import moment from 'moment'
import tw from 'twrnc'
import TMDB from '../../lib/class/TMDB'

const CastPeople = ({ career }) => {

  const sortedCareer = career?.cast?.sort((a, b) => {
    const dateA = moment(a.release_date || a.first_air_date)
    const dateB = moment(b.release_date || b.first_air_date)
    return dateB.diff(dateA)
  })

  return (
    <View
      style={[tw`flex-1 flex flex-col border-slate-100`, { borderTopWidth: 2 }]}
    >
      {sortedCareer?.map((item, idx) => TMDB.renderItemPeople(item, idx))}
    </View>
  )
}

export default memo(CastPeople)
