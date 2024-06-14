import React, { memo } from "react"
import { FlatList, View } from "react-native"
import RenderItemCastCrew from "../../lib/components/RenderItemCastCrew"
import Utils from "@mod/mobile-common/lib/class/Utils"

const CastMovie = ({ credits }) => {
  const data = credits?.cast.slice(0, 20)

  return (
    <View>
      <FlatList
        getItemLayout={Utils.getItemLayoutCastCrew}
        horizontal
        data={data}
        renderItem={({ item, idx }) => (
          <RenderItemCastCrew item={item} idx={idx} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  )
}

export default memo(CastMovie)
