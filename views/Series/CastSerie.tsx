import React, { memo } from "react"
import { FlatList, View } from "react-native"
import RenderItemCastCrew from "../../lib/components/RenderItemCastCrew"
import Utils from "@mod/mobile-common/lib/class/Utils"

interface Cast {
  cast: Item[]
}

interface Props {
  credits: Cast
}

interface Item {
  id: number
  name: string
  profile_path: string
  character: string
  job: string
  department: string
}

interface Items {
  item: Item
  index: number
}

const CastSerie = ({ credits }: Props) => {
  const data = credits?.cast.slice(0, 20)

  return (
    <View>
      <FlatList
        getItemLayout={Utils.getItemLayoutCastCrew}
        horizontal
        data={data}
        renderItem={({ item, index }: Items) => (
          <RenderItemCastCrew item={item} index={index} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  )
}

export default memo(CastSerie)
