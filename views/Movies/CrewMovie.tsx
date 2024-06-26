import React, { memo } from "react"
import { FlatList, View } from "react-native"
import RenderItemCastCrew from "../../lib/components/RenderItemCastCrew"
import Utils from "@mod/mobile-common/lib/class/Utils"

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

interface Crew {
  crew: Item[]
}

interface Props {
  credits?: Crew
}

const CrewMovie = ({ credits }: Props) => {
  if (!credits) return null

  const data = credits?.crew.slice(0, 20)

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

export default memo(CrewMovie)
