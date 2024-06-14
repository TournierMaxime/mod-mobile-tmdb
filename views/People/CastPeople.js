import React, { memo } from "react"
import { FlatList, View } from "react-native"
import RenderItemPeople from "../../lib/components/RenderItemPeople"
import moment from "moment"
import Utils from "@mod/mobile-common/lib/class/Utils"

const CastPeople = ({ career }) => {
  const data = career?.cast?.sort((a, b) => {
    const dateA = moment(a.release_date || a.first_air_date)
    const dateB = moment(b.release_date || b.first_air_date)
    return dateB.diff(dateA)
  })

  return (
    <View>
      <FlatList
        getItemLayout={Utils.getItemLayoutCastCrew}
        horizontal
        data={data}
        renderItem={({ item, idx }) => (
          <RenderItemPeople item={item} idx={idx} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  )
}

export default memo(CastPeople)
